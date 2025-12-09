import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

type ChartTrafficVolumeProps = {
  camera: number;
};

const options: ApexOptions = {
  colors: ['#3C50E0', '#80CAEE'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'bar',
    height: 335,
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: '25%',
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      columnWidth: '25%',
      borderRadiusApplication: 'end',
      borderRadiusWhenStacked: 'last',
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: ['L', 'M', 'I', 'J', 'V', 'S', 'D'],
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    fontFamily: 'Satoshi',
    fontWeight: 500,
    fontSize: '14px',
    markers: {
      radius: 99,
    },
  },
  fill: {
    opacity: 1,
  },
};

interface DayData {
  day_of_week: string;
  totalCar_in: number;
  totalCar_out: number;
  totalTruck_in: number;
  totalTruck_out: number;
  totalBus_in: number;
  totalBus_out: number;
  totalMotorbike_in: number;
  totalMotorbike_out: number;
  totalBike_in: number;
  totalBike_out: number;
  totalPeople_in: number;
  totalPeople_out: number;
}

interface ChartTrafficVolume {
  series: {
    name: string;
    data: number[];
  }[]; 
}

const ChartTrafficVolume: React.FC<ChartTrafficVolumeProps> = ({ camera }) => {
  const [series, setSeries] = useState([
    {
      name: 'Transportes de Carga',
      data: [0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: 'Autos',
      data: [0, 0, 0, 0, 0, 0, 0],
    },
  ]);

  useEffect(() => {
    const fetchData = () => {
      fetch(`http://localhost:8080/views/views-week-perDay/${camera}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data: Record<string, DayData>) => {
          const weekData = {
            Monday: 0,
            Tuesday: 1,
            Wednesday: 2,
            Thursday: 3,
            Friday: 4,
            Saturday: 5,
            Sunday: 6,
          };

          const newSeries = [
            { name: 'Transportes de Carga', data: [0, 0, 0, 0, 0, 0, 0] },
            { name: 'Autos', data: [0, 0, 0, 0, 0, 0, 0] },
          ];

          Object.keys(data).forEach((day) => {
            const dayData = data[day];
            const dayIndex = weekData[day as keyof typeof weekData];
            const carTotal = dayData.totalCar_in + dayData.totalCar_out;
            const truckTotal = dayData.totalTruck_in + dayData.totalTruck_out;
            const bikeTotal = dayData.totalBike_in + dayData.totalBike_out;
            const motorbikeTotal = dayData.totalMotorbike_in + dayData.totalMotorbike_out;
            const peopleTotal = dayData.totalPeople_in + dayData.totalPeople_out;
            const busTotal = dayData.totalBus_in + dayData.totalBus_out;

            newSeries[0].data[dayIndex] = truckTotal; // Transportes de Carga
            newSeries[1].data[dayIndex] = carTotal; // Autos
          });

          setSeries(newSeries); // Actualizamos el estado
        })
        .catch((error) => {
          console.error('Error fetching camera data:', error);
        });
    };

    fetchData();
  }, [camera]); // Dependemos de la cámara para actualizar los datos

  return (
    <div className="col-span-12 rounded-lg bg-white shadow-lg p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Volumen de Tráfico
          </h4>
        </div>
        <div>
          <div className="relative z-20 inline-block">
            <select
              name="#"
              id="#"
              className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none"
            >
              // <option value="" className="dark:bg-boxdark">Esta semana</option>
              // <option value="" className="dark:bg-boxdark">Semana pasada</option>
            </select>
            <span className="absolute top-1/2 right-3 z-10 -translate-y-1/2">
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.47072 1.08816C0.47072 1.02932 0.500141 0.955772 0.54427 0.911642C0.647241 0.808672 0.809051 0.808672 0.912022 0.896932L4.85431 4.60386C4.92785 4.67741 5.06025 4.67741 5.14851 4.60386L9.09079 0.896932C9.19376 0.793962 9.35557 0.808672 9.45854 0.911642C9.56151 1.01461 9.5468 1.17642 9.44383 1.27939L5.50155 4.98632C5.22206 5.23639 4.78076 5.23639 4.51598 4.98632L0.558981 1.27939C0.50014 1.22055 0.47072 1.16171 0.47072 1.08816Z"
                  fill="#637381"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-ml-5 -mb-9">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartTrafficVolume;
