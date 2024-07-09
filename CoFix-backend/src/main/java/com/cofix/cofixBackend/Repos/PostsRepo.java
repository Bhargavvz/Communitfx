package com.cofix.cofixBackend.Repos;

import com.cofix.cofixBackend.Models.BenefitTypes;
import com.cofix.cofixBackend.Models.MyPost;
import com.cofix.cofixBackend.Models.PostPk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostsRepo extends JpaRepository<MyPost, PostPk> {
    List<MyPost> findByEmail(String email);
    List<MyPost> findByEmailAndBenefitType(String email, BenefitTypes benefitType);
    List<MyPost> findByBenefitType(BenefitTypes benefitTypes);
    void deleteByPostId(Long postId);

//    MyPost findByEmailAndPostId(String email,String postId);
}