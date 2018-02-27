package com.poster.dao.repository;
import com.poster.entity.RelevanceAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

/**
 * Created by zhaobin on 2018/1/16.
 */
public interface RelevanceAccountRepository extends JpaRepository<RelevanceAccount, Long>, JpaSpecificationExecutor<RelevanceAccount> {
    RelevanceAccount findByUserIdAndAccountId(Long userId, Integer accountId);
}