package com.backend.backend.models;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Integer> {
    List<Recipe> findByAuthorId(int authorId);
    Recipe findByTitle(String title);
    boolean existsByRid(int rid);
}
