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
@Table(name = "expressions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Expression implements Serializable {
	private static final long serialVersionUID = 9035768238263308942L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "expressionid")
	private Long id;
	
	@Column(name = "languageofexpression")
	private String languageOfExpression;
	
	@Column(name = "expression")
	private String expression;
	
	@Column(name = "rightanswer")
	private String rightAnswer;
	
	@Column(name = "falseanswerone")
	private String falseAnswerOne;
	
	@Column(name = "falseanswertwo")
	private String falseAnswerTwo;
	
	@Column(name = "creatorid")
	private Long creatorId;
	
	@Column(name = "validated")
	private Long validated;
}
