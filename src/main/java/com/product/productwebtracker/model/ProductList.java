package com.product.productwebtracker.model;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record ProductList(
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        String id,
        @NotEmpty(message ="productId is required")
        String productId,
        @NotEmpty(message ="ID is required")
        String productName,
        @NotEmpty(message ="ID is required")
        String productOwnerName,
        @NotEmpty(message ="ID is required")
        @Embedded
        List<Developer> Developers,
        @NotEmpty(message ="ID is required")
        String scrumMasterName,
        @NotEmpty(message ="ID is required")
        @JsonFormat(pattern = "yyyy-MM-dd", shape = JsonFormat.Shape.STRING)
        String startDate,
        @NotEmpty(message ="ID is required")
        String methodology,

        @NotEmpty(message ="ID is required")
        String location
){

}
