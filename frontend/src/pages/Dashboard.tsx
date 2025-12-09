import React, { useState, useEffect } from 'react';
import ChartCamera from '../components/Charts/ChartCamera';
import ChartLocation from '../components/Charts/ChartLocation';
import ChartWeather from '../components/Charts/ChartWeather';
import CardDataStats from '@/components/CardDataStats';
import CarIcon from '@/images/icon/icon-car.svg';
import BusIcon from '@/images/icon/icon-bus.svg';
import TruckIcon from '@/images/icon/icon-truck.svg';
import MotorcycleIcon from '@/images/icon/icon-motorcycle.svg';
import ChartHourlyTrafficFlow from '@/components/Charts/ChartHourlyTrafficFlow';
import ChartPeakTraffic from '@/components/Charts/ChartPeakTraffic';
import ChartTrafficVolume from '@/components/Charts/ChartTrafficVolume';
import ChartVehicleDistribution from '@/components/Charts/ChartVehicleDistribution';

const Dashboard: React.FC = () => {
  const [cameraId, setCameraId] = useState<number>(1);
  const [vehicleData, setVehicleData] = useState<any>({});
  const [coordinates, setCoordinates] = useState<{ latitude: number, longitude: number }>({ latitude: 0, longitude: 0 });

  const handleTimeFrameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(event.target.value);
    setCameraId(selectedValue);
  };

  //consulta para obtener coordenadas de la cámara
  useEffect(() => {
    fetch(`http://localhost:8080/cameras/${cameraId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const [lat, lon] = data.coordinates?.split(',').map((coord: string) => parseFloat(coord.trim())) || [0, 0];
        setCoordinates({ latitude: lat, longitude: lon });
      })
      .catch((error) => {
        console.error('Error fetching camera data:', error);
      });
  }, [cameraId]);

  //Consulta para el Distribución de tráfico
  useEffect(() => {
    fetch(`http://localhost:8080/views/views-today/${cameraId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setVehicleData({
          totalCarIn: data.totalCar_in || 0,
          totalBusIn: data.totalBus_in || 0,
          totalTruckIn: data.totalTruck_in || 0,
          totalMotorbikeIn: data.totalMotorbike_in || 0,
          totalCarOut: data.totalCar_out || 0,
          totalBusOut: data.totalBus_out || 0,
          totalTruckOut: data.totalTruck_out || 0,
          totalMotorbikeOut: data.totalMotorbike_out || 0,
        });

      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [cameraId]);

  const {
    totalCarIn,
    totalBusIn,
    totalTruckIn,
    totalMotorbikeIn,
    totalCarOut,
    totalBusOut,
    totalTruckOut,
    totalMotorbikeOut,
  } = vehicleData;

  const totalCar = (totalCarIn || 0) + (totalCarOut || 0);
  const totalBus = (totalBusIn || 0) + (totalBusOut || 0);
  const totalTruck = (totalTruckIn || 0) + (totalTruckOut || 0);
  const totalMotorbike = (totalMotorbikeIn || 0) + (totalMotorbikeOut || 0);


  return (
    <>
      <div className="flex items-center justify-start mb-4">
        <h4 className="text-xl font-semibold mr-3 text-black dark:text-white">
          Cambiar Cámara
        </h4>
        <select
          className="rounded px-2 py-1 text-sm text-gray-700 dark:bg-boxdark dark:text-white dark:border-strokedark"
          value={cameraId}
          onChange={handleTimeFrameChange}
        >
          <option value={1}>Cámara 1</option>
          <option value={2}>Cámara 2</option>
          <option value={3}>Cámara 3</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 text-black dark:text-white">
        <CardDataStats
          title="Autos"
          total={totalCar}
          rate="+5% desde ayer"
          levelUp>
          <img src={CarIcon}
            alt="Icono de Autos"
            className="h-6 w-6" />
        </CardDataStats>

        <CardDataStats
          title="Transporte Público"
          total={totalBus}
          rate="+3% desde la semana pasada"
          levelUp
        >
          <img
            src={BusIcon}
            alt="Icono de transporte Público"
            className="h-6 w-6"
          />
        </CardDataStats>

        <CardDataStats
          title="Transporte de Carga"
          total={totalTruck}
          rate="-2% desde el último trimestre"
          levelDown
        >
          <img
            src={TruckIcon}
            alt="Icono de Transporte de Carga"
            className="h-6 w-6"
          />
        </CardDataStats>

        <CardDataStats
          title="Motocicletas"
          total={totalMotorbike}
          rate="+5% desde el último mes"
          levelUp
        >
          <img
            src={MotorcycleIcon}
            alt="Icono de Motocicleta"
            className="h-6 w-6"
          />
        </CardDataStats>
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartCamera />
        {/*<ChartLocation latitude={coordinates.latitude} longitude={coordinates.longitude}/>*/}
        <ChartWeather />
        <ChartHourlyTrafficFlow camera={cameraId}/>
        <ChartVehicleDistribution camera={cameraId} />
        <ChartTrafficVolume camera={cameraId}/>
        <ChartPeakTraffic />
        
        
      </div>
    </>
  );
};

export default Dashboard;
