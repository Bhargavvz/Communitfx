package com.cofix.cofixBackend.Models;


import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Location {
    private Double lat;
    private Double lng;
}
