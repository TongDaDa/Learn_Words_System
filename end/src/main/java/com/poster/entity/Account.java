package com.poster.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

/**
 * 银行帐户
 */
@Entity
public class Account {
    @Id
    @GeneratedValue
    private long id;
    private String accountName;
    private Boolean isBill;
    private Integer giveRule;
    private String moneyJSON;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public Boolean getBill() {
        return isBill;
    }

    public void setBill(Boolean bill) {
        isBill = bill;
    }

    public Integer getGiveRule() {
        return giveRule;
    }

    public String getMoneyJSON() {
        return moneyJSON;
    }

    public void setMoneyJSON(String moneyJSON) {
        this.moneyJSON = moneyJSON;
    }

    public void setGiveRule(Integer giveRule) {
        this.giveRule = giveRule;
    }
}
