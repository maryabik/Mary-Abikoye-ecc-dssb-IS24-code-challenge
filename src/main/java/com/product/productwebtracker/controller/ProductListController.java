package com.product.productwebtracker.controller;

import com.product.productwebtracker.model.ProductList;
import com.product.productwebtracker.service.ProductListService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:8080")
public class ProductListController {

    private final ProductListService productListService;

    public ProductListController(ProductListService productListService) {
        this.productListService =  productListService;
    }


    @GetMapping
    public List<ProductList> findall(){
        return productListService.findAll();
    }

    @PostMapping("/{scrumMaster}")
    public List<ProductList> findByScrumMaster(@PathVariable String scrumMaster){
        return productListService.findByScrumMaster(scrumMaster);
    }

    @PostMapping("/{value}")
    public List<ProductList> searchList(@PathVariable String value){
        return  productListService.searchProduct(value);
    }


    @PostMapping
    public ProductList create(@Valid @RequestBody ProductList product){
        return productListService.create(product);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/{id}")
    public  void update(@RequestBody ProductList product, @PathVariable String id){
        productListService.update(product,id);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public  void delete(@PathVariable String id){
        productListService.delete(id);
    }
}
