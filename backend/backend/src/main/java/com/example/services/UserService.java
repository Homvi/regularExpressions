package com.example.services;

import java.util.List;
import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.entities.User;
import com.example.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;
	
	UserService(UserRepository userRepository){
		this.userRepository = userRepository;
	}
	
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}
	
	public User saveUser(User user) {
		return userRepository.save(user);
	}
	
	public ResponseEntity<?> checkIfExistsUser(User user) {
		List<User> userList = userRepository.findAll();
		Optional<User> emailUserExists = userList.stream().filter(userRepositoryItem -> userRepositoryItem.getEmail().equals(user.getEmail())).findFirst();
		Optional<User> usernameExists = userList.stream().filter(userRepositoryItem -> userRepositoryItem.getUsername().equals(user.getUsername())).findFirst();
		if(emailUserExists.isEmpty() && usernameExists.isEmpty()){
			// Hasheo del password
			String hashedPassword = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt(10));
			user.setPassword(hashedPassword);
			user.setIsAdmin((long) 0);
			User savedUser = saveUser(user);
			userRepository.save(user);
			return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
		}
		else if(emailUserExists.isPresent() && usernameExists.isPresent()){
			//Existen los dos
			return ResponseEntity.status(HttpStatus.CONFLICT)
					.body("The username " + user.getUsername() + " & the email " + user.getEmail() + "is already picked.");
		} else if(emailUserExists.isPresent()) {
			//Existen el email
			return ResponseEntity.status(HttpStatus.CONFLICT)
					.body("The email " + user.getEmail() + " is already picked.");
		} else if(usernameExists.isPresent()){
			return ResponseEntity.status(HttpStatus.CONFLICT)
					.body("The username " + user.getUsername() + " is already picked.");
		}
		return ResponseEntity.badRequest().build();
	}
}
