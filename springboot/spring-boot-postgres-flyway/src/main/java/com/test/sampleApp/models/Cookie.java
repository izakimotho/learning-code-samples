package com.test.sampleApp.models;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

import java.util.Objects;

@Entity
public class Cookie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Provide the cookie flavour")
    private String flavour;

    public static Cookie from (String flavour) {
        var cookie = new Cookie();
        cookie.flavour = flavour;
        return cookie;
    }

    public String getFlavour() {
        return flavour;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Cookie cookie = (Cookie) o;
        return flavour.equals(cookie.flavour);
    }

    @Override
    public int hashCode() {
        return Objects.hash(flavour);
    }

    @Override
    public String toString() {
        return "Cookie{" +
                "id=" + id +
                ", flavour='" + flavour + '\'' +
                '}';
    }
}
