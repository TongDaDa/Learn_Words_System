package com.poster.service;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.poster.dao.repository.NewWordManageRepository;
import com.poster.dao.repository.SentenceManageRepository;
import com.poster.entity.NewWordManage;
import com.poster.entity.SentenceManage;
import com.poster.utils.ErrorCode;
import com.poster.utils.MyException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import javax.persistence.criteria.Predicate;
import java.util.*;

@Service
@Transactional
public class NewWordManageService {
    @Autowired
    NewWordManageRepository newWordManageRepository;
    @Autowired
    SentenceManageRepository sentenceManageRepository;

    public void save(Long id,String word,String root,String example,String note){
        NewWordManage newWordManage;
        if (word == null) {
            throw new MyException(ErrorCode.PARAM_ERROR);
        }
        if (ObjectUtils.isEmpty(id)) {
            newWordManage = new NewWordManage();
            if (!ObjectUtils.isEmpty(newWordManageRepository.findByWord(word))) {
                throw new MyException(ErrorCode.ALREDAY_HAVE);
            }
        } else {
            newWordManage = newWordManageRepository.findOne(id);
        }

        //保存例子到SentenceManage
        JSONArray exampleList = JSONArray.parseArray(example);
        Byte type = 1;
        for (int i = 0; i < exampleList.size(); i++) {
            JSONObject jsonObject = exampleList.getJSONObject(i);
            String englishWord = jsonObject.getString("englishWord");
            String translated = jsonObject.getString("translated");
            SentenceManage sentenceManage = new SentenceManage();
            sentenceManage.setEnglishWord(englishWord);
            sentenceManage.setTranslatedWord(translated);
            sentenceManage.setType(type);
            sentenceManageRepository.save(sentenceManage);
        }
        newWordManage.setCreateTime(new Date());
        newWordManage.setWord(word);
        newWordManage.setRoot(root);
        newWordManage.setNote(note);
        newWordManageRepository.save(newWordManage);
    }

    public Page<NewWordManage> list(String word,String root, Integer pageNum, Integer pageSize){
        return newWordManageRepository.findAll(this.getWhereClause(word,root),new PageRequest(pageNum -1 ,pageSize));
    }

    public NewWordManage get(Long id){
        return newWordManageRepository.findOne(id);
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
}
