package com.accolite.benchManagement.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


import java.util.Collection;
import java.util.Collections;


@Document(collection = "Employees")
@Data
public class Employee implements UserDetails {

    @Id
    private String id;

    private String empName;

    @Indexed(unique = true)
    @NonNull
    private String empId;

    @Indexed(unique = true)
    @NonNull
    private String email;

    @JsonIgnore
    @NonNull
    private String password;

    private String role;

    public Employee(@NonNull String email, @NonNull String password) {
        this.email = email;
        this.password = password;
    }

@Override
public Collection<? extends GrantedAuthority> getAuthorities() {
    return Collections.EMPTY_LIST;
}

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
