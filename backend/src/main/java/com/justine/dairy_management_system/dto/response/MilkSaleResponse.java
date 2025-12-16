package com.justine.dairy_management_system.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Response payload representing a milk sale transaction")
public class MilkSaleResponse {

    @Schema(description = "Unique ID of the milk sale", example = "3")
    private Long id;

    @Schema(description = "Amount of milk sold in liters", example = "20")
    private double amountSold;

    @Schema(description = "Total price of the milk sold", example = "1200")
    private double totalPrice;

    @Schema(
            description = "Date and time when the milk sale occurred",
            example = "2025-01-15T10:00:00"
    )
    private LocalDateTime saleDate;

    @Schema(description = "Name of the milk buyer", example = "Kisii Milk Cooperative")
    private String buyerName;
}
