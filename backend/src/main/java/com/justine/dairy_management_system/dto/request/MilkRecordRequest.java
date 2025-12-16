package com.justine.dairy_management_system.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Schema(description = "Request payload for recording daily milk production")
public class MilkRecordRequest {

    @Schema(description = "ID of the cow producing the milk", example = "1", required = true)
    @NotNull(message = "Cow ID is required")
    private Long cowId;

    @Schema(
            description = "Date and time when milk was recorded",
            example = "2025-01-15T06:30:00",
            required = true
    )
    @NotNull(message = "Date is required")
    private LocalDateTime date;

    @Schema(description = "Amount of milk produced in liters", example = "12.5", minimum = "1")
    @Min(value = 1, message = "Milk amount must be greater than zero")
    private double amount;
}
