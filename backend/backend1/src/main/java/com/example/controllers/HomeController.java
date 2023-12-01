package com.example.controllers;

import java.util.List;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.pojos.Expression;
import com.example.pojos.User;

@Controller
@CrossOrigin(origins = "http://localhost:5173")
public class HomeController {
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	public List<User> GetUsers() {
		String query = "SELECT * FROM DB_REGEXPRESSIONS.users;";
		List<User> users = jdbcTemplate.query(query, (resultSet, rowNum) -> {
			User user = new User();
			user.setUserId(resultSet.getLong("userId"));
			user.setFirstName(resultSet.getString("firstName"));
			user.setSurname(resultSet.getString("surname"));
			user.setUsername(resultSet.getString("username"));
			user.setEmail(resultSet.getString("email"));
			user.setPassword(resultSet.getString("password"));
			user.setAdmin(resultSet.getLong("isAdmin"));
			return user;
		});
		
		return users;
	}
	
	public List<Expression> GetExpressions() {
		String query = "SELECT * FROM DB_REGEXPRESSIONS.expressions;";
		List<Expression> expressions = jdbcTemplate.query(query, (resultSet, rowNum) -> {
			Expression expression = new Expression();
			expression.setExpressionId(resultSet.getLong("expressionId"));
			expression.setLanguage(resultSet.getString("languageOfExpression"));
			expression.setExpression(resultSet.getString("expression"));
			expression.setRightAnswer(resultSet.getString("rightAnswer"));
			expression.setWrongAnswerOne(resultSet.getString("falseAnswerOne"));
			expression.setWrongAnswerTwo(resultSet.getString("falseAnswerTwo"));
			expression.setCreatorId(resultSet.getLong("creatorId"));
			expression.setValidated(resultSet.getBoolean("validated"));
			return expression;
		});
		
		return expressions;
	}
	
	@ResponseBody
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public ResponseEntity<Object> AddUser(@RequestBody User user) {
		//Checks if the username already exists in the database
		List<User> users = GetUsers();
		users.forEach(userElement -> {
			System.out.println(userElement.toString());
		});
		for(int i = 0; i < users.size(); i++) {
			//If the user already exists, it should return an error
			if (users.get(i).getUsername().equals(user.getUsername())) {
				return ResponseEntity.noContent().build();
			}
		}
		
		//If it doesn't exist, it gets added to the database and returns the user
		String query = "INSERT INTO DB_REGEXPRESSIONS.users (firstName, surname, username, email, password, isAdmin) VALUES (?, ?, ?, ?, ?, ?)";
		String hashedPassword = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt(20));
		jdbcTemplate.update(query, user.getFirstName(), user.getSurname(), user.getUsername(), user.getEmail(), hashedPassword, 0);
		return ResponseEntity.ok(user);
	}
	
	public static boolean CheckPassword(String password, String hashedPassword) {
		return BCrypt.checkpw(password, hashedPassword);
	}
	
	@ResponseBody
	@RequestMapping(value = "/requestExpression")
	public String AddExpression(Expression expression) {
		List<Expression> expressions = GetExpressions();
		for(int i = 0; i < expressions.size(); i++) {
			if (expressions.get(i).getExpression().equals(expression)) {
				return "This expression already exists";
			}
		}
		
		String query = "INSERT INTO DB_REGEXPRESSIONS.expressions (languageOfExpression, expression, rightAnswer, falseAnswerOne, falseAnswerTwo, creatorId, validated) VALUES (?, ?, ?, ?, ?, ?, ?);";
		jdbcTemplate.update(query, expression.getLanguage(), expression.getExpression(), expression.getRightAnswer(), expression.getWrongAnswerOne(), expression.getWrongAnswerTwo(), expression.getCreatorId(), false);
		return "Expression sent";
	}
	
	@ResponseBody
	@RequestMapping(value = "/login")
	public User Login(String username, String password) {
		List<User> users = GetUsers();
		//Checks if the introduced username is in the database
		for(int i = 0; i < users.size(); i++) {
			if (users.get(i).getUsername().equals(username)) {
				//If it's true, checks if the password is correct and returns the user
				if (CheckPassword(password, users.get(i).getPassword())) {
					return users.get(i);
				}
			}
		}
		
		//If the username doesn't exist or the password is incorrect, returns nothing
		return null;
	}
	
}
