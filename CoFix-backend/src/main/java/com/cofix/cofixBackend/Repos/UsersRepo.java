package com.cofix.cofixBackend.Repos;

import com.cofix.cofixBackend.Models.MyUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsersRepo extends JpaRepository<MyUser,String> {
    MyUser findByEmail(String email);
}
