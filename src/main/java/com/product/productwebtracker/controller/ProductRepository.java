package com.product.productwebtracker.controller;

import com.product.productwebtracker.model.ProductList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<ProductList, Long> {


}
