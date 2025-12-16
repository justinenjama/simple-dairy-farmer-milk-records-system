package com.justine.dairy_management_system.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MilkSales {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double amountSold;
    private double totalPrice;
    private LocalDateTime saleDate;
    private String buyerName;

    @ManyToOne
    @JoinColumn(name = "milk_record_id", nullable = false)
    private MilkRecord milkRecord;
}
