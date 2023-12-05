package com.example.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.example.services.ExpressionService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ExpressionController {
	private ExpressionService expressionService;
	
	ExpressionController(ExpressionService expressionService) {
		this.expressionService = expressionService;
	}
}
