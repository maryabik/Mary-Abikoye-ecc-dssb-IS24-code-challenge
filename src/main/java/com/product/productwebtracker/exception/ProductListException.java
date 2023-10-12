package com.product.productwebtracker.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ProductListException {
    String message;
    List<String> details;
    HttpStatusCode httpStatusCode;
    LocalDateTime timestamp;

    public ProductListException(String message, List<String> details, HttpStatus  httpStatusCode, LocalDateTime timestamp) {
        this.message = message;
        this.details = details;
        this.httpStatusCode = httpStatusCode;
        this.timestamp = timestamp;
    }
}
