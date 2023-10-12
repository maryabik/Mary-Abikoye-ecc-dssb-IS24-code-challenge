package com.product.productwebtracker.exception;

public class ProductListNotFoundException extends RuntimeException {


    public ProductListNotFoundException(String message) {
        super(message);
    }

    public ProductListNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
