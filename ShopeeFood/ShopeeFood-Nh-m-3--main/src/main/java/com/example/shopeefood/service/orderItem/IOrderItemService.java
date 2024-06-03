package com.example.shopeefood.service.orderItem;

import com.example.shopeefood.model.*;
import com.example.shopeefood.service.IGenerateService;

public interface IOrderItemService extends IGenerateService<OrderItem> {
    Iterable<OrderItem> findAllByShopAndCart(Shop shop, User user);
    OrderItem findOrderItemByProduct(Product product);
}
