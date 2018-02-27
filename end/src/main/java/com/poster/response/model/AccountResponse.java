package com.poster.response.model;
import com.poster.entity.Account;
import io.swagger.annotations.ApiModel;

import java.util.List;

/**
 * Created by zhaobin on 2018/1/16.
 */
@ApiModel("账户返回")
public class AccountResponse extends BaseResponse {
    private Account account;

    private List<Account> accounts;

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public List<Account> getAccounts() {
        return accounts;
    }

    public void setAccounts(List<Account> accounts) {
        this.accounts = accounts;
    }
}
