package com.example.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.entities.Expression;
import com.example.services.ExpressionService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ExpressionController {
	private ExpressionService expressionService;
	
	ExpressionController(ExpressionService expressionService) {
		this.expressionService = expressionService;
	}
	
	@GetMapping("/getSpanishExpressions")
	public List<Expression> getSpanishExpressions() {
		return expressionService.getExpressions("spanish");
	}
	
	@GetMapping("/getEnglishExpressions")
	public List<Expression> getEnglishExpressions() {
		return expressionService.getExpressions("english");
	}
}
