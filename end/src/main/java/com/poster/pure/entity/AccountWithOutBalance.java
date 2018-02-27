package com.poster.pure.entity;

/**
 * (外部接口)帐户查询 银行帐户名称以及帐户余额;
 */
public class AccountWithOutBalance {
    private String accountName;
    private Long topUpMoney;
    private Long presentMoney;
    private Integer accountId;

    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public Long getTopUpMoney() {
        return topUpMoney;
    }

    public void setTopUpMoney(Long topUpMoney) {
        this.topUpMoney = topUpMoney;
    }

    public Long getPresentMoney() {
        return presentMoney;
    }

    public void setPresentMoney(Long presentMoney) {
        this.presentMoney = presentMoney;
    }

    public Integer getAccountId() {
        return accountId;
    }

    public void setAccountId(Integer accountId) {
        this.accountId = accountId;
    }
}
