package com.cofix.cofixBackend.Services;

import com.cofix.cofixBackend.Models.*;
import com.cofix.cofixBackend.Repos.PostsRepo;
import com.cofix.cofixBackend.Repos.ReviewsRepo;
import com.cofix.cofixBackend.Repos.UsersRepo;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Getter
@Setter
@Slf4j
//@Order(1)
public class CofixService implements Ordered {

    @Autowired
    PostsRepo postsRepo;
    @Autowired
    UsersRepo usersRepo;
    @Autowired
    ReviewsRepo reviewsRepo;

    public CofixService(){
    }

    @PostConstruct
    public void initCofix(){

        if(postsRepo.findByEmailAndBenefitType("test@user.com",BenefitTypes.COMMUNITY_ISSUE).isEmpty()){
            log.info("Adding test@user Community Problem data");
            postsRepo.save(new MyPost("test@user.com",null, BenefitTypes.COMMUNITY_ISSUE,null,null,null,"electricity/streetlights","Fix power supply at a this location", new Location(2D,1D), "Need new street light", LocalDateTime.now()));
        }
        if( postsRepo.findByEmailAndBenefitType("test@user.com",BenefitTypes.GOVERNMENT_SCHEME).isEmpty()){
            log.info("Adding test@user Government Schemes data");
            postsRepo.save(new MyPost("test@user.com",null,BenefitTypes.GOVERNMENT_SCHEME,"Rythu Bandhu","Rythu Bandhu description",null,null,null, null, "Rythu Bandhu Description",LocalDateTime.now()));
        }
        log.info("======================= CofixService initialized =======================");
    }

    @Override
    public int getOrder(){
        return 2;
    }

    public MyPost addIssuePost(MyPost myPost){
        myPost.setCreateDate(LocalDateTime.now());
        return postsRepo.save(myPost);
    }
    public MyPost addSchemePost(MyPost myPost){
        myPost.setCreateDate(LocalDateTime.now());
        return postsRepo.save(myPost);
    }

    public List<MyPost> getProfilePosts(String email) {
        log.info("Show all posts for email: " + email);
        List<MyPost> posts = postsRepo.findByEmail(email);
        return posts;
    }

    public List<MyPost> getProfileIssues(String email) {
        log.info("Show all issues for email: " + email);
        List<MyPost> posts = postsRepo.findByEmailAndBenefitType(email,BenefitTypes.COMMUNITY_ISSUE);
        return posts;
    }

    public List<MyPost> getProfileSchemes(String email) {
        log.info("Show all schemes for email: " + email);
        List<MyPost> posts = postsRepo.findByEmailAndBenefitType(email,BenefitTypes.GOVERNMENT_SCHEME);
        return posts;
    }

    @Transactional
    public void deletePost(Long postId) {
        postsRepo.deleteByPostId(postId);
    }

    public MyReview addReview(MyReview review){
        review.setCreateDate(LocalDateTime.now());
        return reviewsRepo.save(review);
    }
}
