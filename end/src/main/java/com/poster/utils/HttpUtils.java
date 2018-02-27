package com.poster.utils;

import org.apache.commons.io.IOUtils;
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.dom4j.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLDecoder;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class HttpUtils {

    private static Logger logger = LoggerFactory.getLogger(HttpUtils.class);

    private static CloseableHttpClient httpclient = HttpClients.createDefault();

    public static String getURL(String url , Map<String,String> params,String encoding){
        CloseableHttpResponse response = null;
        try {
            if (params != null && !params.isEmpty()){
                url+="?";
                Set<Map.Entry<String, String>> entries = params.entrySet();
                for (Map.Entry<String, String> entry : entries) {
                    String key = entry.getKey();
                    String value = entry.getValue();
                    url+=(key+"="+value+"&");
                }
                url=url.substring(0,url.length()-1);
            }

            logger.info("get请求url：{}",url);

            HttpGet httpGet = new HttpGet(url);
            response = httpclient.execute(httpGet);

            HttpEntity entity = response.getEntity();
            InputStream inputStream = entity.getContent();
            String content = IOUtils.toString(inputStream,encoding);
            logger.info("get请求返回数据:{}",content);
            return content;
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (response != null){
                    response.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }


        return null;
    }

    public static String postURL(String url , Map<String,String> params){
        CloseableHttpResponse response = null;
        try {
            HttpPost httpPost = new HttpPost(url);

            if (params != null && !params.isEmpty()){

                List <NameValuePair> nvps = new ArrayList <NameValuePair>();
                Set<Map.Entry<String, String>> entries = params.entrySet();
                for (Map.Entry<String, String> entry : entries) {
                    String key = entry.getKey();
                    String value = entry.getValue();
                    nvps.add(new BasicNameValuePair(key, value));
                }
                httpPost.setEntity(new UrlEncodedFormEntity(nvps));
            }

            response = httpclient.execute(httpPost);
            HttpEntity entity = response.getEntity();
            InputStream inputStream = entity.getContent();
            String content = IOUtils.toString(inputStream);
            return content;
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                response.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }


        return null;
    }

    public static String postURL(String url , String params){
        CloseableHttpResponse response = null;
        try {
            HttpPost httpPost = new HttpPost(url);

            StringEntity stringEntity = new StringEntity(params, "UTF-8");
            httpPost.setEntity(stringEntity);

            response = httpclient.execute(httpPost);
            HttpEntity entity = response.getEntity();
            InputStream inputStream = entity.getContent();
            String content = IOUtils.toString(inputStream);
            return content;
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                response.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }


        return null;
    }

    /**
     * 获取用户真实IP地址，不使用request.getRemoteAddr()的原因是有可能用户使用了代理软件方式避免真实IP地址,
     * 可是，如果通过了多级反向代理的话，X-Forwarded-For的值并不止一个，而是一串IP值
     *
     * @return ip
     */
    public static String getIpAddr(HttpServletRequest request) {
        String ip = request.getHeader("x-forwarded-for");
        System.out.println("x-forwarded-for ip: " + ip);
        if (ip != null && ip.length() != 0 && !"unknown".equalsIgnoreCase(ip)) {
            // 多次反向代理后会有多个ip值，第一个ip才是真实ip
            if( ip.indexOf(",")!=-1 ){
                ip = ip.split(",")[0];
            }
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
            System.out.println("Proxy-Client-IP ip: " + ip);
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
            System.out.println("WL-Proxy-Client-IP ip: " + ip);
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_CLIENT_IP");
            System.out.println("HTTP_CLIENT_IP ip: " + ip);
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
            System.out.println("HTTP_X_FORWARDED_FOR ip: " + ip);
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-Real-IP");
            System.out.println("X-Real-IP ip: " + ip);
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
            System.out.println("getRemoteAddr ip: " + ip);
        }
        if ("0:0:0:0:0:0:0:1".equals(ip)||"127.0.0.1".equals(ip)){
            ip = getV4IP();
        }
        return ip;
    }

    public static String getV4IP(){
        String ip = "";
        String chinaz = "http://ip.chinaz.com";

        StringBuilder inputLine = new StringBuilder();
        String read = "";
        URL url = null;
        HttpURLConnection urlConnection = null;
        BufferedReader in = null;
        try {
            url = new URL(chinaz);
            urlConnection = (HttpURLConnection) url.openConnection();
            in = new BufferedReader( new InputStreamReader(urlConnection.getInputStream(),"UTF-8"));
            while((read=in.readLine())!=null){
                inputLine.append(read+"\r\n");
            }
            //System.out.println(inputLine.toString());
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }finally{
            if(in!=null){
                try {
                    in.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }


        Pattern p = Pattern.compile("\\<dd class\\=\"fz24\">(.*?)\\<\\/dd>");
        Matcher m = p.matcher(inputLine.toString());
        if(m.find()){
            String ipstr = m.group(1);
            ip = ipstr;
            //System.out.println(ipstr);
        }
        return ip;
    }
}
