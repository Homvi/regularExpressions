package com.example.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.entities.Expression;
import com.example.entities.User;
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
	
	@PostMapping("/myExpressions")
    public ResponseEntity<?> addExpression(@RequestBody Expression expression) {
        try {
            expressionService.addExpression(expression);
            return new ResponseEntity<>("Expresión agregada exitosamente", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al agregar la expresión", HttpStatus.INTERNAL_SERVER_ERROR);
        }
	}
}
