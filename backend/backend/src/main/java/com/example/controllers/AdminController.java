package com.example.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.example.services.AdminService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {
	private AdminService adminService;

	public AdminController(AdminService adminService) {
		this.adminService = adminService;
	}
	
	
}
