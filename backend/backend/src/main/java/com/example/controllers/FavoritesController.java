package com.example.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.entities.Expression;
import com.example.entities.User;
import com.example.services.FavoritesService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class FavoritesController {
	private FavoritesService favoritesService;
	
	FavoritesController(FavoritesService favoritesService) {
		this.favoritesService = favoritesService;
	}
	
	@PostMapping("/addFavorite")
	public ResponseEntity<?> addFavorite(@RequestBody Expression expression) {
		try {
			favoritesService.addFavorite(expression);
            return new ResponseEntity<>("Marked as favorite", HttpStatus.OK);
		} catch (Exception e) {
            return new ResponseEntity<>("There has been an error when marking as favorite", HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/getFavorites")
	public ResponseEntity<?> getFavorites(@RequestBody User loginUser) {
		try {
			return favoritesService.getFavorites(loginUser.getId());
		} catch (Exception e) {
            return new ResponseEntity<>("There has been an error getting the favorites", HttpStatus.NOT_FOUND);
		}
	}
}
