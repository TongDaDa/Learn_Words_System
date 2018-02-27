package com.poster.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * Created by zhaobin on 2016/10/11.
 */
public class DateUtil {

    private static Logger log = LoggerFactory.getLogger(DateUtil.class);

    public static String getFormate(Date date) {
        if (StringUtils.isEmpty(date)) {
            return null;
        }
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return simpleDateFormat.format(date);
    }

    public static String getFormateDay(Date date) {
        if (StringUtils.isEmpty(date)) {
            return null;
        }
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        return simpleDateFormat.format(date);
    }

    public static Date changeToDay(Date date) throws ParseException {
        if (StringUtils.isEmpty(date)) {
            return null;
        }
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String format = simpleDateFormat.format(date);
        return  simpleDateFormat.parse(format);
    }

    public static String getFormateBy(Date date, String formate) {
        if (StringUtils.isEmpty(date)) {
            return null;
        }
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(formate);
        return simpleDateFormat.format(date);
    }

    public static Date parseByFormat(String str,String format) {
        if (StringUtils.isEmpty(str)) {
            return null;
        }
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(format);
        try {
            return simpleDateFormat.parse(str);
        } catch (ParseException e) {
            log.error("转化时间错误："+e);
        }

        return new Date();
    }

    public static Date parse(String date,String format) throws ParseException {
        if (StringUtils.isEmpty(date)) {
            return null;
        }
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(format);
        return simpleDateFormat.parse(date);
    }

    /**
     * 为原日期添加指定的月份并返回添加后的日期，如果天数为负数则在原日期的基础上减去指定的天数
     * @param source
     * @param month
     * @return
     */
    public static Date addMonth(Date source, int month){
        try{
            SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
            format.parse(format.format(source));
            Calendar calendar = format.getCalendar();
            calendar.add(Calendar.MONTH, month);
            return calendar.getTime();
        } catch (Exception e){
            throw new RuntimeException("add days is error.");
        }
    }

    /**
     * 为原日期添加指定的月份并返回添加后的日期，如果天数为负数则在原日期的基础上减去指定的天数
     * @param source
     * @param hour
     * @return
     */
    public static Date addHour(Date source, int hour){
        try{
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(source);
            calendar.add(Calendar.HOUR_OF_DAY, hour);
            return calendar.getTime();
        } catch (Exception e){
            throw new RuntimeException("add hour is error.");
        }
    }

    /**
     * 添加一分钟
     * @param source
     * @param minute
     * @return
     */
    public static Date addMinute(Date source, int minute){
        try{
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(source);
            calendar.add(Calendar.MINUTE, minute);
            return calendar.getTime();
        } catch (Exception e){
            throw new RuntimeException("add hour is error.");
        }
    }

    public static Date addDay(Date source, int day){
        try{
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(source);
            calendar.add(Calendar.DAY_OF_MONTH, day);
            return calendar.getTime();
        } catch (Exception e){
            throw new RuntimeException("add day is error.");
        }
    }

    public static Date addYears(Date yearsStartDate, int i) {
        try{
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(yearsStartDate);
            calendar.add(Calendar.YEAR, i);
            return calendar.getTime();
        } catch (Exception e){
            throw new RuntimeException("add day is error.");
        }
    }

    /**
     * 年代开始时间
     * @param years
     * @return
     */
    public static String yearsStartParse(String years){

        if (StringUtils.isEmpty(years)) return null;

        if (years.endsWith("年代") && !years.startsWith("0")){
            String substring = years.substring(0, 2);
            return "19"+substring;
        }
        if (years.endsWith("年代") && years.startsWith("0")){
            String substring = years.substring(0, 2);
            return "20"+substring;
        }
        if ("其它".equals(years)){
            return null;
        }

        return years;
    }

    /**
     * 年代开始时间
     * @param years
     * @return
     */
    public static String yearsEndParse(String years){

        if (StringUtils.isEmpty(years)) return null;

        if (years.endsWith("年代") && !years.startsWith("0")){
            String substring = years.substring(0,1);
            return "19"+substring+"9";
        }
        if (years.endsWith("年代") && years.startsWith("0")){
            String substring = years.substring(0,1);
            return "20"+substring+"9";
        }
        if ("其它".equals(years)){
            return "1969";
        }
        return years;
    }

/*    public static void main(String[] args) {
        System.out.println(yearsStartParse("其它"));
        System.out.println(yearsEndParse("其它"));
        System.out.println("-----------------------");
        System.out.println(yearsStartParse("80年代"));
        System.out.println(yearsEndParse("80年代"));
        System.out.println("-----------------------");
        System.out.println(yearsStartParse("00年代"));
        System.out.println(yearsEndParse("00年代"));
        System.out.println("-----------------------");
        System.out.println(yearsStartParse("2013"));
        System.out.println(yearsEndParse("2013"));
    }*/
}
