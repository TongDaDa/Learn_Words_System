package com.poster.response.model;
import com.poster.entity.AccountManage;
import io.swagger.annotations.ApiModel;

import java.util.List;

/**
 * Created by zhaobin on 2018/1/16.
 */
@ApiModel("账户管理")
public class AccountManageResponse extends BaseResponse {
    private AccountManage account;
    private List<AccountManage> accountManageList;

    public AccountManage getAccount() {
        return account;
    }

    public void setAccountManage (AccountManage account) {
        this.account = account;
    }

    public List<AccountManage> getAccountManageList() {
        return accountManageList;
    }

    public void setAccountManageList(List<AccountManage> accountManageList) {
        this.accountManageList = accountManageList;
    }
}
