package com.poster.utils;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

public class URLEncoderUtils {

    public static String encode(String str){

        try {
            str = URLEncoder.encode(str,"UTF-8");
            str = str.replaceAll("\\+"," ");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return str;
    }

}
