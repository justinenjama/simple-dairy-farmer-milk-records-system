package com.justine.dairy_management_system.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Schema(description = "Request payload for recording milk sales")
public class MilkSaleRequest {

    @Schema(description = "Milk record ID related to this sale", example = "10", required = true)
    @NotNull(message = "Milk record ID is required")
    private Long milkRecordId;

    @Schema(description = "Amount of milk sold in liters", example = "20", minimum = "1")
    @Min(value = 1, message = "Amount sold must be greater than zero")
    private double amountSold;

    @Schema(description = "Total price of the milk sold", example = "1200", minimum = "1")
    @Min(value = 1, message = "Total price must be greater than zero")
    private double totalPrice;

    @Schema(
            description = "Date and time of the sale",
            example = "2025-01-15T10:00:00",
            required = true
    )
    @NotNull(message = "Sale date is required")
    private LocalDateTime saleDate;

    @Schema(description = "Name of the buyer", example = "Kisii Milk Cooperative", required = true)
    @NotBlank(message = "Buyer name is required")
    private String buyerName;
}
