package com.justine.dairy_management_system.repository;

import com.justine.dairy_management_system.model.MilkSales;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MilkSalesRepository extends JpaRepository<MilkSales, Long> {
}
