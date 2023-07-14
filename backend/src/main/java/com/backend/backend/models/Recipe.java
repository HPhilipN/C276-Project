package com.backend.backend.models;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "recipes")
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int rid;

    private int authorId;
    private String title;
    private int recipeDifficulty;
    private int favourites;
    @ElementCollection
    private List<String> ingredients = new ArrayList<String>();
    @ElementCollection
    private List<String> instructions = new ArrayList<String>();
    @ElementCollection
    private List<String> tags = new ArrayList<String>();

    // Constructors
    public Recipe() {
    }

    public Recipe(int authorId, String title, int recipeDifficulty, int favourites, List<String> ingredients,
            List<String> instructions, List<String> tags) {
        this.authorId = authorId;
        this.title = title;
        this.recipeDifficulty = recipeDifficulty;
        this.favourites = favourites;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.tags = tags;
    }

    // Getters & Setters
    public int getRid() {
        return rid;
    }

    public void setRid(int rid) {
        this.rid = rid;
    }

    public int getAuthorId() {
        return authorId;
    }

    public void setAuthorId(int authorId) {
        this.authorId = authorId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getRecipeDifficulty() {
        return recipeDifficulty;
    }

    public void setRecipeDifficulty(int recipeDifficulty) {
        this.recipeDifficulty = recipeDifficulty;
    }

    public int getFavourites() {
        return favourites;
    }

    public void setFavourites(int favourites) {
        this.favourites = favourites;
    }

    public List<String> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<String> ingredients) {
        this.ingredients = ingredients;
    }

    public List<String> getInstructions() {
        return instructions;
    }

    public void setInstructions(List<String> instructions) {
        this.instructions = instructions;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    // toString for debugging
    @Override
    public String toString() {
        return "Recipe [rid=" + rid + ", authorId=" + authorId + ", title=" + title + ", recipeDifficulty="
                + recipeDifficulty + ", favourites=" + favourites + ", ingredients=" + ingredients + ", instructions="
                + instructions + ", tags=" + tags + "]";
    }

}