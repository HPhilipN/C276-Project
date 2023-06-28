package com.replicake.replicake;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class ReplicakeApplication {

    public static void main(String[] args) {
        SpringApplication.run(ReplicakeApplication.class, args);

        Dotenv dotenv = Dotenv.load();

        // Access environment variables
        String db_url = dotenv.get("DATABASE_URL");
        String db_username = dotenv.get("DATABASE_USERNAME");
        String db_password = dotenv.get("DATABASE_PASSWORD");

        System.out.println(db_url);
        System.out.println(db_username);
        System.out.println(db_password);
    }

}
