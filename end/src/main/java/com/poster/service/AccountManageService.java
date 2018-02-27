package com.poster.service;
import com.poster.dao.repository.AccountManagerRepository;
import com.poster.dao.repository.RelevanceAccountRepository;
import com.poster.dao.repository.UseHistoryRepository;
import com.poster.entity.AccountManage;
import com.poster.entity.RelevanceAccount;
import com.poster.entity.UseHistory;
import com.poster.utils.ErrorCode;
import com.poster.utils.MyException;
import io.swagger.models.auth.In;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import javax.persistence.criteria.Predicate;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Date;


/**
 * Created by zhaobin on 2018/1/16.
 */
@Service
@Transactional
public class AccountManageService {
    @Autowired
    private AccountManagerRepository accountManagerRepository;
    @Autowired
    private RelevanceAccountRepository relevanceAccountRepository;
    @Autowired
    private UseHistoryRepository useHistoryRepository;

    public void save(String phone, String name) {
        AccountManage old;
        List <AccountManage> p = accountManagerRepository.findByPhone(phone);
        // 如果同样账户类型与手机已经有定义，不能添加
        //p == phone && a == accountType
        if (p==null) {
            throw new MyException(ErrorCode.APPID_ERROR);
        } else {
            old = new AccountManage();
            Date date = new Date();
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            old.setCreateTime(dateFormat.format(date));
            old.setPhone(phone);
            old.setName(name);
        }
        accountManagerRepository.save(old);
    }

    public void saveAccountIds (Long id, String accountIds){
        AccountManage old;
        AccountManage p = accountManagerRepository.findOne(id);
        RelevanceAccount re_old;

        if (p == null) {
            throw new MyException(ErrorCode.APPID_ERROR);
        } else {
            old = new AccountManage();
            String[] accountIdsArr = accountIds.split(",");
            for (int i=0; i<accountIdsArr.length; i++){
                re_old = new RelevanceAccount();
                re_old.setUserId(id);
                re_old.setAccountId(Integer.valueOf(accountIdsArr[i]));
                re_old.setPresentBalance(new Long(0));
                re_old.setTopUpMoney(new Long(0));
                relevanceAccountRepository.save(re_old);
            }
            old.setId(id);
            old.setAccountType(accountIds);
            old.setCreateTime(p.getCreateTime());
            old.setName(p.getName());
            old.setPhone(p.getPhone());
        }
        accountManagerRepository.save(old);
    }

    public Page<UseHistory> getUseHistoryList (Long userId, Integer accountId, Integer pageNum, Integer pageSize){
        return useHistoryRepository.findByUserIdAndAccountId(userId,accountId,new PageRequest(pageNum - 1, pageSize));
    }

    public Page<AccountManage> list(String name, String phone, Integer pageNum, Integer pageSize, Integer endemicId) {
       return accountManagerRepository.findAll(getWhereClause(name,phone,endemicId),new PageRequest(pageNum - 1, pageSize));
    }

    public RelevanceAccount getRelevanceAccount(Long userId, Integer accountId) {
        //注解掉删除
        return relevanceAccountRepository.findByUserIdAndAccountId(userId,accountId);
    }

    public AccountManage get(Long id) {
        return accountManagerRepository.findOne(id);
    }

    private Specification<AccountManage> getWhereClause(String name,String phone, Integer endemicId) {
        return (root, query, cb) -> {
            List<Predicate> predicate = new ArrayList<>();
            if (!StringUtils.isEmpty(name)) {
                predicate.add(cb.like(root.get("name").as(String.class), "%"+name+"%"));
            }
            if (!StringUtils.isEmpty(phone)) {
                predicate.add(cb.like(root.get("phone").as(String.class), "%"+phone+"%"));
            }
            if (!StringUtils.isEmpty(endemicId)) {
                predicate.add(cb.like(root.get("endemicId").as(String.class), "%"+endemicId+"%"));
            }
            Predicate[] pre = new Predicate[predicate.size()];
            return query.where(predicate.toArray(pre)).getRestriction();
        };
    }
}