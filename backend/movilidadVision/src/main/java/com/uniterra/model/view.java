package com.uniterra.model;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "view")
public class view {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer view_id;

    @Column(name = "camera_id")
    private int camera_id;

    @Column(name = "amount_car_in")
    private int amount_car_in;

    @Column(name = "amount_truck_in")
    private int amount_truck_in;

    @Column(name = "amount_bus_in")
    private int amount_bus_in;

    @Column(name = "amount_motorbike_in")
    private int amount_motorbike_in;

    @Column(name = "amount_bike_in")
    private int amount_bike_in;

    @Column(name = "amount_people_in")
    private int amount_people_in;


    @Column(name = "amount_car_out")
    private int amount_car_out;

    @Column(name = "amount_truck_out")
    private int amount_truck_out;

    @Column(name = "amount_bus_out")
    private int amount_bus_out;

    @Column(name = "amount_motorbike_out")
    private int amount_motorbike_out;

    @Column(name = "amount_bike_out")
    private int amount_bike_out;

    @Column(name = "amount_people_out")
    private int amount_people_out;

    @Column(name = "start")
    private LocalDateTime start;

    @Column(name = "end")
    private LocalDateTime  end;

    @Column(name = "avg_speed")
    private int avg_speed;

    public Integer getView_id() {
        return view_id;
    }

    public void setView_id(Integer view_id) {
        this.view_id = view_id;
    }

    public int getCamera_id() {
        return camera_id;
    }

    public void setCamera_id(int camera_id) {
        this.camera_id = camera_id;
    }

    public int getAmount_car_in() {
        return amount_car_in;
    }

    public void setAmount_car_in(int amount_car_in) {
        this.amount_car_in = amount_car_in;
    }

    public int getAmount_truck_in() {
        return amount_truck_in;
    }

    public void setAmount_truck_in(int amount_truck_in) {
        this.amount_truck_in = amount_truck_in;
    }

    public int getAmount_bus_in() {
        return amount_bus_in;
    }

    public void setAmount_bus_in(int amount_bus_in) {
        this.amount_bus_in = amount_bus_in;
    }

    public int getAmount_motorbike_in() {
        return amount_motorbike_in;
    }

    public void setAmount_motorbike_in(int amount_motorbike_in) {
        this.amount_motorbike_in = amount_motorbike_in;
    }

    public int getAmount_bike_in() {
        return amount_bike_in;
    }

    public void setAmount_bike_in(int amount_bike_in) {
        this.amount_bike_in = amount_bike_in;
    }

    public int getAmount_people_in() {
        return amount_people_in;
    }

    public void setAmount_people_in(int amount_people_in) {
        this.amount_people_in = amount_people_in;
    }

    public int getAmount_car_out() {
        return amount_car_out;
    }

    public void setAmount_car_out(int amount_car_out) {
        this.amount_car_out = amount_car_out;
    }

    public int getAmount_truck_out() {
        return amount_truck_out;
    }

    public void setAmount_truck_out(int amount_truck_out) {
        this.amount_truck_out = amount_truck_out;
    }

    public int getAmount_bus_out() {
        return amount_bus_out;
    }

    public void setAmount_bus_out(int amount_bus_out) {
        this.amount_bus_out = amount_bus_out;
    }

    public int getAmount_motorbike_out() {
        return amount_motorbike_out;
    }

    public void setAmount_motorbike_out(int amount_motorbike_out) {
        this.amount_motorbike_out = amount_motorbike_out;
    }

    public int getAmount_bike_out() {
        return amount_bike_out;
    }

    public void setAmount_bike_out(int amount_bike_out) {
        this.amount_bike_out = amount_bike_out;
    }

    public int getAmount_people_out() {
        return amount_people_out;
    }

    public void setAmount_people_out(int amount_people_out) {
        this.amount_people_out = amount_people_out;
    }

    public LocalDateTime getStart() {
        return start;
    }

    public void setStart(LocalDateTime start) {
        this.start = start;
    }

    public LocalDateTime getEnd() {
        return end;
    }

    public void setEnd(LocalDateTime end) {
        this.end = end;
    }

    public int getAvg_speed() {
        return avg_speed;
    }

    public void setAvg_speed(int avg_speed) {
        this.avg_speed = avg_speed;
    }
}
