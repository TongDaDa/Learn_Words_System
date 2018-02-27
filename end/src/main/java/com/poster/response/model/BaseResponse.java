package com.poster.response.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

/**
 * Created by zhaobin on 2018/1/12.
 */
@ApiModel("基础输出包")
public class BaseResponse {
    @ApiModelProperty("错误码")
    private String errorCode;

    @ApiModelProperty("错误信息")
    private String value;

    @ApiModelProperty("总记录")
    private Long totalResult;

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Long getTotalResult() {
        return totalResult;
    }

    public void setTotalResult(Long totalResult) {
        this.totalResult = totalResult;
    }
}
