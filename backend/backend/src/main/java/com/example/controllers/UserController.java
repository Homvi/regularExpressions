package com.example.controllers;

import java.util.List;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.DTO.LoginResponse;
import com.example.entities.User;
import com.example.services.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
	private UserService userService;

	UserController(UserService userService) {
		this.userService = userService;
	}

	public List<User> findAllUsers() {
		return userService.getAllUsers();
	}

	@PostMapping("/register")
	public ResponseEntity<?> addUser(@RequestBody User user) {
		return userService.userRegister(user);
	}

	@PostMapping("/login")
	public ResponseEntity<?> Login(@RequestBody User user) {
		return userService.userLogin(user);
	}
}
