package com.cofix.cofixBackend.Controllers;

import com.cofix.cofixBackend.Models.MyPost;
import com.cofix.cofixBackend.Models.MyUser;
import com.cofix.cofixBackend.Services.AuthService;
import com.cofix.cofixBackend.Services.CofixService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@Slf4j
@CrossOrigin
@RequestMapping("/api")
public class CofixLoginController {

    @Autowired
    AuthService authService;

    @Autowired
    CofixService cofixService;

    public CofixLoginController(){
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String email, @RequestParam String password) {
        log.info("Got a request! Email:" + email +" Password:" + password);

        if (authService.loginUser(email,password)) {
            log.info("User authenticated successfully");
            return ResponseEntity.ok("Login successful");
        } else {
            log.info("User not authenticated successfully");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestParam String name, @RequestParam String email, @RequestParam String password) {
        log.info("Signup information has been received successfully:");
        authService.registerUser(new MyUser(name,email,password));
        log.info("New User added "+ email);
        return ResponseEntity.ok("Sign-up successful");
    }

    @GetMapping("/profile")
    public ResponseEntity<MyUser> getProfileData(String email) {
        log.info("Profile API: Sending profile information with email:" + email);
        Optional<MyUser> user = cofixService.getUsersRepo().findById(email);
        if(user.isPresent()){
            log.info("User found :" + user.get());
            return ResponseEntity.ok(user.get());
        } else{
            log.info("User not found");
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/profile/edit")
    public ResponseEntity<MyUser> setProfileData(String email) {
        log.info("Profile API: Sending profile information with email:" + email);
        Optional<MyUser> user = cofixService.getUsersRepo().findById(email);
        if(user.isPresent()){
            log.info("User found :" + user);
            log.info("Updating info : " + user.get());
            return ResponseEntity.ok(user.get());
        } else{
            log.info("User not found");
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin
    @PostMapping("/profile/update")
    public ResponseEntity<MyUser> updateProfile(@RequestBody MyUser updatedProfile) {
        log.info("Updating profile for user:" + updatedProfile.getEmail());
        Optional<MyUser> profile = cofixService.getUsersRepo().findById(updatedProfile.getEmail());
        if(profile.isPresent()) {
            log.info("Old profile for user: " + profile.get());
            log.info("Updated profile = " + updatedProfile);
            cofixService.getUsersRepo().save(updatedProfile);
            return ResponseEntity.ok(profile.get());
        } else {
            return ResponseEntity.notFound().build();
        }


    }

    @CrossOrigin
    @PostMapping("/profile/issues/add")
    public ResponseEntity<MyPost> addIssue(@RequestBody MyPost issuePost) {
        // Save the issue to the database or in-memory store
        // For now, just print it to the console
        log.info("Issue to be added :" + issuePost);

        MyPost addedPost = cofixService.addIssuePost(issuePost);
        if(addedPost!=null){
            log.info("Successfully added issue post");
        } else {
            log.error("Failed to add issue post");
        }
        log.info("New community post added for user: "+ addedPost);
        return new ResponseEntity<>(addedPost, HttpStatus.CREATED);
    }

    @CrossOrigin
    @PostMapping("/profile/schemes/add")
    public ResponseEntity<MyPost> addScheme(@RequestBody MyPost schemePost) {

        log.info("Scheme to be added :" + schemePost);
        MyPost addedPost = cofixService.addSchemePost(schemePost);
        if(addedPost!=null){
            log.info("Successfully added scheme post");
        } else {
            log.error("Failed to add scheme post");
        }
        log.info("New community post added for user: "+ addedPost);
        return new ResponseEntity<>(addedPost, HttpStatus.CREATED);
    }
}
