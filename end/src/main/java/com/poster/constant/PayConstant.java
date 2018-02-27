package com.poster.constant;

import com.poster.utils.MD5;

public class PayConstant {
    //测试
    /*public static final String userid = "A08566";
    public static final String userpws = "4c625b7861a92c7971cd2029c2fd3c4a";
    public static final String baseURL = "http://Apitest.ofpay.com/";
    public static final String KeyStr = "OFCARD";*/

    //正式
    public static final String userid = "A1407034";
    public static final String userpws = MD5.GetMD5Code("K1bTpb");
    public static final String baseURL = "http://api2.ofpay.com/";
    public static final String KeyStr = "LXBLylkj";
    public static final String version = "6.0";

    public static final String ret_url = "http://120.78.12.39/pay/callback";

}
