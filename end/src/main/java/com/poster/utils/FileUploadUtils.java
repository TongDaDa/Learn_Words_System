package com.poster.utils;

import com.alibaba.fastjson.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;
import java.util.*;

public class FileUploadUtils {

    private static Logger logger = LoggerFactory.getLogger(FileUploadUtils.class);

    public static void saveFile(HttpServletRequest request, HttpServletResponse response, MultipartFile file, String dir) throws IOException {

        HashMap<String, String> map = new HashMap<String, String>();
        PrintWriter writer = null;
        try {
            response.setContentType("text/html;charset=UTF-8");
            writer = response.getWriter();

            String uploadRootPath = "upload/"+dir;
            File uploadRootDir = new File(uploadRootPath);
            if (!uploadRootDir.exists()) {
                uploadRootDir.mkdirs();
            }

            String name = file.getOriginalFilename();
            String fileName = name;
            int i = name.lastIndexOf(".");
            String nameStart = name.substring(0,i);
            String nameEnd = name.substring(i,name.length());

            name = (new Date().getTime()) + (int) Math.random() * 100 + nameEnd;

            String absolutePath = null;
            if (name != null && name.length() > 0) {

                byte[] bytes = file.getBytes();

                File serverFile = new File(uploadRootDir.getAbsolutePath() + File.separator + name);
                serverFile.createNewFile();
                BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile));
                stream.write(bytes);
                stream.close();

                absolutePath = serverFile.getAbsolutePath();
            }

          //  String url = "http://"+request.getServerName()+":"+request.getServerPort()+"/file/download?filename=upload/"+dir+"/" + name;
            String url = "http://"+request.getServerName()+":"+request.getServerPort()+"/file/download?filename="+absolutePath;
            map.put("url",url);
            map.put("name",fileName);
            map.put("status","0");
        } catch (IOException e) {
            map.put("status","1");
        }
        writer.write(URLEncoder.encode(JSONObject.toJSONString(map),"UTF-8"));
    }

    /**
     * 批量文件上传
     * @param request
     * @param response
     * @param files
     * @param dir
     */
    public static void saveFiles(HttpServletRequest request, HttpServletResponse response, MultipartFile[] files, String dir) throws UnsupportedEncodingException {
        List<HashMap<String, String>> resultList = new ArrayList<>();
        PrintWriter writer = null;
        try {
            writer = response.getWriter();
        } catch (IOException e) {
            writer.write(JSONObject.toJSONString(resultList));
        }

        String uploadRootPath = "upload/"+dir;
        File uploadRootDir = new File(uploadRootPath);
        if (!uploadRootDir.exists()) {
            uploadRootDir.mkdirs();
        }


        for (MultipartFile file : files) {

            HashMap<String, String> map = new HashMap<String, String>();
            try {

                String name = file.getOriginalFilename();
                String fileName = name;
                int i = name.lastIndexOf(".");
                String nameStart = name.substring(0,i);
                String nameEnd = name.substring(i,name.length());

                name = (new Date().getTime()) + (int) Math.random() * 100 + nameEnd;

                String absolutePath = null;
                if (name != null && name.length() > 0) {

                    byte[] bytes = file.getBytes();

                    File serverFile = new File(uploadRootDir.getAbsolutePath() + File.separator + name);
                    serverFile.createNewFile();
                    BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile));
                    stream.write(bytes);
                    stream.close();

                    absolutePath = serverFile.getAbsolutePath();
                }

                String url = "http://"+request.getServerName()+":"+request.getServerPort()+"/file/download?filename="+absolutePath;
                map.put("url",url);
                map.put("name",fileName);
                map.put("status","0");
            } catch (IOException e) {
                map.put("status","1");
            }

            resultList.add(map);
        }

        response.setContentType("text/html;charset=UTF-8");
        writer.write(URLEncoder.encode(JSONObject.toJSONString(resultList),"UTF-8"));
    }

    /**
     * 删除文件
     */
    public static String deleteFile(String url, HttpServletRequest request) {

        try {
            String url01 = url.substring(0, url.lastIndexOf("/"));
            String fileName = url.substring(url.lastIndexOf("/")+1,url.length());
            String dir = url01.substring(url01.lastIndexOf("/")+1,url01.length());
            String uploadRootPath = request.getServletContext().getRealPath(dir);
            File uploadRootDir = new File(uploadRootPath);
            File deleteFile = new File(uploadRootDir.getAbsolutePath() + File.separator + fileName);
            if (deleteFile.exists()){
                deleteFile.delete();
            }
            return "1";
        } catch (Exception e) {
            e.printStackTrace();
            return "0";
        }
    }

    public static void deleteFile(String path) {

        try {
            File file = new File(path);
            if (file.exists()){
                file.delete();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void deleteFileFromUrl(String url) {

        try {

            String path = url.substring(url.indexOf("filename=")+"filename=".length());

            File file = new File(path);
            if (file.exists()){
                file.delete();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void download(String filename, String realname, HttpServletRequest request, HttpServletResponse response){
        try {
            File file = new File(filename);
            filename = file.getName();
            if (file.exists()) {
                InputStream ins = new FileInputStream(file);
                BufferedInputStream bins = new BufferedInputStream(ins);// 放到缓冲流里面
                OutputStream outs = response.getOutputStream();// 获取文件输出IO流
                BufferedOutputStream bouts = new BufferedOutputStream(outs);
                if (!StringUtils.isEmpty(realname)){
                    filename = realname;
                }
                if (request.getHeader("User-Agent").toUpperCase().indexOf("MSIE") > 0) {
                    filename = URLEncoder.encode(filename, "UTF-8");
                } else {
                    filename = new String(filename.getBytes("UTF-8"), "ISO8859-1");
                }
                response.setContentType("application/octet-stream;charset=GBK");// 设置response内容的类型
                response.setHeader("Content-disposition", "attachment;filename=" + filename);// 设置头部信息
                int bytesRead = 0;
                byte[] buffer = new byte[8192];
                // 开始向网络传输文件流
                while ((bytesRead = bins.read(buffer, 0, 8192)) != -1) {
                    bouts.write(buffer, 0, bytesRead);
                }
                bouts.flush();// 这里一定要调用flush()方法
                ins.close();
                bins.close();
                outs.close();
                bouts.close();
            } else {
                logger.info("下载数据错误！文件不存在");
            }
        } catch (IOException e) {
            logger.error("文件下载出错", e);
        }
    }

}
