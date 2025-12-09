package com.uniterra.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.uniterra.model.camera;
import com.uniterra.repository.cameraRepository;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cameras")
public class cameraController {

    @Autowired
    private cameraRepository cameraRepository;

    // Obtener todos los registros
    @GetMapping
    public List<camera> getAllCameras() {
        return cameraRepository.findAll();
    }

    // Obtener un registro por su ID
    @GetMapping("/{id}")
    public Optional<camera> getCameraById(@PathVariable int id) {
        return cameraRepository.findById(id);
    }

    // Crear un nuevo registro
    @PostMapping
    public camera createCamera(@RequestBody camera newCamera) {
        return cameraRepository.save(newCamera);
    }

    // Actualizar un registro
    @PutMapping("/{id}")
    public camera updateCamera(@PathVariable int id, @RequestBody camera updatedCamera) {
        updatedCamera.setCameraId(id);  // Establecer el ID para la actualización
        return cameraRepository.save(updatedCamera);
    }

    // Eliminar un registro
    @DeleteMapping("/{id}")
    public void deleteCamera(@PathVariable int id) {
        cameraRepository.deleteById(id);
    }
}
