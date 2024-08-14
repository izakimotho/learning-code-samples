package kish.controller.request;

import kish.annotation.EmailValidation;

public class EmailDTO {
    @EmailValidation(type = EmailValidation.Flag.COMPANY)
    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}
