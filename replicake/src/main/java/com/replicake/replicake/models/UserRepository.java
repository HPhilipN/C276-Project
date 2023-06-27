package com.replicake.replicake.models;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

// allows interface with a table based on certain class
// i.e., JpaRepository translates code into SQL commands
public interface UserRepository extends JpaRepository<User, Integer> {
    List<User> findByName(String name);

    List<User> findByEmail(String email);

    List<User> findByPassword(String password);

    List<User> findByEmailAndPassword(String email, String password);

    List<User> findByNameAndPassword(String name, String password);

    User findByUid(int uid);
}