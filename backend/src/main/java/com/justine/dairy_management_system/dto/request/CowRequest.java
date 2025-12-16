package com.justine.dairy_management_system.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Schema(description = "Request payload for creating a cow")
public class CowRequest {

    @Schema(description = "Name of the cow", example = "Bella", required = true)
    @NotBlank(message = "Cow name is required")
    private String name;

    @Schema(description = "Breed of the cow", example = "Friesian", required = true)
    @NotBlank(message = "Breed is required")
    private String breed;

    @Schema(description = "Age of the cow in years", example = "3", minimum = "1")
    @Min(value = 1, message = "Age must be greater than zero")
    private int age;
}
