package com.cofix.cofixBackend.Repos;

import com.cofix.cofixBackend.Models.MyReview;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewsRepo extends JpaRepository<MyReview,String> {
}
