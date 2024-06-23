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
}
