package com.uniterra.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.uniterra.model.view;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface viewRepository extends JpaRepository<view, Integer>{
    //consultas
    @Query(value =
            "SELECT SUM(v.amount_car_in) AS totalCar_in, " +
            "SUM(v.amount_truck_in) AS totalTruck_in, " +
            "SUM(v.amount_bus_in) AS totalBus_in, " +
            "SUM(v.amount_motorbike_in) AS totalMotorbike_in, " +
            "SUM(v.amount_bike_in) AS totalBike_in, " +
            "SUM(v.amount_people_in) AS totalPeople_in, " +
            "SUM(v.amount_car_out) AS totalCar_out, " +
            "SUM(v.amount_truck_out) AS totalTruck_out, " +
            "SUM(v.amount_bus_out) AS totalBus_out, " +
            "SUM(v.amount_motorbike_out) AS totalMotorbike_out, " +
            "SUM(v.amount_bike_out) AS totalBike_out, " +
            "SUM(v.amount_people_out) AS totalPeople_out " +
            "FROM view v WHERE DATE(v.start) = CURDATE() AND v.camera_id = :camera", nativeQuery = true)
    List<Object[]> findTodayViews(@Param("camera") int camera);

    @Query(value =
            "SELECT SUM(v.amount_car_in) AS totalCar_in, " +
                    "SUM(v.amount_truck_in) AS totalTruck_in, " +
                    "SUM(v.amount_bus_in) AS totalBus_in, " +
                    "SUM(v.amount_motorbike_in) AS totalMotorbike_in, " +
                    "SUM(v.amount_bike_in) AS totalBike_in, " +
                    "SUM(v.amount_people_in) AS totalPeople_in, " +
                    "SUM(v.amount_car_out) AS totalCar_out, " +
                    "SUM(v.amount_truck_out) AS totalTruck_out, " +
                    "SUM(v.amount_bus_out) AS totalBus_out, " +
                    "SUM(v.amount_motorbike_out) AS totalMotorbike_out, " +
                    "SUM(v.amount_bike_out) AS totalBike_out, " +
                    "SUM(v.amount_people_out) AS totalPeople_out " +
                    "FROM view v WHERE DATE(v.start) BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE() AND v.camera_id = :camera", nativeQuery = true)
    List<Object[]> findWeekViews(@Param("camera") int camera);

    @Query(value =
            "SELECT SUM(v.amount_car_in) AS totalCar_in, " +
                    "SUM(v.amount_truck_in) AS totalTruck_in, " +
                    "SUM(v.amount_bus_in) AS totalBus_in, " +
                    "SUM(v.amount_motorbike_in) AS totalMotorbike_in, " +
                    "SUM(v.amount_bike_in) AS totalBike_in, " +
                    "SUM(v.amount_people_in) AS totalPeople_in, " +
                    "SUM(v.amount_car_out) AS totalCar_out, " +
                    "SUM(v.amount_truck_out) AS totalTruck_out, " +
                    "SUM(v.amount_bus_out) AS totalBus_out, " +
                    "SUM(v.amount_motorbike_out) AS totalMotorbike_out, " +
                    "SUM(v.amount_bike_out) AS totalBike_out, " +
                    "SUM(v.amount_people_out) AS totalPeople_out " +
                    "FROM view v WHERE DATE(v.start) BETWEEN DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND CURDATE() AND v.camera_id = :camera", nativeQuery = true)
    List<Object[]> findMonthViews(@Param("camera") int camera);

    @Query(value =
            "SELECT " +
                    "    wd.day_of_week, " +
                    "    COALESCE(SUM(v.amount_car_in), 0) AS totalCar_in, " +
                    "    COALESCE(SUM(v.amount_truck_in), 0) AS totalTruck_in, " +
                    "    COALESCE(SUM(v.amount_bus_in), 0) AS totalBus_in, " +
                    "    COALESCE(SUM(v.amount_motorbike_in), 0) AS totalMotorbike_in, " +
                    "    COALESCE(SUM(v.amount_bike_in), 0) AS totalBike_in, " +
                    "    COALESCE(SUM(v.amount_people_in), 0) AS totalPeople_in, " +
                    "    COALESCE(SUM(v.amount_car_out), 0) AS totalCar_out, " +
                    "    COALESCE(SUM(v.amount_truck_out), 0) AS totalTruck_out, " +
                    "    COALESCE(SUM(v.amount_bus_out), 0) AS totalBus_out, " +
                    "    COALESCE(SUM(v.amount_motorbike_out), 0) AS totalMotorbike_out, " +
                    "    COALESCE(SUM(v.amount_bike_out), 0) AS totalBike_out, " +
                    "    COALESCE(SUM(v.amount_people_out), 0) AS totalPeople_out " +
                    "FROM ( " +
                    "    SELECT 'Monday' AS day_of_week " +
                    "    UNION SELECT 'Tuesday' " +
                    "    UNION SELECT 'Wednesday' " +
                    "    UNION SELECT 'Thursday' " +
                    "    UNION SELECT 'Friday' " +
                    "    UNION SELECT 'Saturday' " +
                    "    UNION SELECT 'Sunday' " +
                    ") wd " +
                    "LEFT JOIN view v " +
                    "    ON DAYNAME(v.start) = wd.day_of_week " +
                    "    AND DATE(v.start) BETWEEN " +
                    "        DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY) " +
                    "        AND DATE_ADD(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 6 DAY) " +
                    "    AND v.camera_id = :camera " +
                    "GROUP BY wd.day_of_week " +
                    "ORDER BY FIELD(wd.day_of_week, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');", nativeQuery = true)
    List<Object[]> findWeekViewsPerDay(@Param("camera") int camera);

    @Query(value =
            "SELECT h.hora, " +
                    "COALESCE(SUM(v.amount_car_in + v.amount_truck_in + v.amount_motorbike_in + v.amount_bike_in + v.amount_people_in), 0) AS totalAmountIn, " +
                    "COALESCE(SUM(v.amount_car_out + v.amount_truck_out + v.amount_motorbike_out + v.amount_bike_out + v.amount_people_out), 0) AS totalAmountOut " +
                    "FROM (SELECT 6 AS hora UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL " +
                    "SELECT 10 UNION ALL SELECT 11 UNION ALL SELECT 12 UNION ALL SELECT 13 UNION ALL " +
                    "SELECT 14 UNION ALL SELECT 15 UNION ALL SELECT 16 UNION ALL SELECT 17 UNION ALL " +
                    "SELECT 18 UNION ALL SELECT 19 UNION ALL SELECT 20 UNION ALL SELECT 21 UNION ALL SELECT 22) h " +
                    "LEFT JOIN view AS v ON HOUR(v.start) = h.hora " +
                    "AND DATE(v.start) = CURDATE() AND v.camera_id = :camera " +
                    "GROUP BY h.hora ORDER BY h.hora", nativeQuery = true)
    List<Object[]> findTodayViewsPerHour(@Param("camera") int camera);

}
