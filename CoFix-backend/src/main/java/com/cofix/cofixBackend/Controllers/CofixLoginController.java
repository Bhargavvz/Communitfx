package com.cofix.cofixBackend.Controllers;

import com.cofix.cofixBackend.Models.MyUser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
//@CrossOrigin
@RequestMapping("/api")
public class CofixLoginController {

    Map<String,MyUser> users;

    public CofixLoginController(){
        users = new HashMap<>();
        users.put("admin@admin.com", new MyUser("admin","admin@admin.com","admin"));
    }


    //@CrossOrigin(origins = "http://localhost:8000")
    @CrossOrigin
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String email, @RequestParam String password) {
        log.info("Got a request: Email:" + email +" Password:" + password);
        log.info("All current Users:"+ users);
        // Replace with your actual authentication logic

        if (("user@example.com".equals(email) && "password".equals(password)) || (users.containsKey(email) && users.get(email).getPassword().equals(password))) {
            log.info("User authenticated successfully");
            return ResponseEntity.ok("Login successful");
        } else {
            log.info("User not authenticated successfully");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @CrossOrigin
    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestParam String name, @RequestParam String email, @RequestParam String password) {
        // Replace with your actual sign-up logic (e.g., save to database)
        // For now, just return a success message
        log.info("Signup information has been received successfully:");
        MyUser newUser = new MyUser(name,email,password);
        users.put(email,newUser);
        log.info("New User added "+ newUser);
        return ResponseEntity.ok("Sign-up successful");
    }

    @CrossOrigin
    @GetMapping("/profile")
    public ResponseEntity<MyUser> getProfileData(String email) {
        // Replace with your actual account data fetching logic
        log.info("Profile API: Sending profile information with email:" + email);
        if(users.containsKey(email)){
            log.info("User found :" + users.get(email));
            return ResponseEntity.ok(users.get(email));
        } else{
            log.info("User not found");
            return ResponseEntity.notFound().build();
        }
    }


}
