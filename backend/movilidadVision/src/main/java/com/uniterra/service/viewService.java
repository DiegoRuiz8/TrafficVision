package com.uniterra.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.uniterra.repository.viewRepository;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import static java.util.Map.entry;

@Service
public class viewService {

    @Autowired
    private viewRepository viewRepository;

    public Map<String, Long> getTodayViews(int camera) {
        List<Object[]> results = viewRepository.findTodayViews(camera);

        // Si no hay resultados, devolver todos los valores como 0L
        if (results.isEmpty() || results.get(0) == null) {
            return Map.ofEntries(
                    entry("totalCar_in", 0L),
                    entry("totalTruck_in", 0L),
                    entry("totalBus_in", 0L),
                    entry("totalMotorbike_in", 0L),
                    entry("totalBike_in", 0L),
                    entry("totalPeople_in", 0L),
                    entry("totalCar_out", 0L),
                    entry("totalTruck_out", 0L),
                    entry("totalBus_out", 0L),
                    entry("totalMotorbike_out", 0L),
                    entry("totalBike_out", 0L),
                    entry("totalPeople_out", 0L)
            );
        }

        Object[] row = results.get(0);

        return Map.ofEntries(
                entry("totalCar_in", safeLongValue(row, 0)),
                entry("totalTruck_in", safeLongValue(row, 1)),
                entry("totalBus_in", safeLongValue(row, 2)),
                entry("totalMotorbike_in", safeLongValue(row, 3)),
                entry("totalBike_in", safeLongValue(row, 4)),
                entry("totalPeople_in", safeLongValue(row, 5)),
                entry("totalCar_out", safeLongValue(row, 6)),
                entry("totalTruck_out", safeLongValue(row, 7)),
                entry("totalBus_out", safeLongValue(row, 8)),
                entry("totalMotorbike_out", safeLongValue(row, 9)),
                entry("totalBike_out", safeLongValue(row, 10)),
                entry("totalPeople_out", safeLongValue(row, 11))
        );
    }

    public Map<String, Long> getWeekViews(int camera) {
        List<Object[]> results = viewRepository.findWeekViews(camera);

        // Si no hay resultados, devolver todos los valores como 0L
        if (results.isEmpty() || results.get(0) == null) {
            return Map.ofEntries(
                    entry("totalCar_in", 0L),
                    entry("totalTruck_in", 0L),
                    entry("totalBus_in", 0L),
                    entry("totalMotorbike_in", 0L),
                    entry("totalBike_in", 0L),
                    entry("totalPeople_in", 0L),
                    entry("totalCar_out", 0L),
                    entry("totalTruck_out", 0L),
                    entry("totalBus_out", 0L),
                    entry("totalMotorbike_out", 0L),
                    entry("totalBike_out", 0L),
                    entry("totalPeople_out", 0L)
            );
        }

        Object[] row = results.get(0);

        return Map.ofEntries(
                entry("totalCar_in", safeLongValue(row, 0)),
                entry("totalTruck_in", safeLongValue(row, 1)),
                entry("totalBus_in", safeLongValue(row, 2)),
                entry("totalMotorbike_in", safeLongValue(row, 3)),
                entry("totalBike_in", safeLongValue(row, 4)),
                entry("totalPeople_in", safeLongValue(row, 5)),
                entry("totalCar_out", safeLongValue(row, 6)),
                entry("totalTruck_out", safeLongValue(row, 7)),
                entry("totalBus_out", safeLongValue(row, 8)),
                entry("totalMotorbike_out", safeLongValue(row, 9)),
                entry("totalBike_out", safeLongValue(row, 10)),
                entry("totalPeople_out", safeLongValue(row, 11))
        );
    }

    public Map<String, Long> getMonthViews(int camera) {
        List<Object[]> results = viewRepository.findMonthViews(camera);

        // Si no hay resultados, devolver todos los valores como 0L
        if (results.isEmpty() || results.get(0) == null) {
            return Map.ofEntries(
                    entry("totalCar_in", 0L),
                    entry("totalTruck_in", 0L),
                    entry("totalBus_in", 0L),
                    entry("totalMotorbike_in", 0L),
                    entry("totalBike_in", 0L),
                    entry("totalPeople_in", 0L),
                    entry("totalCar_out", 0L),
                    entry("totalTruck_out", 0L),
                    entry("totalBus_out", 0L),
                    entry("totalMotorbike_out", 0L),
                    entry("totalBike_out", 0L),
                    entry("totalPeople_out", 0L)
            );
        }

        Object[] row = results.get(0);

        return Map.ofEntries(
                entry("totalCar_in", safeLongValue(row, 0)),
                entry("totalTruck_in", safeLongValue(row, 1)),
                entry("totalBus_in", safeLongValue(row, 2)),
                entry("totalMotorbike_in", safeLongValue(row, 3)),
                entry("totalBike_in", safeLongValue(row, 4)),
                entry("totalPeople_in", safeLongValue(row, 5)),
                entry("totalCar_out", safeLongValue(row, 6)),
                entry("totalTruck_out", safeLongValue(row, 7)),
                entry("totalBus_out", safeLongValue(row, 8)),
                entry("totalMotorbike_out", safeLongValue(row, 9)),
                entry("totalBike_out", safeLongValue(row, 10)),
                entry("totalPeople_out", safeLongValue(row, 11))
        );
    }

    private long safeLongValue(Object[] row, int index) {
        if (row == null || index >= row.length || row[index] == null) {
            return 0L;
        }
        return ((Number) row[index]).longValue();
    }

    public Map<String, Map<String, Long>> getWeekViewsPerDay(int camera) {
        List<Object[]> results = viewRepository.findWeekViewsPerDay(camera);

        // Si no hay resultados, devolver todos los valores como 0L
        if (results.isEmpty()) {
            return getDefaultViewMapDays();
        }

        Map<String, Map<String, Long>> dayViewsMap = new LinkedHashMap<>();
        for (Object[] row : results) {
            String dayOfWeek = row[0].toString();  // Asegúrate que esto sea un String
            if (isValidDay(dayOfWeek)) {  // Verifica que solo sea un día de la semana
                dayViewsMap.put(dayOfWeek, Map.ofEntries(
                        entry("totalCar_in", safeLongValue(row, 1)),
                        entry("totalTruck_in", safeLongValue(row, 2)),
                        entry("totalBus_in", safeLongValue(row, 3)),
                        entry("totalMotorbike_in", safeLongValue(row, 4)),
                        entry("totalBike_in", safeLongValue(row, 5)),
                        entry("totalPeople_in", safeLongValue(row, 6)),
                        entry("totalCar_out", safeLongValue(row, 7)),
                        entry("totalTruck_out", safeLongValue(row, 8)),
                        entry("totalBus_out", safeLongValue(row, 9)),
                        entry("totalMotorbike_out", safeLongValue(row, 10)),
                        entry("totalBike_out", safeLongValue(row, 11)),
                        entry("totalPeople_out", safeLongValue(row, 12))
                ));
            }
        }
        return dayViewsMap;
    }

    private boolean isValidDay(String day) {
        return day.equals("Monday") || day.equals("Tuesday") || day.equals("Wednesday") ||
                day.equals("Thursday") || day.equals("Friday") || day.equals("Saturday") || day.equals("Sunday");
    }

    private Map<String, Map<String, Long>> getDefaultViewMapDays() {
        Map<String, Map<String, Long>> defaultMap = new LinkedHashMap<>();
        String[] daysOfWeek = {"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"};
        for (String day : daysOfWeek) {
            defaultMap.put(day, Map.ofEntries(
                    entry("totalCar_in", 0L),
                    entry("totalTruck_in", 0L),
                    entry("totalBus_in", 0L),
                    entry("totalMotorbike_in", 0L),
                    entry("totalBike_in", 0L),
                    entry("totalPeople_in", 0L),
                    entry("totalCar_out", 0L),
                    entry("totalTruck_out", 0L),
                    entry("totalBus_out", 0L),
                    entry("totalMotorbike_out", 0L),
                    entry("totalBike_out", 0L),
                    entry("totalPeople_out", 0L)
            ));
        }
        return defaultMap;
    }

    public Map<String, Map<String, Long>> getTodayViewsPerHour(int camera) {
        List<Object[]> results = viewRepository.findTodayViewsPerHour(camera);

        // Si no hay resultados, devolver todos los valores como 0L
        if (results.isEmpty()) {
            return getDefaultViewMapHour();
        }

        Map<String, Map<String, Long>> hourViewsMap = new LinkedHashMap<>();
        for (Object[] row : results) {
            String hourOfWeek = row[0].toString();  // Asegúrate que esto sea un String
            hourViewsMap.put(hourOfWeek, Map.ofEntries(
                    entry("totalAmountIn", safeLongValue(row, 1)),
                    entry("totalAmountOut", safeLongValue(row, 2))
            ));
        }
        return hourViewsMap;
    }

    private Map<String, Map<String, Long>> getDefaultViewMapHour() {
        Map<String, Map<String, Long>> defaultMap = new LinkedHashMap<>();
        String[] hours = {"6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"};
        for (String hour : hours) {
            defaultMap.put(hour, Map.ofEntries(
                    entry("totalAmountIn", 0L),
                    entry("totalAmountOut", 0L)
            ));
        }
        return defaultMap;
    }
}
