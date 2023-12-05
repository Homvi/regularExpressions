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
		return userService.checkIfExistsUser(user);
	}
//		userService.
//		List<User> users = findAllUsers();
//		// Check if the username or the email is the same. If it's the case, it will
//		// return an error
//		for (int i = 0; i < users.size(); i++) {
//			if (users.get(i).getUsername().equals(user.getUsername())) {
//				
//			}
//
//			if (users.get(i).getEmail().equals(user.getEmail())) {
//				
//			}
//		}

		// Adds the user to the database and returns the data to the frontend
//		


	public static boolean CheckPassword(String password, String hashedPassword) {
		return BCrypt.checkpw(password, hashedPassword);
	}

	@PostMapping("/login")
	public ResponseEntity<?> Login(@RequestBody User user) {
		List<User> users = userService.getAllUsers();
		// First, checks if the user exists
		for (int i = 0; i < users.size(); i++) {
			if (users.get(i).getEmail().equals(user.getEmail())) {
				// If it exists, checks if the password is the same
				if (CheckPassword(user.getPassword(), users.get(i).getPassword())) {
					User loginUser = users.get(i);
					LoginResponse loginResponse = new LoginResponse(loginUser.getId(), loginUser.getFirstName(),
							loginUser.getSurname(), loginUser.getUsername());
					return ResponseEntity.status(HttpStatus.CREATED).body(loginResponse);
				}
			}
		}

		// If the user doesn't exist or the password is incorrect, it should return
		// a null, which would show an error message
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The username or the password are incorrect.");
	}
}
