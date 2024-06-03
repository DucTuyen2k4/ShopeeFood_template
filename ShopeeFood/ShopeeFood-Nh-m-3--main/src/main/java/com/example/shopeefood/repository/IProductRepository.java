package com.example.shopeefood.repository;

import com.example.shopeefood.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProductRepository extends JpaRepository<Product,Long> {

    @Query("SELECT p FROM Product p JOIN p.menus m WHERE m.id = :menuId AND p.name LIKE %:productName%")
    List<Product> findFoodByMenuIdAndName(@Param("menuId") Long menuId, @Param("productName") String productName);

    @Query("SELECT f FROM Product f JOIN f.menus m WHERE m.id = :menuId")
    List<Product> findFoodByMenuId(@Param("menuId") Long menuId);


    Page<Product> findAllByNameContaining(Pageable pageable, String name);
}
