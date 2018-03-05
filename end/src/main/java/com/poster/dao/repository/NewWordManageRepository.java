package com.poster.dao.repository;
import com.poster.entity.NewWordManage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface NewWordManageRepository extends JpaRepository<NewWordManage, Long>, JpaSpecificationExecutor<NewWordManage> {
    Page<NewWordManage> findByWord(String word,Pageable pageable);
    Page<NewWordManage> findByRoot(String name,Pageable pageable);
    Page<NewWordManage> findByWordAndRoot (String word, String root,Pageable pageable);

    List<NewWordManage> findByWord(String word);
}
