package com.poster.dao.repository;

import com.poster.entity.RootWordManage;
import com.poster.entity.SentenceManage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface RootWordManageRepository extends JpaRepository<RootWordManage, Long>, JpaSpecificationExecutor<RootWordManage> {
    RootWordManage findByRoot(String root);
}
