import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

interface ChartTwoState {
  series: number[];
  labels: string[];
}
type ChartVehicleDistributionProps = {
  camera: number;
};
const options: ApexOptions = {
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'donut',
  },
  colors: ['#3C50E0', '#6577F3', '#8FD0EF', '#0FADCF'],
  labels: ['Automóviles', 'Peatones', 'Transportes de Carga', 'Motocicletas'],
  legend: {
    show: false,
    position: 'bottom',
  },
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        background: 'transparent',
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

const ChartVehicleDistribution: React.FC<ChartVehicleDistributionProps> = ({ camera }) => {
  const [state, setState] = useState<ChartTwoState>({
    series: [1, 1, 1, 1], // valores por defecto
    labels: ['Automóviles', 'Peatones', 'Transportes de Carga', 'Motocicletas'],
  });

  // Función que realiza el fetch
  const fetchData = () => {
    fetch(`http://localhost:8080/views/views-today/${camera}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const totalCarIn = data.totalCar_in || 0;
        const totalPeopleIn = data.totalPeople_in || 0;
        const totalTruckIn = data.totalTruck_in || 0;
        const totalMotorbikeIn = data.totalMotorbike_in || 0;

        const totalCarOut = data.totalCar_out || 0;
        const totalPeopleOut = data.totalPeople_out || 0;
        const totalTruckOut = data.totalTruck_out || 0;
        const totalMotorbikeOut = data.totalMotorbike_out || 0;

        const totalSum = totalCarIn + totalPeopleIn + totalTruckIn + totalMotorbikeIn + totalCarOut + totalPeopleOut + totalTruckOut + totalMotorbikeOut;

        const newSeries = totalSum > 0
          ? [
            Math.round(((totalCarIn + totalCarOut) / totalSum) * 100),
            Math.round(((totalPeopleIn + totalPeopleOut) / totalSum) * 100),
            Math.round(((totalTruckIn + totalTruckOut) / totalSum) * 100),
            Math.round(((totalMotorbikeIn + totalMotorbikeOut) / totalSum) * 100),
          ]
          : [1, 1, 1, 1];

        setState((prevState) => ({
          ...prevState,
          series: newSeries,
        }));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  // Realizar la solicitud fetch cada vez que cambie la cámara 
  useEffect(() => {
    fetchData();
  }, [camera]); // Dependencias: camera 


  return (
    <div className="col-span-12 rounded-lg bg-white shadow-lg p-7.5 dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Distribución de Vehículos
          </h5>
        </div>
        <div>
          <div className="relative z-20 inline-block">
            
            <span className="absolute right-3 top-1/2 z-10 -translate-y-1/2">
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={state.series}
            type="donut"
          />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-primary"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Automóviles </span>
              <span> {state.series[0].toFixed(0)}% </span>
            </p>
          </div>
        </div>
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#6577F3]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Peatones </span>
              <span> {state.series[1].toFixed(0)}% </span>
            </p>
          </div>
        </div>
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#8FD0EF]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Transportes de Carga </span>
              <span> {state.series[2].toFixed(0)}% </span>
            </p>
          </div>
        </div>
        <div className="sm:w-1/2 w-full px-8">  
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#0FADCF]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Motocicletas </span>
              <span> {state.series[3].toFixed(0)}% </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartVehicleDistribution;
