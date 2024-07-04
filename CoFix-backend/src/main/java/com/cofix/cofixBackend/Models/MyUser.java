package com.cofix.cofixBackend.Models;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(schema = "${cofix.schema.name}", name = "users")
@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MyUser {

    @Id
    String email;
    String name;
    String password;
    @Column(name = "nick_name")
    String nickName;
    @Column(name = "phone_number")
    String phoneNumber;
    String country;
    String gender;
    String address;
    @Column(name = "create_date")
    LocalDateTime createDate;

    public MyUser(String name, String email, String password){
        this.name = name;
        this.email =  email;
        this.password = password;
    }

}
