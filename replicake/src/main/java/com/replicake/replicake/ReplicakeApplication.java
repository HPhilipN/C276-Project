package com.replicake.replicake;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class ReplicakeApplication {
    static String db_url, db_username, db_password;

    public static void main(String[] args) {
        envVariables();
        SpringApplication.run(ReplicakeApplication.class, args);
    }

    private static void envVariables(){
        Dotenv dotenv = Dotenv.load();

        // Access environment variables
        db_url = dotenv.get("DATABASE_URL");
        db_username = dotenv.get("DATABASE_USERNAME");
        db_password = dotenv.get("DATABASE_PASSWORD");

        System.out.println(db_url);
        System.out.println(db_username);
        System.out.println(db_password);
    }
}
