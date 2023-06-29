package com.replicake.replicake.models;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

// allows interface with a table based on certain class
// i.e., JpaRepository translates code into SQL commands
public interface UserRepository extends JpaRepository<User, Integer> {
    List<User> findByName(String name);

    User findByEmail(String email);

    User findByPassword(String password);

    User findByEmailAndPassword(String email, String password);

    User findByNameAndPassword(String name, String password);

    User findByUid(int uid);

    boolean existsByEmail(String email);
}