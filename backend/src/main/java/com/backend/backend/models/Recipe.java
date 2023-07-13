package com.backend.backend.models;

import java.util.ArrayList;
import java.util.List;


import jakarta.persistence.*;

@Entity
@Table(name = "recipes")
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int uid;
    
    private int authorId;
    private String title;
    private int recipeDifficulty;
    private int likes = 0;
    private int dislikes = 0;
    @ElementCollection
    private List<String> ingredients = new ArrayList<String>();
    @ElementCollection
    private List<String> instructions = new ArrayList<String>();
    @ElementCollection
    private List<String> tags = new ArrayList<String>();
    @ElementCollection
    private List<String> comments = new ArrayList<String>();

    
    public Recipe() {

    }
    public Recipe(int authorId, String title, int recipeDifficulty, List<String> ingredients, List<String> instructions, List<String> tags) {
        this.authorId = authorId;
        this.title = title;
        this.recipeDifficulty = recipeDifficulty;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.tags = tags;
    }
    public int getuid() {
        return uid;
    }
    public void setuid(int uid) {
        this.uid = uid;
    }
    public List<String> getTags() {
        return tags;
    }
    public void setTags(List<String> tags) {
        this.tags = tags;
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
    public int getLikes() {
        return likes;
    }
    public void setLikes(int likes) {
        this.likes = likes;
    }
    public int getDislikes() {
        return dislikes;
    }
    public void setDislikes(int dislikes) {
        this.dislikes = dislikes;
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
    public int getRecipeDifficulty() {
        return recipeDifficulty;
    }
    public void setRecipeDifficulty(int recipeDifficulty) {
        this.recipeDifficulty = recipeDifficulty;
    }
    public List<String> getComments() {
        return comments;
    }
    public void setComments(List<String> comments) {
        this.comments = comments;
    }
}