package com.example.entities;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "admin_hashes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Admin_hash implements Serializable {
	private String hash;
	private Long expiration;
}
