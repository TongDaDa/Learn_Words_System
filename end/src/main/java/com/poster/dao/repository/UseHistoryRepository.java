package com.poster.dao.repository;

import com.poster.entity.UseHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


import java.util.List;

public interface UseHistoryRepository extends JpaRepository<UseHistory, Long>, JpaSpecificationExecutor<UseHistory> {
    Page<UseHistory> findByUserIdAndAccountId(Long userId, Integer accountId, Pageable pageable);
}
