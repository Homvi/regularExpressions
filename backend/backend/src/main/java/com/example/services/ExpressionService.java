package com.example.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entities.Expression;
import com.example.repository.ExpressionRepository;

@Service
public class ExpressionService {

	@Autowired
	private ExpressionRepository expressionRepository;

	ExpressionService(ExpressionRepository expressionRepository) {
		this.expressionRepository = expressionRepository;
	}
	/*
	public List<Expression> getExpressions() {
		List<Expression> expressions = expressionRepository.findAll();
		
	}*/
}
