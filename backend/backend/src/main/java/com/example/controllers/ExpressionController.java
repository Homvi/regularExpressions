package com.example.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	@PatchMapping("/validateExpression")
	public ResponseEntity<?> validateExpression(@RequestBody Long id) {
		return expressionService.validateExpression(id);
	}
	
	@DeleteMapping("/deleteExpression")
	public ResponseEntity<?> deleteExpression(@RequestBody Long id) {
		return expressionService.deleteExpression(id);
	}
}
