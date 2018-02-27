package com.poster.dao.repository;
import java.util.List;
import com.poster.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface AccountRepository extends JpaRepository<Account, Long>, JpaSpecificationExecutor<Account> {
    List<Account> findByAccountName(String accountName);
}
