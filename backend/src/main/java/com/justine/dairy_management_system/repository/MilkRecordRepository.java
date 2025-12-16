package com.justine.dairy_management_system.repository;

import com.justine.dairy_management_system.model.MilkRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MilkRecordRepository extends JpaRepository<MilkRecord, Long> {

    List<MilkRecord> findByCowId(Long cowId);

    @Query("""
        SELECT m FROM MilkRecord m
        WHERE m.date BETWEEN :start AND :end
    """)
    List<MilkRecord> findBetweenDates(LocalDateTime start, LocalDateTime end);
}
