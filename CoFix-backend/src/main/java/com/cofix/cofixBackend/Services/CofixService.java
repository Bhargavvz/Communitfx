package com.cofix.cofixBackend.Services;

import com.cofix.cofixBackend.Models.*;
import com.cofix.cofixBackend.Repos.PostsRepo;
import com.cofix.cofixBackend.Repos.ReviewsRepo;
import com.cofix.cofixBackend.Repos.UsersRepo;
import jakarta.annotation.PostConstruct;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;

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
    @Value("${admin-email}")
    String adminEmail;
    @Autowired
    private EmailSenderService emailSenderService;

    public CofixService(){
    }

    @PostConstruct
    public void initCofix(){

//        if(postsRepo.findByEmailAndBenefitType("test@user.com",BenefitTypes.COMMUNITY_ISSUE).isEmpty()){
//            log.info("Adding test@user Community Problem data");
//            postsRepo.save(new MyPost("test@user.com",null, BenefitTypes.COMMUNITY_ISSUE,null,null,null,"electricity/streetlights","Fix power supply at a this location", new Location(2D,1D), "Need new street light", LocalDateTime.now()));
//        }
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

//    public void sendMail(){
//        emailSenderService.sendEmail("bhargavanishanth@gmail.com",
//                "This is a subject", "This is body of email 22");
//    }
@Autowired
private JavaMailSender mailSender;

public void sendEmail(String toEmail,String subject,String body) throws MessagingException {
    MimeMessage message = mailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");


    helper.setTo(toEmail);
    helper.setSubject(subject);
    helper.setText(body, true);

    mailSender.send(message);
    log.info("mail sent successfully");
}

    public void sendNotificationEmail(MyPost issuePost,String targetEmail) throws MessagingException {
        this.sendEmail(targetEmail,"New issue added: User "+ issuePost.getEmail(),generateEmailBody(issuePost));
    }

    public String generateEmailBody(MyPost post) {
        String emailBody = "<!DOCTYPE html>"
                + "<html>"
                + "<head>"
                + "<meta charset=\"UTF-8\">"
                + "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">"
                + "<style>"
                + "table { width: 100%; border-collapse: collapse; }"
                + "th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }"
                + "th { background-color: #f2f2f2; }"
                + "</style>"
                + "</head>"
                + "<body>"
                + "<p>Dear Admin,</p>"
                + "<p>A new issue has been created on the platform with the following details:</p>"
                + "<table>"
                + "<tr><th>Field</th><th>Details</th></tr>"
                + "<tr><td><strong>Email</strong></td><td>" + post.getEmail() + "</td></tr>"
                + "<tr><td><strong>Post ID</strong></td><td>" + post.getPostId() + "</td></tr>"
                + "<tr><td><strong>Benefit Type</strong></td><td>" + post.getBenefitType() + "</td></tr>"
                + "<tr><td><strong>Scheme Name</strong></td><td>" + post.getSchemeName() + "</td></tr>"
                + "<tr><td><strong>Issue Name</strong></td><td>" + post.getIssueName() + "</td></tr>"
                + "<tr><td><strong>Description</strong></td><td>" + post.getDescription() + "</td></tr>"
                + "<tr><td><strong>Activity Description</strong></td><td>" + post.getActivityDescription() + "</td></tr>"
                + "<tr><td><strong>Location</strong></td><td>Latitude: " + (post.getLocation()!=null?post.getLocation().getLat():"Null")
                + ", Longitude: " + (post.getLocation()!=null?post.getLocation().getLng():"Null") + "</td></tr>"
                + "<tr><td><strong>Comments</strong></td><td>" + post.getComment() + "</td></tr>"
                + "<tr><td><strong>Image</strong></td><td>Image is encoded and can be viewed on the platform</td></tr>"
                + "<tr><td><strong>Date Created</strong></td><td>" + post.getCreateDate() + "</td></tr>"
                + "</table>"
                + "<p>Please review the issue and take the necessary actions.</p>"
                + "<p>Best regards,<br>CoFix Platform Team</p>"
                + "</body>"
                + "</html>";

        return emailBody;
    }
}
