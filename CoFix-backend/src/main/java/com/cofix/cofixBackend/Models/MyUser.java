package com.cofix.cofixBackend.Models;


import lombok.*;

@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MyUser {
    String name;
    String email;
    String password;
    String nickName;
    String phoneNumber;
    String country;
    String gender;
    String address;

    public MyUser(String name, String email, String password){
        this.name = name;
        this.email =  email;
        this.password = password;
    }

}
