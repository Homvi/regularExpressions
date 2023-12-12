package com.example.services;

import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.DTO.LoginResponse;
import com.example.entities.Admin_hash;
import com.example.entities.User;
import com.example.repository.AdminRepository;
import com.example.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private AdminRepository adminRepository;
	
	UserService(UserRepository userRepository){
		this.userRepository = userRepository;
	}
	
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}
	
	public User saveUser(User user) {
		return userRepository.save(user);
	}
	
	public ResponseEntity<?> userRegister(User user) {
		//Comprobamos si el usuario existe
		List<User> userList = userRepository.findAll();
		Optional<User> emailUserExists = userList.stream().filter(userRepositoryItem -> userRepositoryItem.getEmail().equals(user.getEmail())).findFirst();
		Optional<User> usernameExists = userList.stream().filter(userRepositoryItem -> userRepositoryItem.getUsername().equals(user.getUsername())).findFirst();
		
		if(emailUserExists.isEmpty() && usernameExists.isEmpty()){
			//Hasheo del password
			String hashedPassword = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt(10));
			user.setPassword(hashedPassword);
			user.setIsAdmin((long) 0);
			
			userRepository.save(user);
			return ResponseEntity.status(HttpStatus.CREATED).body(user);
		}
		else if(emailUserExists.isPresent() && usernameExists.isPresent()){
			return ResponseEntity.status(HttpStatus.CONFLICT)
					.body("The username " + user.getUsername() + " & the email " + user.getEmail() + " is already picked.");
		} else if(emailUserExists.isPresent()) {
			return ResponseEntity.status(HttpStatus.CONFLICT)
					.body("The email " + user.getEmail() + " is already picked.");
		} else if(usernameExists.isPresent()){
			return ResponseEntity.status(HttpStatus.CONFLICT)
					.body("The username " + user.getUsername() + " is already picked.");
		}
		
		return ResponseEntity.badRequest().build();
	}
	
	public ResponseEntity<?> userLogin(User user) {
		List<User> userList = userRepository.findAll();
		Optional<User> emailUserExists = userList.stream().filter(userRepositoryItem -> userRepositoryItem.getEmail().equals(user.getEmail())).findFirst();
//		Optional<User> usernameExists = userList.stream().filter(userRepositoryItem -> userRepositoryItem.getUsername().equals(user.getUsername())).findFirst();
		
		if(emailUserExists.isPresent()){
			if(checkPassword(user.getPassword(), emailUserExists.get().getPassword())) {
				if(emailUserExists.get().getIsAdmin() == 1) {
					String hash = generateHash();
					Admin_hash admin_hash = new Admin_hash(hash, getExpiration());
					adminRepository.save(admin_hash);
					
					LoginResponse loginResponse = new LoginResponse(emailUserExists.get().getId(), emailUserExists.get().getFirstName(),
							emailUserExists.get().getSurname(), emailUserExists.get().getUsername(), hash);
					return ResponseEntity.ok(loginResponse);
				} else {
					LoginResponse loginResponse = new LoginResponse(user.getId(), user.getFirstName(),
							user.getSurname(), user.getUsername(), null);
					return ResponseEntity.ok(loginResponse);
				}
				
			} else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The password is incorrect.");
			}
		}
		else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The username " + user.getUsername() + " doesn't exist.");
		}
	}
	
	public static Long getExpiration() {
		Instant now = Instant.now();

        Instant in48Hours = now.plus(Duration.ofHours(48));

        return in48Hours.getEpochSecond();
	}
	
	public static boolean checkPassword(String password, String hashedPassword) {
		return BCrypt.checkpw(password, hashedPassword);
	}
	
	public static String generateHash() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
        Random random = new Random();
        
        StringBuilder stringBuilder = new StringBuilder(10);
        for (int i = 0; i < 10; i++) {
            int randomIndex = random.nextInt(characters.length());
            char randomChar = characters.charAt(randomIndex);
            stringBuilder.append(randomChar);
        }
        
        String randomString = stringBuilder.toString();
        return BCrypt.hashpw(randomString, BCrypt.gensalt());
	}
}
