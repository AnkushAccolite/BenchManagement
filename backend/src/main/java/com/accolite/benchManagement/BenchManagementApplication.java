package com.accolite.benchManagement;

import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
@JaversSpringDataAuditable
public class BenchManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(BenchManagementApplication.class, args);
	}

}
