package com.example.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.repository.ExpressionRepository;

@Service
public class ExpressionService {
	
	@Autowired
	private ExpressionRepository expressionRepository;
	
	ExpressionService(ExpressionRepository expressionRepository) {
		this.expressionRepository = expressionRepository;
	}
}
