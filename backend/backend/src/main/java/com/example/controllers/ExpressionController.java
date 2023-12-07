package com.example.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
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
	
	//Sends 10 spanish expressions to the frontend
	@GetMapping("/getSpanishExpressions")
	public List<Expression> getSpanishExpressions() {
		return expressionService.getExpressions("spanish");
	}

	//Sends 10 english expressions to the frontend
	@GetMapping("/getEnglishExpressions")
	public List<Expression> getEnglishExpressions() {
		return expressionService.getExpressions("english");
	}
	
	//Validates the selected expression. Turns the validated
	//field into 1. This can be done in the /admin page
	@PatchMapping("/validateExpression")
	public ResponseEntity<?> validateExpression(@RequestBody Expression expression) {
		return expressionService.validateExpression(expression);
	}
	
	@DeleteMapping("/deleteExpression")
	public ResponseEntity<?> deleteExpression(@RequestBody Expression expression) {
		return expressionService.deleteExpression(expression); 
	}

	@PostMapping("/sendExpression")
    public ResponseEntity<?> addExpression(@RequestBody Expression expression) {
        try {
            expressionService.addExpression(expression);
            return new ResponseEntity<>("Expression added", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("There has been an error adding the expression", HttpStatus.INTERNAL_SERVER_ERROR);
        }
	}
	
	@GetMapping("/unvalidatedExpressions")
	public List<Expression> getInvalidatedExpressions() {
		return expressionService.getInvalidatedExpressions();
	}
}
