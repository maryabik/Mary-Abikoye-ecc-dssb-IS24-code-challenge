package com.product.productwebtracker.exception;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MissingPathVariableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class ProductListExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleHttpMediaTypeNotSupported(HttpMediaTypeNotSupportedException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        String message = ex.getMessage();
        List<String> details = new ArrayList<>();
        details.add("Media not supported");
        details.add(message);
        ProductListException productListException = new ProductListException(message, details, status, LocalDateTime.now() );

        return ResponseEntity.status(status).body(productListException);
    }

    @Override
    protected ResponseEntity<Object> handleMissingPathVariable(MissingPathVariableException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        String message = ex.getMessage();
        List<String> details = new ArrayList<>();
        details.add("Path Variable is missing");
        ProductListException productListException = new ProductListException(message, details, status, LocalDateTime.now() );

        return ResponseEntity.status(status).body(productListException);
    }

    @Override
    protected ResponseEntity<Object> handleHttpRequestMethodNotSupported(HttpRequestMethodNotSupportedException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        String message = ex.getMessage();
        List<String> details = new ArrayList<>();
        details.add("Request method not supported");
        ProductListException productListException = new ProductListException(message, details, status, LocalDateTime.now() );

        return ResponseEntity.status(status).body(productListException);
    }

    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        String message = ex.getMessage();
        List<String> details = new ArrayList<>();
        details.add("Request body is not readable");
        ProductListException productListException = new ProductListException(message, details, status, LocalDateTime.now() );

        return ResponseEntity.status(status).body(productListException);
    }

    @ExceptionHandler(ProductListNotFoundException.class)
    public  ResponseEntity<Object> handleProductListNotFoundException(ProductListNotFoundException ex){
        String message = ex.getMessage();
        List<String> details = new ArrayList<>();
        details.add("Product list not found");
        ProductListException productListException = new ProductListException(message, details, HttpStatus.NOT_FOUND, LocalDateTime.now() );

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(productListException);

    }

    @ExceptionHandler(Exception.class)
    public  ResponseEntity<Object> handleProductListNotFoundException(Exception ex){
        String message = ex.getMessage();
        List<String> details = new ArrayList<>();
        details.add("other exception");
        details.add(message);
        ProductListException productListException = new ProductListException(message, details, HttpStatus.BAD_REQUEST, LocalDateTime.now() );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(productListException);

    }


}
