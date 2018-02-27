package com.poster.utils;


import org.apache.commons.lang.ArrayUtils;
import org.apache.commons.lang.StringEscapeUtils;
import org.springframework.util.StringUtils;

import java.util.*;
import java.util.regex.Pattern;

/**
 * Created by zhaobin on 2016/9/20.
 */
public class StringUtil {
    public static Map<Object, Object> spliteStrMap(String args, String separator) {
        Map<Object, Object> map = new HashMap<Object, Object>();
        String[] strs = args.split(separator);
        for (String str : strs) {
            String[] strss = str.split("=");
            map.put(strss[0], strss[1]);
        }

        return map;
    }

    public static List<String> spliteStrList(String args, String separator) {
        List<String> list = new ArrayList();
        String[] strs = args.split(separator);
        for (String str : strs) {
            list.add(str);
        }

        return list;
    }

    /**
     * 字符串转long数组
     * @param args
     * @param distinct 是否去重
     * @return
     */
    public  static  Long[] spliteStrToLong(String args,boolean  distinct) {

        String[] split = args.split(",");

        if (distinct){
            Set<String> set = new HashSet<>(Arrays.asList(split));
            split = new String[set.size()];
            split = set.toArray(split);
        }

        Long[] result = new Long[split.length];
        for (int i = 0; i < split.length; i++) {
            result[i] = Long.parseLong(split[i]);
        }
        return result;
    }

    /**
     * 对特殊字符进行转义
     *
     * @param arg
     * @return
     */
    public static String sqlArgsTransfer(String arg) {

        if(StringUtils.isEmpty(arg)) return "";

        arg = StringEscapeUtils.escapeSql(arg);
        String[] args = {"\\", "#", "*", "/", "_", "%", "&", "|", "-", "^", "\"", "<", ">", "=", "`", "~", ".", ",", "?", "(", ")", ":", ";"};

        for (int i = 0; i < args.length; i++) {
            String temp = args[i];
            if (temp.equals("\\")) {
                temp = "\\\\";
            }
            arg = arg.replace(args[i], "\\\\" + temp);
        }
        return arg;
    }

    /**
     * 校验手机号
     * @param cellphone
     * @return
     */
    public static boolean checkCellphone(String cellphone) {
        String regex = "^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$";
        return Pattern.matches(regex, cellphone);
    }
}
