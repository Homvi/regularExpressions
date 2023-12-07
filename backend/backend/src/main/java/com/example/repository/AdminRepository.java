package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.entities.Admin_hash;

public interface AdminRepository extends JpaRepository<Admin_hash, Long> {}
