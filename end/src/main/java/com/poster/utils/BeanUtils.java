package com.poster.utils;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.List;

/**
 * Created by huyue on 2017/5/31.
 * bean常用操作工具类
 */
public class BeanUtils {


    /**
     * List属性拷贝
     * @param sourceList
     * @param targetList
     * @param excludeProperty
     * @param <S>
     * @param <T>
     * @throws IllegalAccessException
     * @throws InstantiationException
     */
    public  static <S,T> void copyBeanList(List<S> sourceList,List<T> targetList,Class<T> targetClazz,String ... excludeProperty) throws IllegalAccessException, InstantiationException {

        int size = sourceList.size();

        if (size == 0 ) return;

        for (int i = 0; i < size; i++) {
            T t = targetClazz.newInstance();
            copyBean(sourceList.get(i),t,excludeProperty);
           // org.springframework.beans.BeanUtils.copyProperties(sourceList.get(i),t,excludeProperty);

            targetList.add(t);
        }

    }

    /**
     * bean属性拷贝
     * @param source
     * @param target
     * @param excludeProperty
     * @param <S>
     * @param <T>
     */
    public static <S,T> void copyBean(S source, T target, String ... excludeProperty){

       // org.springframework.beans.BeanUtils.copyProperties(source,target,excludeProperty);

        Class<?> sourceClass = source.getClass();
        Class<?> targetClass = target.getClass();
        Field[] sourceFields = sourceClass.getDeclaredFields();
        List<String> excludePropertyList = Arrays.asList(excludeProperty);
        int length = sourceFields.length;
        for (int i = 0; i < length ; i++) {
            Field declaredField = sourceFields[i];
            declaredField.setAccessible(true);

            String fieldName = declaredField.getName();
            boolean b = excludePropertyList.contains(fieldName);

            if (b){
                continue;
            }

            try {
                Field targetField = targetClass.getDeclaredField(fieldName);
                targetField.setAccessible(true);
                Class<?> type = targetField.getType();
                if (type == String.class){
                    Object o = declaredField.get(source);
                    if(o == null || "null".equals(o.toString())){
                        targetField.set(target,"");
                    }else {
                        targetField.set(target,o.toString());
                    }
                }else {
                    targetField.set(target,declaredField.get(source));
                }
            }
            catch (Exception e) {
               // e.printStackTrace();
            }
        }
    }
}
