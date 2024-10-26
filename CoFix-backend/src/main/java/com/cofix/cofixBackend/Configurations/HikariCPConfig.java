package com.cofix.cofixBackend.Configurations;


import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import com.zaxxer.hikari.HikariDataSource;

import java.util.Base64;

@Configuration
@Slf4j
public class HikariCPConfig {


    @Autowired
    Environment env;


    @Bean
    public HikariDataSource postgresdbDataSource() {
        log.info("Initializing Postgres Database connection pool");
        String pgUser;
        String pgPassword;
        pgUser = env.getProperty("spring.postgres.datasource.username");
        pgPassword = env.getProperty("spring.postgres.datasource.password");

        //log.info("user:" + pgUser+"| pw:"+pgPassword +"|");
        HikariDataSource dataSource = new HikariDataSource();
        try {
            dataSource.setJdbcUrl(env.getProperty("spring.datasource.url"));
            dataSource.setAutoCommit(false);
            dataSource.setConnectionTimeout(30000);
            dataSource.setIdleTimeout(30000);
            dataSource.setPoolName(env.getProperty("spring.postgres.datasource.connection-pool-name"));
            dataSource.setMaximumPoolSize(25);
            dataSource.setUsername(pgUser);
            dataSource.setPassword(pgPassword);
        }
        catch (Exception e) {
            log.error("Failed to Init Postgres Database pool : ",e);
        }
        return dataSource;
    }
}
