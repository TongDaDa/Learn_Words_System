package com.poster.pure.entity;

import com.poster.pure.entity.AccountWithOutBalance;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Transient;
import java.util.List;

/**
 * 查询帐户帐户，以及帐户余额
 */

public class AccountWithOut {
    @Id
    @GeneratedValue
    private long id;
    private String phone;
    private Long userId;
    private String userName;
    private String accounts;
    @Transient
    private List<AccountWithOutBalance> accountList;


    public List<AccountWithOutBalance> getAccountList() {
        return accountList;
    }

    public void setAccountList(List<AccountWithOutBalance> accountList) {
        this.accountList = accountList;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getAccounts() {
        return accounts;
    }

    public void setAccounts(String accounts) {
        this.accounts = accounts;
    }

}
