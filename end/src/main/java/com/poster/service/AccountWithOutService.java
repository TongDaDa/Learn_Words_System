package com.poster.service;

import com.alibaba.fastjson.JSON;
import com.poster.dao.repository.AccountManagerRepository;
import com.poster.dao.repository.AccountRepository;
import com.poster.dao.repository.RelevanceAccountRepository;
import com.poster.dao.repository.UseHistoryRepository;
import com.poster.entity.*;
import com.poster.pure.entity.AccountWithOut;
import com.poster.pure.entity.AccountWithOutBalance;
import com.poster.response.model.AccountWithoutResponse;
import com.poster.utils.ErrorCode;
import com.poster.utils.MyException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

import javax.persistence.criteria.Predicate;
import java.util.*;
import java.util.spi.LocaleNameProvider;

@Service
@Transactional
public class AccountWithOutService {
    @Autowired
    private AccountManagerRepository accountManagerRepository;
    @Autowired
    private RelevanceAccountRepository relevanceAccountRepository;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private UseHistoryRepository useHistoryRepository;

    public List<AccountWithOut> getAccount(Long userId, String accountName, String phone, Integer accountId) {
        List<AccountManage> accountManagesItems = accountManagerRepository.findAll(getWhereClause(userId,accountName,phone));
        List<AccountWithOut> list = new ArrayList<AccountWithOut>();
        String stringAccountId = String.valueOf(accountId);

        accountManagesItems.forEach((item)->{
            AccountWithOut accountWithOut = new AccountWithOut();
            accountWithOut.setUserId(item.getId());
            accountWithOut.setPhone(item.getPhone());
            accountWithOut.setUserName(item.getName());
            accountWithOut.setUserId(item.getId());
            accountWithOut.setAccounts(item.getAccountType());
            list.add(accountWithOut);
        });


        if (accountId != null) {
            list.forEach((r)->{  // r == AccountWithOut
                String[] accountType = r.getAccounts().split(",");
                List<String> accountTypeList = Arrays.asList(accountType);
                if (accountTypeList.contains(stringAccountId)) {
                    List<AccountWithOutBalance> withOutBalancesList = new ArrayList<AccountWithOutBalance>();
                    accountTypeList.forEach((item)->{
                        AccountWithOutBalance accountWithOutBalance = new AccountWithOutBalance();
                        Integer accounId = Integer.valueOf(item);
                        Account accountModal = accountRepository.findOne(Long.valueOf(accounId));
                        RelevanceAccount bablanceModal = relevanceAccountRepository.findByUserIdAndAccountId(r.getUserId(),accounId);
                        if (bablanceModal != null) {
                            Long presentBalance = bablanceModal.getPresentBalance();
                            Long getTopUpMoney = bablanceModal.getTopUpMoney();
                            accountWithOutBalance.setPresentMoney(presentBalance == 0 ? presentBalance : this.transformPrise(false, presentBalance));
                            accountWithOutBalance.setTopUpMoney(getTopUpMoney == 0 ? getTopUpMoney : this.transformPrise(false, getTopUpMoney));
                            accountWithOutBalance.setAccountId(bablanceModal.getAccountId());
                            accountWithOutBalance.setAccountName(accountModal.getAccountName());
                        }
                        withOutBalancesList.add(accountWithOutBalance);
                    });
                    r.setAccountList(withOutBalancesList);
                }
            });
        }

        return list;
    };

    public void topUpMoney(Long userId, Integer accountId, Long topUpMoney) {
        RelevanceAccount account = relevanceAccountRepository.findByUserIdAndAccountId(userId,accountId);

        this.isHaveAccount(account);
        this.isSafeMoney(topUpMoney);

        Long presentMoney = account.getPresentBalance();
        Long topUpMoney1 = account.getTopUpMoney() + topUpMoney;  // 之前剩余金额 + 当前充值金额
        account.setTopUpMoney(topUpMoney1);
        //计算赠送金额
        Account currentHandleAccount = accountRepository.findOne(Long.valueOf(accountId));
        String currentHandleAccountMoneyJSON = currentHandleAccount.getMoneyJSON();
        List<Object> giveRuleList = JSON.parseArray(currentHandleAccountMoneyJSON);
        Long max_rule_toUpMoney = new Long(0);
        Long max_rule_presentMoney = new Long(0);
        int l = giveRuleList.size();

        for(int i = 0; i<l; i++){ // 筛选出以topUpMoney为准的最大充值金额(前提条件: 充值金额越多，赠送金额越多)
            Map<String, Integer> map = (Map)giveRuleList.get(i);
            Integer topUpMoneymap = map.get("topUpMoney");
            Long rule_topUpMoney = this.transformPrise(true, Long.valueOf(topUpMoneymap));
            if ( rule_topUpMoney > max_rule_toUpMoney && rule_topUpMoney <= topUpMoney) {
                max_rule_toUpMoney = rule_topUpMoney;
                max_rule_presentMoney = Long.valueOf(map.get("giveMoney")); //此字段(diveMoney)默认值是0
            }
        }

        if (max_rule_toUpMoney != 0) { /* 有赠送规则 */
            Long pm = presentMoney + this.transformPrise(true, max_rule_presentMoney);
            account.setPresentBalance(pm);     //以下变量是规则中最大的充值金额
            this.addUseHistory(true, topUpMoney, this.transformPrise(true,max_rule_presentMoney), accountId, userId);
        } else {
            this.addUseHistory(true, topUpMoney, new Long(0), accountId, userId);
        }
        relevanceAccountRepository.save(account);
    }

    public void deDuctMoney(Long userId, Integer accountId, Long deDuctMoney){
        this.isSafeMoney(deDuctMoney);
        RelevanceAccount account = relevanceAccountRepository.findByUserIdAndAccountId(userId,accountId);
        Long topUpMoney1 = account.getTopUpMoney();  // 之前剩余金额 + 当前充值金额
        Long presentMoney = account.getPresentBalance();
        if (deDuctMoney > topUpMoney1) {//余额不足，帐户金额与剩余金额加起来也不够花.
            if ((topUpMoney1+presentMoney) < deDuctMoney) {
                throw new MyException(ErrorCode.BALANCE_NOT_ENOUGH);
            } else {  //扣除金额大于剩余金额,尝试从赠送金额中扣除
                account.setTopUpMoney(new Long(0));
                account.setPresentBalance(presentMoney - (deDuctMoney-topUpMoney1));
                this.addUseHistory(false, deDuctMoney, new Long(0),accountId, userId);
            }
        } else{
            account.setTopUpMoney(topUpMoney1 - deDuctMoney);
        }
        this.addUseHistory(false, deDuctMoney, new Long(0),accountId, userId);
        relevanceAccountRepository.save(account);
    }

    private Long transformPrise (Boolean type, Long topUpMoney) {
        if (type) { //转回小数
            topUpMoney *= 100;
        } else { //返回整数
            topUpMoney /= 100;
        }
        return topUpMoney;
    }

    private void isSafeMoney (Long money){
        if (money <= 0) {
            throw new MyException(ErrorCode.PARAM_ERROR);
        }
    }

    private void isHaveAccount (RelevanceAccount account) {
        if (ObjectUtils.isEmpty(account)) {
            throw new MyException(ErrorCode.NOT_FOUND_ACC);
        }
    }

    private void addUseHistory (Boolean type, Long money, Long presentMoney, Integer accountId, Long userId ) {
        UseHistory useHistory = new UseHistory();
        useHistory.setPresentMoney(presentMoney);
        useHistory.setCreateTime(new Date());
        useHistory.setAccountId(accountId);
        useHistory.setUserId(userId);
        if (type) {
            useHistory.setTopUpMoney(money);
            useHistory.setDeDuctMoney(new Long(0));
        } else {
            useHistory.setDeDuctMoney(money);
            useHistory.setTopUpMoney(new Long(0));
        }
        useHistoryRepository.save(useHistory);
    }

    private Specification<AccountManage> getWhereClause(Long userId, String accountName, String phone) {
        return (root, query, cb) -> {
            List<Predicate> predicate = new ArrayList<>();
            if (!StringUtils.isEmpty(userId)) {
                predicate.add(cb.like(root.get("id").as(String.class), "%"+userId+"%"));
            }
            if (!StringUtils.isEmpty(accountName)) {
                predicate.add(cb.like(root.get("name").as(String.class), "%"+accountName+"%"));
            }
            if (!StringUtils.isEmpty(phone)) {
                predicate.add(cb.like(root.get("phone").as(String.class), "%"+phone+"%"));
            }
            Predicate[] pre = new Predicate[predicate.size()];
            return query.where(predicate.toArray(pre)).getRestriction();
        };
    }
}
