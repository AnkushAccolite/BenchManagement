package com.accolite.benchManagement.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class FileRepository<T> {
    private final File file;
    private final ObjectMapper objectMapper;
    private final TypeReference<List<T>> typeReference;

    public FileRepository(String fileName, TypeReference<List<T>> typeReference) {
        this.file = new File(fileName);
        this.objectMapper = new ObjectMapper();
        this.typeReference = typeReference;

        // Ensure the file exists
        if (!file.exists()) {
            try {
                file.createNewFile();
                objectMapper.writeValue(file, new ArrayList<T>());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public List<T> findAll() {
        try {
            return objectMapper.readValue(file, typeReference);
        } catch (IOException e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    public Optional<T> findById(String id) {
        return findAll().stream().filter(entity -> {
            try {
                // Reflection or method to get the ID of the object
                return entity.getClass().getMethod("getId").invoke(entity).equals(id);
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
        }).findFirst();
    }

    public void save(T entity) {
        List<T> entities = findAll();
        entities.add(entity);
        writeToFile(entities);
    }

    public void delete(T entity) {
        List<T> entities = findAll();
        entities.remove(entity);
        writeToFile(entities);
    }

    public void update(T updatedEntity) {
        List<T> entities = findAll();

        // Get the ID of the updated entity
        String updatedEntityId;
        try {
            updatedEntityId = (String) updatedEntity.getClass().getMethod("getId").invoke(updatedEntity);
        } catch (Exception e) {
            e.printStackTrace();
            return; // Exit if we can't get the ID
        }

        // Find the index of the existing entity
        int index = -1;
        for (int i = 0; i < entities.size(); i++) {
            try {
                // Compare IDs of the entities to find the one to update
                String entityId = (String) entities.get(i).getClass().getMethod("getId").invoke(entities.get(i));
                if (entityId.equals(updatedEntityId)) {
                    index = i; // Found the entity to update
                    break; // Exit the loop
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        // If the entity exists, update it
        if (index != -1) {
            entities.set(index, updatedEntity); // Replace the existing entity with the updated one
            writeToFile(entities); // Write back to the file after updating
        } else {
            // If not found, you might want to handle it, e.g., log or throw an exception
            System.out.println("Entity not found for update: " + updatedEntity);
        }
    }



    private void writeToFile(List<T> entities) {
        try {
            objectMapper.writeValue(file, entities);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

