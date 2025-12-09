package com.uniterra.model;
import jakarta.persistence.*;



@Entity
@Table(name = "camera")
public class camera {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "camera_id")
    private int cameraId;

    @Column(name = "model", nullable = false, length = 20)
    private String model;

    @Column(name = "coordinates", nullable = false, length = 50)
    private String coordinates;

    @Column(name = "status", nullable = false, length = 20)
    private String status;

    @Column(name = "last_update", nullable = false, length = 50)
    private String lastUpdate;

    @Column(name = "resolution", nullable = false, length = 50)
    private String resolution;

    @Column(name = "MAC_address", nullable = false, length = 20)
    private String macAddress;

    @Column(name = "address", nullable = false, length = 40)
    private String address;


    public int getCameraId() {
        return cameraId;
    }

    public void setCameraId(int cameraId) {
        this.cameraId = cameraId;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(String coordinates) {
        this.coordinates = coordinates;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLastUpdate() {
        return lastUpdate;
    }

    public void setLastUpdate(String lastUpdate) {
        this.lastUpdate = lastUpdate;
    }

    public String getResolution() {
        return resolution;
    }

    public void setResolution(String resolution) {
        this.resolution = resolution;
    }

    public String getMacAddress() {
        return macAddress;
    }

    public void setMacAddress(String macAddress) {
        this.macAddress = macAddress;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
