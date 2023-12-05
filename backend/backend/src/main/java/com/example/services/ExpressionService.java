package com.example.services;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

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
	
	public List<Expression> getExpressions(String language) {
	    List<Expression> expressions = expressionRepository.findAll().stream()
	            .filter(expression -> language.equals(expression.getLanguageOfExpression()))
	            .collect(Collectors.toList());
	    Collections.shuffle(expressions);
	    return expressions.stream().limit(10).collect(Collectors.toList());
	}
}
