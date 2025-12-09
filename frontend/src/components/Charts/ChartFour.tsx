import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const options: ApexOptions = {
  chart: {
    height: 350,
    type: 'radar',
    fontFamily: 'Satoshi, sans-serif',
    toolbar: {
        show: false, 
      },
  },
  colors: ['#3C50E0'],
  markers: {
    size: 4,
    colors: ['#fff'],
    strokeColors: '#4062d6',
    strokeWidth: 2,
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val + ' vehículos';
      },
    },
  },
  xaxis: {
    categories: ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'],
    labels: {
        style: {
          colors: '#637381',
          fontSize: '12px', 
          fontWeight: 500, 
          fontFamily: 'Satoshi, sans-serif', 
        },
      },
  },
  fill: {
    opacity: 0.4,
  },
  stroke: {
    width: 2,
  },
  legend: {
    position: 'top',
  },
};

interface ChartPeakHoursState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ChartFour: React.FC = () => {
  const [state] = useState<ChartPeakHoursState>({
    series: [
      {
        name: 'Vehículos',
        data: [45, 80, 30, 70, 120, 45], 
      },
    ],
  });

  return (
    <div className="col-span-12 rounded-lg bg-white shadow-lg p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Horas Pico de Tráfico
        </h4>
      </div>
      <ReactApexChart
        options={options}
        series={state.series}
        type="radar"
        height={350}
      />
    </div>
  );
};

export default ChartFour;
