package com.poster.service;

import com.poster.controller.RootWordManageController;
import com.poster.dao.repository.RootWordManageRepository;
import com.poster.entity.NewWordManage;
import com.poster.entity.RootWordManage;
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
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class RootWordManageService {
    @Autowired
    RootWordManageRepository rootWordManageRepository;

    public void save(Long id, String root, String note) {
        RootWordManage rootWordManage = new RootWordManage();
        if (ObjectUtils.isEmpty(id)) {
            rootWordManage.setId(id);
            if (rootWordManageRepository.findByRoot(root) != null) {
                throw new MyException(ErrorCode.ALREDAY_HAVE);
            }
        } else if (rootWordManageRepository.findByRoot(root) == null) {
            throw new MyException(ErrorCode.NOT_HAVE);
        }
        rootWordManage.setNote(note);
        rootWordManage.setRoot(root);
        rootWordManageRepository.save(rootWordManage);
    }

    public Page<RootWordManage> list(String root, String note, Integer pageSize, Integer pageNum) {
        return rootWordManageRepository.findAll(this.getWhereClause(root, note), new PageRequest(pageNum-1,pageSize));
    }

    private Specification<RootWordManage> getWhereClause(String rt, String note) {
        return (root, query, cb) -> {
            List<Predicate> predicate = new ArrayList<>();
            if (!StringUtils.isEmpty(rt)) {
                predicate.add(cb.like(root.get("root").as(String.class), "%"+rt+"%"));
            }
            if (!StringUtils.isEmpty(note)) {
                predicate.add(cb.like(root.get("note").as(String.class), "%"+note+"%"));
            }
            Predicate[] pre = new Predicate[predicate.size()];
            return query.where(predicate.toArray(pre)).getRestriction();
        };
    }
}
