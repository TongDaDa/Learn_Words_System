package com.poster.utils;

import java.util.EnumSet;
import java.util.HashMap;
import java.util.Map;

public enum ErrorCode {

    OK("0", "成功"),
    PARAM_ERROR("9999", "参数错误"),
    ALREDAY_HAVE("9010", "此单词已经存在"),
    NOT_HAVE("9002", "不存在"),

    HAS_USED_ERROR("10000", "已经使用"),
    HAS_NO_RECORD_ERROR("10001", "记录不存在"),
    USER_NOT_EXIST("20001", "用户不存在"),
    USER_PWD_ERROR("20002", "用户密码不对"),
    EXTERNAL_USED("8004", "外部应用被使用"),
    TOKEN_FAILURE("9001", "token失效"),

    CODE_ERROR("9003", "CODE不存在"),
    CODE_TIMEOUT("9004", "CODE失效"),
    HAS_BIND("9005", "已经绑定"),
    AUTHOR_ERROR("9006", "验证授权失败"),
    NO_PERMISSION("9007", "没有此权限"),
    REQUEST_INVALID("9008", "请求失效"),
    NO_PERMISSIONS("9009", "未查询到权限"),

    DATE_ERROR("9011", "日期格式非法"),
    GET_TOKEN_ERROR("30000", "获取token失败"),
    ERROR("500", "服务器错误"),
    EXIST_ERROR("100001","已存在，重复添加"),
    BALANCE_NOT_ENOUGH("100002","帐户余额不足" ),
    NOT_FOUND_ACC("100003","没有找到充值帐户" );

    public String value;
    public String memo;

    ErrorCode(String value, String memo) {
        this.value = value;
        this.memo = memo;
    }

    private static final Map<String, ErrorCode> lookup = new HashMap<String, ErrorCode>();

    static {
        for (ErrorCode s : EnumSet.allOf(ErrorCode.class)) {
            lookup.put(s.value, s);
        }
    }

    public static ErrorCode get(String value) {
        return lookup.get(value);
    }
}
