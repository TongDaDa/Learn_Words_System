package com.poster.service;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.poster.dao.repository.NewWordManageRepository;
import com.poster.dao.repository.SentenceManageRepository;
import com.poster.entity.NewWordManage;
import com.poster.entity.SentenceManage;
import com.poster.utils.ErrorCode;
import com.poster.utils.MyException;
import com.sun.org.apache.bcel.internal.generic.NEW;
import jdk.nashorn.internal.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

import javax.persistence.criteria.Predicate;
import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Array;
import java.util.*;

import java.util.regex.Pattern;

@Service
public class NewWordManageService {
    @Autowired
    NewWordManageRepository newWordManageRepository;
    @Autowired
    SentenceManageRepository sentenceManageRepository;

    @Transactional
    public void save(Long id,String word,String root,String example,String translated, String note){
        NewWordManage newWordManage;
        if (word == null) { throw new MyException(ErrorCode.PARAM_ERROR); }
        if (ObjectUtils.isEmpty(id)) {
            newWordManage = new NewWordManage();
            if (!ObjectUtils.isEmpty(newWordManageRepository.findByWord(word))) {
                throw new MyException(ErrorCode.ALREDAY_HAVE);
            }
        } else {
            newWordManage = newWordManageRepository.findOne(id);
        }
        //保存例子到SentenceManage
        JSONArray exampleList = JSONArray.parseArray(example);  //[{},{}]
        Byte type = 1;
        if (exampleList != null && exampleList.size() >= 1) {
            StringBuffer sentenceStr = new StringBuffer();
            for (int i = 0; i < exampleList.size(); i++) {
                JSONObject jsonObject = exampleList.getJSONObject(i);
                String sentence = jsonObject.getString("sentence");
                String translated_sentence = jsonObject.getString("translated");
                SentenceManage sentenceManage = new SentenceManage();
                sentenceManage.setSentence(sentence);
                sentenceManage.setTranslated(translated_sentence);
                sentenceManage.setType(type);
                sentenceManage.setKeyWord(word);
                sentenceManageRepository.save(sentenceManage);
                sentenceStr.append(String.valueOf(sentenceManage.getId()) + ',');
            }
            sentenceStr.setLength(sentenceStr.length()-1);
            newWordManage.setExample(sentenceStr.toString());
        }
        newWordManage.setCreateTime(new Date());
        newWordManage.setWord(word);
        newWordManage.setRoot(root);
        newWordManage.setTranslated(translated);
        newWordManage.setNote(note);
        newWordManageRepository.save(newWordManage);
    }

    public Page<NewWordManage> list(String word,String root, Integer pageNum, Integer pageSize){
        return newWordManageRepository.findAll(this.getWhereClause(word,root),new PageRequest(pageNum -1 ,pageSize));
    }

    public NewWordManage get(Long id){
        // 从sentence中查找家最
        NewWordManage word = newWordManageRepository.findOne(id);
        NewWordManage newWord = new NewWordManage();
        String sentenceIds = word.getExample();  //为了兼容老版本，有可能为String, 不是'1,2,4'格式
        ArrayList arr = new ArrayList();
        List<String> list = Arrays.asList(sentenceIds.split(","));
        for (int i = 0; i < list.size(); i++) {
            String sentenceId = list.get(i);
            SentenceManage sentence = sentenceManageRepository.findOne(new Long(sentenceId));
            arr.add(sentence);
        }
        word.setExample(JSON.toJSONString(arr));  //是会影响
        return word;
    }

    public void del(Long id){
        if (newWordManageRepository.findOne(id) == null) {
            throw new MyException(ErrorCode.NOT_HAVE);
        }
        newWordManageRepository.delete(id);
    }

    private Specification<NewWordManage> getWhereClause(String word, String rt) {
        return (root, query, cb) -> {
            List<Predicate> predicate = new ArrayList<>();
            if (!StringUtils.isEmpty(word)) {
                predicate.add(cb.like(root.get("word").as(String.class), "%"+word+"%"));
            }
            if (!StringUtils.isEmpty(rt)) {
                predicate.add(cb.like(root.get("root").as(String.class), "%"+rt+"%"));
            }
            Predicate[] pre = new Predicate[predicate.size()];
            return query.where(predicate.toArray(pre)).getRestriction();
        };
    }

    public void update(HttpServletRequest id){

    }

}
