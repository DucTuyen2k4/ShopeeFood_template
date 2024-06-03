package com.example.shopeefood.repository;

import com.example.shopeefood.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IOrderItemRepository extends JpaRepository<OrderItem,Long> {
    Iterable<OrderItem> findAllByShopAndCart(Shop shop, User user);
    OrderItem findOrderItemByProduct(Product product);
    List<OrderItem> findByOrderId(long orderId);

}
