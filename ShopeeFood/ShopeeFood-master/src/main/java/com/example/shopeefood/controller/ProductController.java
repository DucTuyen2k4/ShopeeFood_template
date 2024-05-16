package com.example.shopeefood.controller;

import com.example.shopeefood.model.Menu;
import com.example.shopeefood.model.Product;
import com.example.shopeefood.model.ProductFile;

import com.example.shopeefood.repository.IProductRepository;
import com.example.shopeefood.service.menu.IMenuService;
import com.example.shopeefood.service.product.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;

import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Value("/home/titdzvl/ShopeeFood/ShopeeFood-master/src/main/resources/static/img/")

    private String fileUpload;
    @Autowired
    private IProductService iProductService;
    @Autowired
    private IMenuService iMenuService;

    @Autowired
    private IProductRepository productRepository;
    @GetMapping("/ProductListByMenuId/{id}")
    public ResponseEntity<List<Product>> getListProduct(@PathVariable Long id) {
        List<Product> list=productRepository.findFoodByMenuId(id);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    @GetMapping("/FindByPByName/{id}")
    public ResponseEntity<List<Product>> findByPName(@PathVariable Long id,@RequestParam("productName") String productName) {
        List<Product>list=productRepository.findFoodByMenuIdAndName(id, productName);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<Product> saveProduct(@ModelAttribute ProductFile productFile) {
        try {

        MultipartFile multipartFile = productFile.getImage();
        String fileName = multipartFile.getOriginalFilename();
        FileCopyUtils.copy(productFile.getImage().getBytes(), new File(fileUpload + fileName));

        LocalDateTime localDateTime = LocalDateTime.now();

        Product product = new Product(
                productFile.getId(),
                productFile.getName(),
                productFile.getPrice(),
                productFile.getQuantity(),
                fileName,
                productFile.getDetail(),
                productFile.getMenus(),
                localDateTime,
                localDateTime);
        Optional<Menu> menu = iMenuService.findById(product.getMenus().stream().count());
            product = iProductService.save(product);
            Set<Menu> menuSet = new HashSet<>();
//            menuSet.add(menu.get());
            product.setMenus(menuSet);
        return new ResponseEntity<>(product, HttpStatus.CREATED);
        } catch (Exception ex) {
            ex.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.CREATED) ;

        }

    }

}


