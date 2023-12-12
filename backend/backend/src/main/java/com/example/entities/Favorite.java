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
@Table(name = "favorites")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Favorite implements Serializable {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "favoriteid")
	private Long id;
	
	@Column(name = "userid")
	private Long userId;
	
	@Column(name = "expressionid")
	private Long expressionId;
}
