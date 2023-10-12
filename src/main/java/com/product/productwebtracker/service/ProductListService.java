package com.product.productwebtracker.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.product.productwebtracker.exception.ProductListNotFoundException;
import com.product.productwebtracker.model.ProductList;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductListService {
    List<ProductList> products = new ArrayList<>();

    public void save() throws FileNotFoundException {
        ObjectMapper mapper = new ObjectMapper();
        InputStream inputStream = new FileInputStream(new File("src/test/java/resources/productlists.json"));
        TypeReference<List<ProductList>> typeReference = new TypeReference<List<ProductList>>() {};

        try {
            List<ProductList> productLists = mapper.readValue(inputStream, typeReference);
            products.addAll(productLists);

        } catch(IOException e) {
            throw new RuntimeException(e);
        }

}


    public List<ProductList> findAll(){
        if(products.isEmpty()){
            try {
                save();
            } catch (FileNotFoundException e) {
                throw new ProductListNotFoundException("Unable to generate the list of products");
            }
        }
        return products;
    }

    public List<ProductList> findByScrumMaster(String scrumMasterName){
        List<ProductList> scrumMasters =  products.stream()
                .filter(product -> product.scrumMasterName().equals(scrumMasterName))
                .collect(Collectors.toList());

        if(scrumMasters.isEmpty())
            throw new ProductListNotFoundException("Scrum Master not found");

        return scrumMasters;

    }

    //for list of string

    public List<ProductList> findByDeveloper(String developer){
        List<ProductList> developers = products.stream()
                .filter(product -> product.Developers().containsAll(Collections.singleton(developer)))
                .collect(Collectors.toList());

        if(developers.isEmpty())
            throw new ProductListNotFoundException("Developer not found");
        return developers;
    }

    public List<ProductList> searchProduct(String value){
        List<ProductList> developers = Collections.singletonList(products.stream()
                .filter(product -> product.Developers().containsAll(Collections.singleton(value)) || product.scrumMasterName().contains(value))
                .findFirst()
                .orElse(null));
        return developers;
    }


    public  ProductList create(ProductList newProduct){
        products.add(newProduct);
        return newProduct;
    }

    public void update(ProductList product, String id){
        ProductList existing = products.stream().filter(p -> p.id().equals(id))
                .findFirst()
                .orElseThrow(() -> new ProductListNotFoundException("Product is not Found"));
        int i = products.indexOf(existing);
        products.set(i, product);
    }

    public void delete(String id){
        products.removeIf(product -> product.productId().equals(id));
    }


    }
