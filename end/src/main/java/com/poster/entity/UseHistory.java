package com.poster.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class UseHistory {
    @Id
    @GeneratedValue
    private long id;
    private Long userId;
    private Integer accountId;
    private Date createTime;
    private Long deDuctMoney;
    private Long presentMoney;
    private Long topUpMoney;

    public long getId() {
        return id;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Long getDeDuctMoney() {
        return deDuctMoney;
    }

    public void setDeDuctMoney(Long deDuctMoney) {
        this.deDuctMoney = deDuctMoney;
    }

    public Long getPresentMoney() {
        return presentMoney;
    }

    public void setPresentMoney(Long presentMoney) {
        this.presentMoney = presentMoney;
    }

    public Long getTopUpMoney() {
        return topUpMoney;
    }

    public void setTopUpMoney(Long topUpMoney) {
        this.topUpMoney = topUpMoney;
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
}
