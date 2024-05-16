package com.example.shopeefood.repository;

import com.example.shopeefood.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICategoryRepository extends JpaRepository<Category, Long> {

}

