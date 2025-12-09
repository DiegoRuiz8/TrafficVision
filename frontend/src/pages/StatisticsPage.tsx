import React, { useState } from 'react';
import TrafficAnalysisChart from '../components/Charts/TrafficAnalysisChart';

const StatisticsPage = () => {
  const availableCameras = [
    { name: 'Cámara 1', data: [150, 300, 250, 450, 350, 500, 400, 550, 400] },
    { name: 'Cámara 2', data: [200, 250, 300, 350, 275, 400, 375, 450, 475] },
    { name: 'Cámara 3', data: [180, 280, 260, 360, 390, 420, 380, 480, 510] },
    { name: 'Cámara 4', data: [160, 230, 210, 310, 290, 380, 320, 420, 380] },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-black dark:text-white">Monitoreo Vehicular</h1>
      <div className="bg-white p-6 shadow rounded mb-8 dark:border-strokedark dark:bg-boxdark">
        <h2 className="text-xl font-semibold mb-0 text-black dark:text-white">
          Análisis del Tráfico Vehicular
        </h2>
        <TrafficAnalysisChart availableCameras={availableCameras} />
      </div>
    </div>
  );
};

export default StatisticsPage;
