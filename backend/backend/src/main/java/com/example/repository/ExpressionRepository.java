package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.entities.Expression;

public interface ExpressionRepository extends JpaRepository<Expression, Long> {}
