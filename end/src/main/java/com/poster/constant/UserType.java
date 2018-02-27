package com.poster.constant;

/**
 * 用户类型
 */
public enum UserType {

    MANAGER("0","后台管理人员"),
    POSTER("1","广告主用户"),
    PROPERTY("2","物业用户");

    private String value;
    private String desc;

    UserType(String value, String desc) {
        this.value = value;
        this.desc = desc;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    @Override
    public String toString() {
        return "UserType{" +
                "value='" + value + '\'' +
                ", desc='" + desc + '\'' +
                "} " + super.toString();
    }
}
