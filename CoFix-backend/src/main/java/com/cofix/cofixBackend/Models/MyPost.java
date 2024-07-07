package com.cofix.cofixBackend.Models;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(schema = "${cofix.schema.name}", name = "posts")
@IdClass(PostPk.class)
@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MyPost{

    @Id
    @Column(name = "email")
    String email;

    @Id
    @Column(name = "post_id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "my_sequence_generator")
    @SequenceGenerator(name = "my_sequence_generator", sequenceName = "public.posts_post_id_seq", allocationSize = 1)
    Long postId;

    @Column(name = "benefit_type")
    @Enumerated(EnumType.STRING)
    BenefitTypes benefitType;

    @Column(name = "scheme_name")
    String schemeName;

    @Column(name = "description")
    String description;

    @Column(name = "image")
    String image;

    @Column(name = "issue_name")
    String issueName;

    @Column(name = "activity_description")
    String activityDescription;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "lat", column = @Column(name = "latitude")),
            @AttributeOverride(name = "lng", column = @Column(name = "longitude"))
    })
    Location location;

    @Column(name = "comment")
    String comment;

    @Column(name = "create_date")
    LocalDateTime createDate;

    public MyPost(String email, BenefitTypes benefitType, String schemeName, String description, String image, String issueName, String activityDescription, Location location, String comment) {
        this.email = email;
        this.benefitType = benefitType;
        this.schemeName = schemeName;
        this.description = description;
        this.image = image;
        this.issueName = issueName;
        this.activityDescription = activityDescription;
        this.location = location;
        this.comment = comment;
    }
}
