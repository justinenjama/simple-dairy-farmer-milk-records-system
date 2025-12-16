package com.justine.dairy_management_system.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Response payload representing a cow")
public class CowResponse {

    @Schema(description = "Unique identifier of the cow", example = "1")
    private Long id;

    @Schema(description = "Name of the cow", example = "Bella")
    private String name;

    @Schema(description = "Breed of the cow", example = "Friesian")
    private String breed;

    @Schema(description = "Age of the cow in years", example = "3")
    private int age;
}
