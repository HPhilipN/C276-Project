package com.backend.backend.models;

/**
 * Password class is used to assist in updating passwords and is utilized
 * in UserController.java by the users/update/password/{uid} endpoint
 */
public class Password {
    private String oldPassword;
    private String newPassword;

    public Password() {
    }

    public Password(String oldPassword, String newPassword) {
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    @Override
    public String toString() {
        return "Password: [oldPassword=" + oldPassword + ", newPassword=" + newPassword + "]";
    }
}

// Example of JSON body to return
// {
// "oldPassword": "...",
// "newPassword": "...",
// }