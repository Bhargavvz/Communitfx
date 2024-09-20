package com.cofix.cofixBackend.Controllers;

import com.cofix.cofixBackend.Models.BenefitTypes;
import com.cofix.cofixBackend.Models.MyPost;
import com.cofix.cofixBackend.Models.MyReview;
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
            log.info("User not authenticated failed");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestParam String name, @RequestParam String email, @RequestParam String password) {
        log.info("Signup information has been received successfully:");
        Optional<MyUser> user = cofixService.getUsersRepo().findById(email);
        if(user.isPresent()){
            log.error("Cant create user, existing email");
            return ResponseEntity.badRequest().body("User already exists");
        } else {
            authService.registerUser(new MyUser(name, email, password));
            log.info("New User added " + email);
            return ResponseEntity.ok("Sign-up successful");
        }
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

//    @PostMapping("/profile/edit")
//    public ResponseEntity<MyUser> setProfileData(String email) {
//        log.info("Profile API: Sending profile information with email:" + email);
//        Optional<MyUser> user = cofixService.getUsersRepo().findById(email);
//        if(user.isPresent()){
//            log.info("User found :" + user);
//            log.info("Updating info : " + user.get());
//            return ResponseEntity.ok(user.get());
//        } else{
//            log.info("User not found");
//            return ResponseEntity.notFound().build();
//        }
//    }

    @CrossOrigin
    @PostMapping("/profile/update")
    public ResponseEntity<MyUser> updateProfile(@RequestBody MyUser updatedProfile) {
        log.info("Updating profile for user:" + updatedProfile.getEmail());
        Optional<MyUser> profile = cofixService.getUsersRepo().findById(updatedProfile.getEmail());
        if(profile.isPresent()) {
            log.info("Old profile for user: " + profile.get());
            log.info("Updated profile = " + updatedProfile);
            updatedProfile.setPassword(profile.get().getPassword());
            cofixService.getUsersRepo().save(updatedProfile);
            return ResponseEntity.ok(profile.get());
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @CrossOrigin
    @GetMapping("/profile/posts")
    public ResponseEntity<List<MyPost>> showAllPosts(String email) {
        List<MyPost> posts = cofixService.getProfilePosts(email);
        if(!posts.isEmpty()) {
            log.info("Get All posts for user: " + posts);
            return new ResponseEntity<>(posts, HttpStatus.OK);
        } else {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/issues")
    public ResponseEntity<List<MyPost>> getAllCommunityIssues(String benefitType) {
        List<MyPost> allCommunityIssues = cofixService.getPostsRepo().findByBenefitType(BenefitTypes.valueOf(benefitType));
        if(!allCommunityIssues.isEmpty()) {
            log.debug("Get All Community: " + allCommunityIssues);
            return new ResponseEntity<>(allCommunityIssues, HttpStatus.OK);
        } else {
            return ResponseEntity.internalServerError().build();
        }
    }

    //@CrossOrigin
    @GetMapping("/profile/issues")
    public ResponseEntity<List<MyPost>> showAllIssues(String email) {

        List<MyPost> issues = cofixService.getProfileIssues(email);
        if(!issues.isEmpty()) {
            log.debug("Get All issues for user: " + issues);
            return new ResponseEntity<>(issues, HttpStatus.OK);
        } else {
            return ResponseEntity.internalServerError().build();
        }
    }

    @CrossOrigin
    @GetMapping("/profile/schemes")
    public ResponseEntity<List<MyPost>> showAllSchemes(String email) {

        List<MyPost> schemes = cofixService.getProfileSchemes(email);
        if(!schemes.isEmpty()) {
            log.debug("Get All schemes for user: " + schemes);
            return new ResponseEntity<>(schemes, HttpStatus.OK);
        } else {
            return ResponseEntity.internalServerError().build();
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

//    @CrossOrigin
//    @DeleteMapping("/profile/issues/${postId}")
//    public ResponseEntity<String> deleteIssue(@PathVariable Long postId) {
//        // Save the issue to the database or in-memory store
//        // For now, just print it to the console
//        log.info("IssueId to be deleted :" + postId);
//
//        try {
//            cofixService.deletePost(postId);
//            return ResponseEntity.ok("Deleted Successfully");
//        } catch (Exception e){
//            return ResponseEntity.internalServerError().build();
//        }
//    }
    @CrossOrigin
    @DeleteMapping("/profile/issues/{postId}")
    public ResponseEntity<Void> deleteIssues(@PathVariable Long postId) {
        log.info("IssueId to be deleted :" + postId);
        cofixService.deletePost(postId);
        return ResponseEntity.noContent().build();
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


    @CrossOrigin
    @PostMapping("/profile/review/add")
    public ResponseEntity<MyReview> addIssue(@RequestBody MyReview review) {
        // Save the issue to the database or in-memory store
        // For now, just print it to the console
        log.info("review to be added :" + review);

        MyReview finalReview = cofixService.addReview(review);
        if(finalReview!=null){
            log.info("Successfully added review");
        } else {
            log.error("Failed to add issue post");
        }
        log.info("New community post added for user: "+ finalReview);
        return new ResponseEntity<>(finalReview, HttpStatus.CREATED);
    }
}
