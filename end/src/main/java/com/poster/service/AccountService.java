package com.poster.service;

import com.poster.dao.repository.AccountRepository;
import com.poster.entity.Account;
import com.poster.response.model.AccountResponse;

import com.poster.utils.ErrorCode;
import com.poster.utils.MyException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Date;

/**
 * Created by zhaobin on 2018/1/16.
 */
@Service
@Transactional
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;

    public void save(String accountName,Boolean isBill, Integer giveRule, String moneyJSON, Long id) {
        Account old;
        List<Account> byAccountName = accountRepository.findByAccountName(accountName);
        if (id == null) {
            if (!CollectionUtils.isEmpty(byAccountName)) {
                throw new MyException(ErrorCode.EXIST_ERROR);
            }
            old = new Account();
        } else {
            old = accountRepository.findOne(id);
        }
        old.setAccountName(accountName);
        old.setBill(isBill);
        old.setGiveRule(giveRule);
        old.setMoneyJSON(moneyJSON);
        accountRepository.save(old);
    }

    public void update(String accountName,Boolean isBill, Integer giveRule, String moneyJSON){
        //更新
        Account old;
        List<Account> byAccountName = accountRepository.findByAccountName(accountName);
    }

    public List<Account> list(Integer pageNum, Integer pageSize,AccountResponse rd) {
        List<Account> accountList ;
        Long total = 0L;
        if (rd != null){
            Page<Account> page = accountRepository.findAll(new PageRequest(pageNum - 1, pageSize));
            accountList = page.getContent();
            total = page.getTotalElements();
            rd.setAccounts(accountList);
            rd.setTotalResult(total);
        }else {
            accountList = accountRepository.findAll();
        }
        return accountList;
    }

    public void del(Long id) {
        //注解掉删除
        accountRepository.delete(id);
    }

    public Account get(Long id) {
        return accountRepository.findOne(id);
    }


    private Specification<Account> getWhereClause(String name) {
        return (root, query, cb) -> {
            List<Predicate> predicate = new ArrayList<>();
            if (!StringUtils.isEmpty(name)) {
                predicate.add(cb.equal(root.get("name").as(String.class), name));
            }
            Predicate[] pre = new Predicate[predicate.size()];
            return query.where(predicate.toArray(pre)).getRestriction();
        };
    }
}
