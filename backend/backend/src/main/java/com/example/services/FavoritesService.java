package com.example.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entities.Expression;
import com.example.entities.Favorite;
import com.example.repository.FavoritesRepository;

@Service
public class FavoritesService {
	@Autowired
	private FavoritesRepository favoritesRepository;
	
	FavoritesService(FavoritesRepository favoritesRepository) {
		this.favoritesRepository = favoritesRepository;
	}
	
	public void addFavorite(Expression expression) {
		Favorite favorite = new Favorite();
		favorite.setUserId(expression.getCreatorId());
		favorite.setExpressionId(expression.getId());
		favoritesRepository.save(favorite);
	}
}
