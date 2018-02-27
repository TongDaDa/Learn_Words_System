package com.poster.response.model;
import com.poster.pure.entity.AccountWithOut;
import io.swagger.annotations.ApiModel;
import java.util.List;

@ApiModel("帐户管理查询")
public class AccountWithoutResponse extends BaseResponse {
    private List<AccountWithOut> accountList;
    public List<AccountWithOut> getAccountModal() {
        return accountList;
    }

    public void setAccountModal(List<AccountWithOut> accountModal) {
        this.accountList = accountModal;
    }

}
