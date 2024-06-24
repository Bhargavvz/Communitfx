package com.cofix.cofixBackend.Models;


import lombok.*;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MyPost {

    String email;
    String benefitType;
//    String benefitName;
    String schemeName;
    String description;
    String image;
    String issueName;
    String activityDescription;
    Location location;
    String comment;

}
