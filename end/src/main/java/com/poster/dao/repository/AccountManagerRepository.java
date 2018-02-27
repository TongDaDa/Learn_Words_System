package com.poster.dao.repository;

import com.poster.entity.AccountManage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

/**
 * Created by zhaobin on 2018/1/16.
 */
public interface AccountManagerRepository extends JpaRepository<AccountManage, Long>, JpaSpecificationExecutor<AccountManage> {
    List<AccountManage> findByPhone(String phone);
    List<AccountManage> findByAccountType(Integer accountType);
    List<AccountManage> findByIdAndNameAndPhone(Long id, String accountName, String phone);
}