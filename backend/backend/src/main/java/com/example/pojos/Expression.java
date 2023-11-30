package com.example.pojos;

public class Expression {
	private Long expressionId;
	private String language;
	private String expression;
	private String rightAnswer;
	private String wrongAnswerOne;
	private String wrongAnswerTwo;
	private Long creatorId;
	private boolean validated;
	
	public Expression() {
		
	}

	public Expression(Long expressionId, String language, String expression, String rightAnswer, String wrongAnswerOne,
			String wrongAnswerTwo, Long creatorId) {
		this.expressionId = expressionId;
		this.language = language;
		this.expression = expression;
		this.rightAnswer = rightAnswer;
		this.wrongAnswerOne = wrongAnswerOne;
		this.wrongAnswerTwo = wrongAnswerTwo;
		this.creatorId = creatorId;
		this.validated = false;
	}

	public Long getExpressionId() {
		return expressionId;
	}

	public void setExpressionId(Long expressionId) {
		this.expressionId = expressionId;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public String getExpression() {
		return expression;
	}

	public void setExpression(String expression) {
		this.expression = expression;
	}

	public String getRightAnswer() {
		return rightAnswer;
	}

	public void setRightAnswer(String rightAnswer) {
		this.rightAnswer = rightAnswer;
	}

	public String getWrongAnswerOne() {
		return wrongAnswerOne;
	}

	public void setWrongAnswerOne(String wrongAnswerOne) {
		this.wrongAnswerOne = wrongAnswerOne;
	}

	public String getWrongAnswerTwo() {
		return wrongAnswerTwo;
	}

	public void setWrongAnswerTwo(String wrongAnswerTwo) {
		this.wrongAnswerTwo = wrongAnswerTwo;
	}

	public Long getCreatorId() {
		return creatorId;
	}

	public void setCreatorId(Long creatorId) {
		this.creatorId = creatorId;
	}

	public boolean isValidated() {
		return validated;
	}

	public void setValidated(boolean validated) {
		this.validated = validated;
	}
}
