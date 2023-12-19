package com.example.services;

import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.entities.Admin_hash;
import com.example.entities.Expression;
import com.example.repository.AdminRepository;
import com.example.repository.ExpressionRepository;

@Service
public class ExpressionService {
	@Autowired
	private ExpressionRepository expressionRepository;
	@Autowired
	private static AdminRepository adminRepository;

	ExpressionService(ExpressionRepository expressionRepository, AdminRepository adminRepository) {
		this.expressionRepository = expressionRepository;
		this.adminRepository = adminRepository;
	}
	
	public List<Expression> getValidatedExpressions(String language) {
	    List<Expression> expressions = expressionRepository.findAll().stream()
	            .filter(expression -> language.equals(expression.getLanguageOfExpression()) && expression.getValidated() == 1L)
	            .collect(Collectors.toList());
	    Collections.shuffle(expressions);
	    return expressions.stream().limit(10).collect(Collectors.toList());
	}


	public ResponseEntity<?> validateExpression(Expression expression) {
		Optional<Expression> optionalExpression = expressionRepository.findById(expression.getId());
		if(optionalExpression.isPresent()) {
			Expression currentExpression = optionalExpression.get();
			currentExpression.setValidated((long) 1);
			expressionRepository.save(currentExpression);
			return ResponseEntity.status(HttpStatus.ACCEPTED).body("Request validated");
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("There has been an error");
		}
	}
	
	public ResponseEntity<?> deleteExpression(Expression expression) {
		expressionRepository.deleteById(expression.getId());
		return ResponseEntity.status(HttpStatus.OK).body("Request deleted");
	}

	public void addExpression(Expression expression) {
		expression.setValidated((long) 0);
        expressionRepository.save(expression);
    }
	
	public ResponseEntity<?> getInvalidatedExpressions(Admin_hash admin_hash) {
	    Admin_hash matchingHash = getByHash(admin_hash);
	    if (matchingHash != null) {
	        Instant now = Instant.now();
	        Long now_seconds = now.getEpochSecond();
	        if (matchingHash.getExpiration() >= now_seconds) {
	            List<Expression> expressions = expressionRepository.findAll().stream()
	                    .filter(expression -> {
	                        Long validated = expression.getValidated();
	                        return validated != null && validated.equals(0L);
	                    })
	                    .collect(Collectors.toList());
	            return ResponseEntity.ok(expressions);
	        } else {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Expiration date already out");
	        }

	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Hash not found");
	    }
	}

	
	public static Admin_hash getByHash(Admin_hash admin_hash) {
		Optional<Admin_hash> matchingHash = adminRepository.findAll().stream()
	            .filter(admin -> admin.getHash().equals(admin_hash.getHash()))
	            .findFirst();
		return matchingHash.orElse(null);
	}
}
