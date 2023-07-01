package com.replicake.replicake;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
// import org.springframework.context.annotation.PropertySource;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

@Configuration
// @PropertySource("file:${user.dir}/replicake/.env")
public class AppConfig {
    
    @Value("${DATABASE_URL}")
    private String datasourceUrl;

    @Value("${DATABASE_USERNAME}")
    private String datasourceUsername;

    @Value("${DATABASE_PASSWORD}")
    private String datasourcePassword;

    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setUrl(datasourceUrl);
        dataSource.setUsername(datasourceUsername);
        dataSource.setPassword(datasourcePassword);
        // Additional configuration for your data source if needed
        return dataSource;
    }

}
