package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.entities.Favorite;

public interface FavoritesRepository extends JpaRepository<Favorite, Long> {}
