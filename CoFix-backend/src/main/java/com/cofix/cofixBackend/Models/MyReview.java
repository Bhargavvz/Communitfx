package com.cofix.cofixBackend.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@ToString
@Table(schema = "${cofix.schema.name}", name = "reviews")
public class MyReview {

    @Id
    @Column(name = "review_id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "my_sequence_generator")
    @SequenceGenerator(name = "my_sequence_generator", sequenceName = "public.reviews_review_id_seq", allocationSize = 1)
    Long reviewId;
    String name;
    String email;
    String message;
    @Column(name="create_date")
    LocalDateTime createDate;
}
