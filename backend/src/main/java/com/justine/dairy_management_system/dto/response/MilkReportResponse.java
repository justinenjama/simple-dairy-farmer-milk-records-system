package com.justine.dairy_management_system.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(description = "Aggregated milk production report per cow")
public class MilkReportResponse {

    @Schema(description = "ID of the cow", example = "1")
    private Long cowId;

    @Schema(description = "Name of the cow", example = "Bella")
    private String cowName;

    @Schema(description = "Total milk produced in the selected period (liters)", example = "85.0")
    private double totalMilk;
}
