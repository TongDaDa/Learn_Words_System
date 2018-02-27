package com.poster.response.model;
import com.poster.entity.RelevanceAccount;
import io.swagger.annotations.ApiModel;

import java.util.List;

@ApiModel("账户管理")
public class RelevanceAccountResponse extends BaseResponse{
    private RelevanceAccount balanceModal;

    public RelevanceAccount getBalanceModal() {
        return balanceModal;
    }

    public void setBalanceModal(RelevanceAccount balanceModal) {
        this.balanceModal = balanceModal;
    }
}
