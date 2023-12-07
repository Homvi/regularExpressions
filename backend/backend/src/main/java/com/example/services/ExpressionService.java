package com.example.services;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.entities.Expression;
import com.example.entities.User;
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

	public ResponseEntity<?> validateExpression(Long id) {
		Optional<Expression> optionalExpression = expressionRepository.findById(id);
		if(optionalExpression.isPresent()) {
			Expression expression = optionalExpression.get();
			expression.setValidated((long) 1);
			expressionRepository.save(expression);
			return ResponseEntity.status(HttpStatus.ACCEPTED).body("Request validated");
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("There has been an error");
		}
	}
	
	public ResponseEntity<?> deleteExpression(Long id) {
		expressionRepository.deleteById(id);
		return ResponseEntity.status(HttpStatus.OK).body("Request deleted");
	}

	public void addExpression(Expression expression) {
        expressionRepository.save(expression);
    }
}
