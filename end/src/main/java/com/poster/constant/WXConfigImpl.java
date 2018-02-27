package com.poster.constant;

import com.github.wxpay.sdk.WXPayConfig;

import java.io.InputStream;

public class WXConfigImpl implements WXPayConfig{
    @Override
    public String getAppID() {
        return WXConstant.appid;
    }

    @Override
    public String getMchID() {
        return "1491817462";
    }

    @Override
    public String getKey() {
        return "key123abcdwfadfsadfsadfsadfwerwe";
    }

    @Override
    public InputStream getCertStream() {
        return null;
    }

    @Override
    public int getHttpConnectTimeoutMs() {
        return 30*1000;
    }

    @Override
    public int getHttpReadTimeoutMs() {
        return 30*1000;
    }
}
