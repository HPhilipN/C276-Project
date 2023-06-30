package com.replicake.replicake;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class ReplicakeApplication {

    public static void main(String[] args) {
        loadEnvVariables();
        SpringApplication.run(ReplicakeApplication.class, args);
    }

    private static void loadEnvVariables() {
        Dotenv dotenv = Dotenv.configure().load();
        System.setProperty("DATABASE_URL", dotenv.get("DATABASE_URL"));
        System.setProperty("DATABASE_USERNAME", dotenv.get("DATABASE_USERNAME"));
        System.setProperty("DATABASE_PASSWORD", dotenv.get("DATABASE_PASSWORD"));
    }
}
