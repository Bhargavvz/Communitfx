package com.cofix.cofixBackend.Services;

import com.cofix.cofixBackend.Models.MyUser;
import com.cofix.cofixBackend.Repos.UsersRepo;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@Slf4j
//@Order(2)
public class AuthService implements Ordered {

    @Autowired
    private UsersRepo userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostConstruct
    public void initCofix(){

        // Add admin data
        if(userRepository.findByEmail("admin@email.com")==null) {
            log.info("++++++++++++++ CREATING ADMIN USER ++++++++++++++");
            userRepository.save(new MyUser("admin", "admin@email.com", passwordEncoder.encode("admin")));
        }
        // Add test user data
        if(userRepository.findByEmail("test@user.com") == null) {
            log.info("++++++++++++++ CREATING TEST USER ++++++++++++++++");
            userRepository.save(new MyUser("test@user.com", "Test User", passwordEncoder.encode("password"), "testy", "1234567890", "India", "Male", "Telangana", LocalDateTime.now()));
        }
        log.info("======================= AuthService initialized =======================");
    }

    public boolean loginUser(String email, String rawPassword) {
        MyUser user = userRepository.findByEmail(email);
        if (user != null) {
            return passwordEncoder.matches(rawPassword, user.getPassword());
        }
        return false;
    }

    public MyUser registerUser(MyUser user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setCreateDate(LocalDateTime.now());
        return userRepository.save(user);
    }

    @Override
    public int getOrder(){
        return 1;
    }

}
