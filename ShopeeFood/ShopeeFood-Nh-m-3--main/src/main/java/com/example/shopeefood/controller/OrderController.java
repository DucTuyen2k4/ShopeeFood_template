package com.example.shopeefood.controller;

import com.example.shopeefood.model.*;
import com.example.shopeefood.repository.IDetailCartRepository;
import com.example.shopeefood.repository.IOrderItemRepository;
import com.example.shopeefood.repository.IOrderRepository;
import com.example.shopeefood.repository.IStatusRepository;
import com.example.shopeefood.service.detailcart.IDetailCartService;
import com.example.shopeefood.service.orderItem.IOrderItemService;
import com.example.shopeefood.service.shop.IShopService;
import com.example.shopeefood.service.user.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    @Autowired
    private IUserService iUserService;
    @Autowired
    private IShopService iShopService;
    @Autowired
    private IOrderItemService iOrderItemService;
    @Autowired
    private IOrderRepository iOrderRepository;
    @Autowired
    private IDetailCartService iDetailCartService;
    @Autowired
    private IStatusRepository iStatusRepository;
    @Autowired
    private IOrderItemRepository iOrderItemRepository;

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderItemsByOrderId(@PathVariable long orderId) {
        return  new ResponseEntity<>(iOrderRepository.findById(orderId).get(), HttpStatus.OK);

    }
    @PutMapping("/status/{idOrder}/{statusId}")
    public ResponseEntity<Order> setStatus(@PathVariable long idOrder, @PathVariable long statusId) {
        Optional<Order> optionalOrder = iOrderRepository.findById(idOrder);
        if (!optionalOrder.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Optional<Status> optionalStatus = iStatusRepository.findById(statusId);
        if (!optionalStatus.isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        Order order = optionalOrder.get();
        Status status = optionalStatus.get();
        order.setStatus(status);
        iOrderRepository.save(order);
        return ResponseEntity.ok(order);
    }

    @GetMapping("/orders/shop/{shopId}")
    public List<Order> getOrdersByShopId(@PathVariable long shopId) {
        return iOrderRepository.findByOrderItems_Shop_Id(shopId);
    }
    @GetMapping("/orders/user/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUserId(@PathVariable long userId) {
        return new ResponseEntity<>(iOrderRepository.findByUserId(userId),HttpStatus.OK);
    }
    @GetMapping("/status/{statusId}")
    public ResponseEntity<List<Order>> getOrdersByStatusId(@PathVariable long statusId) {
        return new ResponseEntity<>(iOrderRepository.findByStatusId(statusId),HttpStatus.OK);
    }

    @PostMapping("/{idUser}/{idShop}")
    public ResponseEntity<Order> createOrder(@PathVariable long idShop, @PathVariable long idUser) {

        Optional<User> userOptional = iUserService.findById(idUser);
        Optional<Shop> shopOptional = iShopService.findById(idShop);
        if (!userOptional.isPresent() || !shopOptional.isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        User user = userOptional.get();
        Shop shop = shopOptional.get();

        List<OrderItem> orderItems = (List<OrderItem>) iOrderItemService.findAllByShopAndCart(shop, user);
        if (orderItems.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        Order order = new Order();
        order.setStatus(iStatusRepository.findById(1L).get());
        order.setUser(user);
        for (OrderItem item : orderItems) {
            if(item.getOrder()==null){
                order.addOrderItem(item);
            }
        }
        Order savedOrder = iOrderRepository.save(order);
        for (OrderItem orderItem : orderItems){
            iDetailCartService.remove(orderItem.getId());
        }
        return new ResponseEntity<>(savedOrder, HttpStatus.CREATED);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Order> deleteOrder(@PathVariable long id) {
        Optional<Order> optionalOrder = iOrderRepository.findById(id);
        if (!optionalOrder.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        iOrderRepository.deleteById(id);
        return new ResponseEntity<>(optionalOrder.get(), HttpStatus.OK);
    }
    
    @DeleteMapping("/orderItem/{id}")
    public ResponseEntity<OrderItem> deleteOrderItem(@PathVariable long id) {
        Optional<OrderItem> optionalOrder = iOrderItemRepository.findById(id);
        if (!optionalOrder.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        iOrderItemRepository.deleteById(id);
        return new ResponseEntity<>(optionalOrder.get(), HttpStatus.OK);
    }
}