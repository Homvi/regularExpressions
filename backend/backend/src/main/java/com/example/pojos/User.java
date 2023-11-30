package com.example.pojos;

public class User {
	private Long userId;
	private String firstName;
	private String surname;
	private String username;
	private String email;
	private String password;
	private Long isAdmin;
	
	public User() {
		
	}

	public User(Long userId, String firstName, String surname, String username, String email, String password) {
		this.userId = userId;
		this.firstName = firstName;
		this.surname = surname;
		this.username = username;
		this.email = email;
		this.password = password;
		this.isAdmin = (long) 0;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Long isAdmin() {
		return isAdmin;
	}

	public void setAdmin(Long isAdmin) {
		this.isAdmin = isAdmin;
	}
}
