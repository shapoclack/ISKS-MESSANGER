package com.messenger.isks.dto;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

public class UserDTO {


    private int userid;

    @NotEmpty(message = "Field Cannot Be Empty")
    @Pattern(regexp = "^[\\p{L} .'-]+$", message = "The name field may only contain letters")
    @Length(min = 2, message = "Username must contain at least 2 characters")
    private String username;

    @NotEmpty(message = "Field Cannot Be Empty")
    @Email(message = "Email must be valid")
    private String email;

    @NotEmpty(message = "Field Cannot Be Empty")
    @Length(min = 3, message = "Password must contain at least 3 characters")
    private String password;


    public UserDTO(int userid, String username, String email, String password) {
        this.userid = userid;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public UserDTO() {
    }

    public int getUserid() {
        return userid;
    }

    public void setUserid(int userid) {
        this.userid = userid;
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


    @Override
    public String toString() {
        return "UserDTO{" +
                "userid=" + userid +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
