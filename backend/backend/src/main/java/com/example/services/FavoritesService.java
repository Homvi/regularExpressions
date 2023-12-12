package com.example.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.entities.Expression;
import com.example.entities.Favorite;
import com.example.repository.ExpressionRepository;
import com.example.repository.FavoritesRepository;

@Service
public class FavoritesService {
	@Autowired
	private FavoritesRepository favoritesRepository;
	@Autowired
	private ExpressionRepository expressionRepository;
	
	FavoritesService(FavoritesRepository favoritesRepository) {
		this.favoritesRepository = favoritesRepository;
	}
	
	public void addFavorite(Expression expression) {
		Favorite favorite = new Favorite();
		favorite.setUserId(expression.getCreatorId());
		favorite.setExpressionId(expression.getId());
		favoritesRepository.save(favorite);
	}
	
	public ResponseEntity<?> getFavorites(Long userId) {
		List<Favorite> favoriteExpressionsId = favoritesRepository.findAll().stream()
	            .filter(expression -> userId.equals(expression.getId()))
	            .collect(Collectors.toList());
		List<Long> expressionIds = favoriteExpressionsId.stream()
		        .map(Favorite::getExpressionId)
		        .collect(Collectors.toList());

		List<Expression> userExpressions = expressionRepository.findAll()
		        .stream()
		        .filter(expression -> expressionIds.contains(expression.getId()))
		        .collect(Collectors.toList());
		
		return ResponseEntity.ok(userExpressions);
	}
}
