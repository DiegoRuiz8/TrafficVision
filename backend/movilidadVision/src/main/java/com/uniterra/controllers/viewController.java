package com.uniterra.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.uniterra.model.view;
import com.uniterra.service.viewService;
import com.uniterra.repository.viewRepository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/views")
public class viewController {

    @Autowired
    private viewRepository viewRepository;

    @Autowired
    private viewService viewService;  // Inyectar viewService

    // Obtener todos los registros
    @GetMapping
    public List<view> getAllViews() {
        return viewRepository.findAll();
    }

    // Obtener un registro por su ID
    @GetMapping("/{id}")
    public Optional<view> getViewById(@PathVariable int id) {
        return viewRepository.findById(id);
    }

    // Crear un nuevo registro
    @PostMapping
    public view createView(@RequestBody view newView) {
        return viewRepository.save(newView);
    }

    // Actualizar un registro
    @PutMapping("/{id}")
    public view updateView(@PathVariable int id, @RequestBody view updatedView) {
        updatedView.setView_id(id);  // Establecer el ID para la actualización
        return viewRepository.save(updatedView);
    }

    // Eliminar un registro
    @DeleteMapping("/{id}")
    public void deleteView(@PathVariable int id) {
        viewRepository.deleteById(id);
    }
    //Sumas totales de vehiculos
    // Obtener suma total de vehiculos de hoy
    @GetMapping("/views-today/{camera}")
    public ResponseEntity<Map<String, Long>> getTodayViews(@PathVariable int camera) {
        return ResponseEntity.ok(viewService.getTodayViews(camera));  // Llamar al metodo del servicio
    }
    // Obtener suma total de vehiculos de una semana
    @GetMapping("/views-week/{camera}")
    public ResponseEntity<Map<String, Long>> getWeekViews(@PathVariable int camera) {
        return ResponseEntity.ok(viewService.getWeekViews(camera));  // Llamar al metodo del servicio
    }
    // Obtener suma total de vehiculos del mes
    @GetMapping("/views-month/{camera}")
    public ResponseEntity<Map<String, Long>> getMonthViews(@PathVariable int camera) {
        return ResponseEntity.ok(viewService.getMonthViews(camera));  // Llamar al metodo del servicio
    }

    //Obtener suma total por día de una semana
    @GetMapping("/views-week-perDay/{camera}")
    public ResponseEntity<Map<String, Map<String, Long>>> getWeekPerDays(@PathVariable int camera){
        return ResponseEntity.ok(viewService.getWeekViewsPerDay(camera));
    }

    //Obtener suma total por día por hora
    @GetMapping("/views-today-perHour/{camera}")
    public ResponseEntity<Map<String, Map<String, Long>>> getTodayPerHour(@PathVariable int camera){
        return ResponseEntity.ok(viewService.getTodayViewsPerHour(camera));
    }
}
