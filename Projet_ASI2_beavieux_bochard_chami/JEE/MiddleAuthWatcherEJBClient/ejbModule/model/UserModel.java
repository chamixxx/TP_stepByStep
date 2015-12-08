package model;

import java.io.Serializable;

public class UserModel implements Serializable{
	private String lastName;
	private String surName;
	private String login;
	private String pwd;
	private String role;
	
	

	public UserModel(String surName, String lastName, String login, String pwd, String role) {
		this.lastName = login;
		this.surName = login;
		this.login = login;
		this.pwd = pwd;
		this.role = role;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getSurName() {
		return surName;
	}
	public void setSurName(String surName) {
		this.surName = surName;
	}
	public String getLogin() {
		return login;
	}
	public void setLogin(String login) {
		this.login = login;
	}
	public String getPwd() {
		return pwd;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
}
