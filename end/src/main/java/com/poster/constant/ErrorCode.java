package com.poster.constant;

import java.util.EnumSet;
import java.util.HashMap;
import java.util.Map;

public enum ErrorCode {

    OK("0", "成功"),
    ERROR("500", "服务器错误"),
    EXIST("7777","已存在" ),
    NOT_EXIST("8888","数据不存在"),
    PARAM_ERROR("9999","参数错误" ),
    USER_EXIST("100001","用户已存在"),
    USER_ERROR("100002","用户名或密码错误"),
    NOT_LOGIN("100003","请先登录" ),
    TOKEN_FAILURE("100004","Token失效" ),
    PHONE_EXIST("100005","手机号已存在"),
    USER_NOTEXIST("100006","用户不存在" ),
    PASSWORD_ERROR("100007","密码错误" ),
    ERROR_ROOT("100008","不能添加root用户" ),
    ERROR_ROOT_DELETE("100010","root用户不能删除" ),
    ERROR_ROOT_UPDATE("100009","root用户不能编辑" ),
    METHOD_ERROR("200001","接口不存在或访问方式错误！" ),
    REDMONEY_RE_ERROR("300001","您已参加过该活动"),
    ACTIVITY_END_ERROR("300002","该活动已结束，请关注我们后续的活动" ),
    Activity_EXIST_ERROR("300003","活动不存在,或已结束！" ),
    ERROR_PAY_nonsupport("400004","系统维护中，暂不支持此种充值！" ),
    FREQUENT_ERROE("400005","操作过于频繁！" ),
    PAY_ERROR("400006","支付失败"),
    MONEY_ERROR("400007","金额错误" ),
    SerialNumber_ERROR("400008","流水号错误" ),
    ENTERPRISE_ERROR("400009","企业已被禁用" );


    public String key;
    public String value;

    ErrorCode(String key, String value) {
        this.key = key;
        this.value = value;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}