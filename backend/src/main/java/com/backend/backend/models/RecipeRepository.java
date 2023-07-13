package com.backend.backend.models;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRepository extends JpaRepository<Recipe, Integer> {
    void deleteById(int recipeId);
}
