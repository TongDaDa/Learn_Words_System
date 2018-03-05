package com.poster.dao.repository;

import com.poster.entity.NewWordManage;
import com.poster.entity.SentenceManage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface SentenceManageRepository extends JpaRepository<SentenceManage, Long>, JpaSpecificationExecutor<SentenceManage> {
    SentenceManage findByEnglishWord(String root);
    List<SentenceManage> findByType(Byte type);
}
