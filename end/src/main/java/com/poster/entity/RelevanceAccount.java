package com.poster.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * 用户&帐户&余额 关联表
 */
@Entity
public class RelevanceAccount {
    @Id
    @GeneratedValue
    private Long id;
    private Long userId;
    private Integer accountId;
    private Long PresentBalance;
    private Long topUpMoney;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Integer getAccountId() {
        return accountId;
    }

    public void setAccountId(Integer accountId) {
        this.accountId = accountId;
    }

    public Long getPresentBalance() {
        return PresentBalance;
    }

    public void setPresentBalance(Long presentBalance) {
        PresentBalance = presentBalance;
    }

    public Long getTopUpMoney() {
        return topUpMoney;
    }

    public void setTopUpMoney(Long topUpMoney) {
        this.topUpMoney = topUpMoney;
    }
}
