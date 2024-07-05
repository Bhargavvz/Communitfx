package com.cofix.cofixBackend.Models;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class PostPk implements Serializable {
    private String email;
    private Long postId;
}
