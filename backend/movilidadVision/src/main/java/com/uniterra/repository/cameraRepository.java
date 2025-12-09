package com.uniterra.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.uniterra.model.camera;

@Repository
public interface cameraRepository extends JpaRepository<camera, Integer> {
}
