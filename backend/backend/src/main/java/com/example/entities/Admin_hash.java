package com.example.entities;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "hashid")
	private Long id;
	
	@Column(name = "hash")
	private String hash;
	
	@Column(name = "expiration")
	private Long expiration;

	public Admin_hash(String hash, Long expiration) {
		this.hash = hash;
		this.expiration = expiration;
	}
}
