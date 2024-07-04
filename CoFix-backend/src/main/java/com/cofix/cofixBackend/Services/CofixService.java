package com.cofix.cofixBackend.Services;

import com.cofix.cofixBackend.Models.Location;
import com.cofix.cofixBackend.Models.MyPost;
import com.cofix.cofixBackend.Models.PostPk;
import com.cofix.cofixBackend.Repos.PostsRepo;
import com.cofix.cofixBackend.Repos.UsersRepo;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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

    public CofixService(){
    }

    @PostConstruct
    public void initCofix(){

        if(postsRepo.findById(new PostPk("test@user.com", 1L)).equals(Optional.empty())){
            log.info("Adding test@user Community Problem data");
            postsRepo.save(new MyPost("test@user2.com",2L,"Community Problem",null,null,null,"electricity/streetlights","Fix power supply at a this location", new Location(2D,1D), "Need new street light", LocalDateTime.now()));
        }
        if(postsRepo.findById(new PostPk("test@user.com", 2L)).equals(Optional.empty())){
            log.info("Adding test@user Government Schemes data");
            postsRepo.save(new MyPost("test@user.com",2L,"Government Schemes","Rythu Bandhu","Rythu Bandhu description",null,"electricity/streetlights","Fix power supply at a this location", null, "Need new street light",LocalDateTime.now()));
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
}
