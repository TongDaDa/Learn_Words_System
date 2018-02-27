package com.poster.response.model;

import com.poster.entity.UseHistory;
import io.swagger.annotations.ApiModel;
import org.springframework.data.domain.Page;

import java.awt.print.Pageable;
import java.util.List;

@ApiModel("使用记录查询")
public class UseHistoryResponse extends BaseResponse{
    private List<UseHistory> useHistoryList;

    public List<UseHistory> getUseHistoryList() {
        return useHistoryList;
    }

    public void setUseHistoryList(List<UseHistory> useHistoryList) {
        this.useHistoryList = useHistoryList;
    }
}
