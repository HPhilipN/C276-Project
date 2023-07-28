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
    private String authorName;
    private String title;
    private int recipeDifficulty;
    private int prepTime;
    @ElementCollection
    private List<String> ingredients = new ArrayList<String>();
    @ElementCollection
    private List<String> instructions = new ArrayList<String>();
    @ElementCollection
    private List<String> tags = new ArrayList<String>();

    // Constructors
    public Recipe() {
    }

    public Recipe(int authorId, String authorName, String title, int recipeDifficulty, int prepTime,
            List<String> ingredients, List<String> instructions, List<String> tags) {
        this.authorId = authorId;
        this.authorName = authorName;
        this.title = title;
        this.recipeDifficulty = recipeDifficulty;
        this.prepTime = prepTime;
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

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public int getRecipeDifficulty() {
        return recipeDifficulty;
    }

    public void setRecipeDifficulty(int recipeDifficulty) {
        this.recipeDifficulty = recipeDifficulty;
    }

    public int getPrepTime() {
        return prepTime;
    }

    public void setPrepTime(int prepTime) {
        this.prepTime = prepTime;
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
                + recipeDifficulty + ", prepTime=" + prepTime + ", ingredients=" + ingredients + ", instructions="
                + instructions + ", tags=" + tags + "]";
    }

}