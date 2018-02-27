package com.poster.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

/**
 * 用户实体
 */
@Entity
public class AccountManage {
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAccountType() {
        return accountType;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getEndemicId() {
        return endemicId;
    }

    public void setEndemicId(Integer endemicId) {
        this.endemicId = endemicId;
    }

    @Id
    @GeneratedValue
    private long id;
    private String createTime;
    private String phone;
    private String accountType;
    private String name;
    private Integer endemicId;
}
