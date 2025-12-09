import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const options: ApexOptions = {
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: ['#3C50E0', '#80CAEE'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    height: 335,
    type: 'area',
    dropShadow: {
      enabled: true,
      color: '#623CEA14',
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: 'straight',
  },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: '#fff',
    strokeColors: ['#3056D3', '#80CAEE'],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: 'category',
    categories: [
      '6:00',
      '7:00',
      '8:00',
      '9:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00'
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: '0px',
      },
    },
    min: 0,
    max: 100,
  },
};

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

interface HourData {
  hour: string;
  totalAmountIn: number;
  totalAmountOut: number;
}

type ChartVehicleDistributionProps = {
  camera: number;
};

const ChartHourlyTrafficFlow: React.FC<ChartVehicleDistributionProps> = ({ camera }) => {
  const [state, setState] = useState<ChartOneState>({
    series: [
      { name: 'Flujo de Ida', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], },
      { name: 'Flujo de Vuelta', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], },
    ],
  });

  useEffect(() => {
    const fetchData = () => {
      fetch(`http://localhost:8080/views/views-today-perHour/${camera}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data: Record<string, HourData>) => {
          const hours = {
            6: 0,
            7: 1,
            8: 2,
            9: 3,
            10: 4,
            11: 5,
            12: 6,
            13: 7,
            14: 8,
            15: 9,
            16: 10,
            17: 11,
            18: 12,
            19: 13,
            20: 14,
            21: 15,
            22: 16,
          };

          const newSeries = [
            { name: 'Flujo de Ida', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
            { name: 'Flujo de Vuelta', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
          ];

          Object.keys(data).forEach((hour) => {
            const hoursData = data[hour];
            const hourIndex = hours[parseInt(hour) as keyof typeof hours];
            const totalAmountIn = hoursData.totalAmountIn;
            const totalAmountOut = hoursData.totalAmountOut;

            newSeries[0].data[hourIndex] = totalAmountIn; // Vehículos de Ida
            newSeries[1].data[hourIndex] = totalAmountOut; // Vehículos de Vuelta
          });

          setState({ series: newSeries }); // Actualizamos el estado
        })
        .catch((error) => {
          console.error('Error fetching camera data:', error);
        });
    };

    fetchData();
  }, [camera]);


  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };
  handleReset;

  return (
    <div className="col-span-12 rounded-lg bg-white shadow-lg px-5 pt-7.5 pb-5 dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="mb-4">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Flujo de Tráfico por Hora
        </h4>
      </div>
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Flujo de Ida</p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-secondary">Flujo de Vuelta</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartHourlyTrafficFlow;
