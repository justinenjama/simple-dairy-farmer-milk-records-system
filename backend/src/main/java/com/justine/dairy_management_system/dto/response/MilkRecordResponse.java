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
@Schema(description = "Response payload representing a milk production record")
public class MilkRecordResponse {

    @Schema(description = "Unique ID of the milk record", example = "5")
    private Long id;

    @Schema(
            description = "Date and time when the milk was recorded",
            example = "2025-01-15T06:30:00"
    )
    private LocalDateTime date;

    @Schema(description = "Amount of milk produced in liters", example = "12.5")
    private double amount;

    @Schema(description = "ID of the cow that produced the milk", example = "1")
    private Long cowId;

    @Schema(description = "Name of the cow that produced the milk", example = "Bella")
    private String cowName;
}
