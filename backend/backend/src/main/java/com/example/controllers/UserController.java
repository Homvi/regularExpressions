package com.example.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.entities.User;
import com.example.services.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
	private UserService userService;
	
	UserController(UserService userService){
		this.userService = userService;
	}
	
	public List<User> findAllUsers() {
		return userService.getAllUsers();
	}
	
	@PutMapping("/register")
	public User addUser(@RequestBody User user) {
		user.setIsAdmin((long) 0);
		return userService.saveUser(user);
	}
}
