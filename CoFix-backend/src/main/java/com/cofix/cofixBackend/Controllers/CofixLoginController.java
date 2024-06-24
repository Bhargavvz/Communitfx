package com.cofix.cofixBackend.Controllers;

import com.cofix.cofixBackend.Models.MyPost;
import com.cofix.cofixBackend.Models.MyUser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@Slf4j
@CrossOrigin
@RequestMapping("/api")
public class CofixLoginController {

    Map<String,MyUser> users;
    Map<String,MyPost> governmentSchemePosts;
    Map<String,MyPost> communityPosts;

    public CofixLoginController(){

        // Add a test user
        users = new HashMap<>();
        users.put("admin@admin.com", new MyUser("admin","admin@admin.com","admin"));
        users.put("user@example.com", new MyUser("Testuser", "user@example.com","password","testy","1234567890","India","Male","Telangana"));

        // Add few community posts
        communityPosts = new HashMap<>();
        communityPosts.put("user@example.com", new MyPost("user@example.com","Community Problem",null,null,null,"electricity/streetlights","Fix power supply at a this location", null, "Need new street light"));

        //Add few government Scheme posts
        governmentSchemePosts = new HashMap<>();
        governmentSchemePosts.put("user@example.com", new MyPost("user@example.com","Government Schemes","Rythu Bandhu","Rythu Bandhu description",null,"electricity/streetlights","Fix power supply at a this location", null, "Need new street light"));
    }


    @CrossOrigin
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String email, @RequestParam String password) {
        log.info("Got a request! Email:" + email +" Password:" + password);
        log.info("All current Users:"+ users);

        if (users.containsKey(email) && users.get(email).getPassword().equals(password)) {
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
        log.info("Signup information has been received successfully:");
        MyUser newUser = new MyUser(name,email,password);
        users.put(email,newUser);
        log.info("New User added "+ newUser);
        return ResponseEntity.ok("Sign-up successful");
    }

    @CrossOrigin
    @GetMapping("/profile")
    public ResponseEntity<MyUser> getProfileData(String email) {
        log.info("Profile API: Sending profile information with email:" + email);
        if(users.containsKey(email)){
            log.info("User found :" + users.get(email));
            return ResponseEntity.ok(users.get(email));
        } else{
            log.info("User not found");
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin
    @PostMapping("/editProfile")
    public ResponseEntity<MyUser> setProfileData(String email) {
        log.info("Profile API: Sending profile information with email:" + email);
        if(users.containsKey(email)){
            log.info("User found :" + users.get(email));
            return ResponseEntity.ok(users.get(email));
        } else{
            log.info("User not found");
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin
    @PostMapping("/profile/update")
    public ResponseEntity<MyUser> updateProfile(@RequestBody MyUser profile) {
        log.info("Updating profile for user:" + profile.getEmail());
        MyUser updatedProfile = users.put(profile.getEmail(),profile);
        log.info("Updated profile = "+ users.get(profile.getEmail()));

        return ResponseEntity.ok(profile);
    }

    @CrossOrigin
    @PostMapping("/profile/issues/add")
    public ResponseEntity<MyPost> addIssue(@RequestBody MyPost issuePost) {
        // Save the issue to the database or in-memory store
        // For now, just print it to the console
        log.info("Issue to be added :" + issuePost);
        return new ResponseEntity<>(issuePost, HttpStatus.CREATED);
    }

    @CrossOrigin
    @PostMapping("/profile/schemes/add")
    public ResponseEntity<String> addScheme(@RequestBody MyPost schemePost) {
        // Save the issue to the database or in-memory store
        // For now, just print it to the console
        log.info("Scheme post to be added :" + schemePost);
        return new ResponseEntity<>("Issue added successfully", HttpStatus.CREATED);
    }
}
