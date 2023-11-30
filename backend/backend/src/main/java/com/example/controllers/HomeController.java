package com.example.controllers;

import java.util.List;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.pojos.User;

@Controller
@CrossOrigin(origins = "http://localhost:5173")
public class HomeController {
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@ResponseBody
	@RequestMapping(value = "/users")
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
	
	@ResponseBody
	@RequestMapping(value = "/register")
	public void AddUser(User user) {
		String query = "INSERT INTO DB_REGEXPRESSIONS.users (firstName, surname, username, email, password, isAdmin) VALUES"
				+ "'" + user.getFirstName() + "', '" + user.getSurname() + "', '" + user.getEmail() + "', '" + user.getPassword() + "', " +user.isAdmin() + "')";
		String hashedPassword = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt(20));
		jdbcTemplate.update(query, user.getFirstName());
	}
}
