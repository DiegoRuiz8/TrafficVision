import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FilterIcon } from 'lucide-react';
import { ChevronDownIcon } from 'lucide-react';

interface TrafficAnalysisChartProps {
  availableCameras: { name: string; data: number[] }[];
}

const TrafficAnalysisChart: React.FC<TrafficAnalysisChartProps> = ({
  availableCameras,
}) => {
  const [selectedCameras, setSelectedCameras] = useState<string[]>([
    'Cámara 1',
    'Cámara 2',
  ]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('month');
  const [viewType, setViewType] = useState<
    'volumeTraffic' | 'speed' | 'peakHours'
  >('volumeTraffic'); // Tipo de vista
  const [filtersOpen, setFiltersOpen] = useState(false); // Estado para abrir/cerrar filtros
  const [chartType, setChartType] = useState<'line' | 'area' | 'bar'>('area'); // Tipo de gráfico
  const [viewDropdownOpen, setViewDropdownOpen] = useState(false); // Estado del menú desplegable para la vista
  const [chartDropdownOpen, setChartDropdownOpen] = useState(false); // Estado del menú desplegable para el tipo de gráfico

  const handleCameraSelection = (cameraName: string) => {
    setSelectedCameras((prevSelected) =>
      prevSelected.includes(cameraName)
        ? prevSelected.filter((name) => name !== cameraName)
        : [...prevSelected, cameraName],
    );
  };

  const options: ApexOptions = {
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
      labels: {
        colors: ['#3C50E0', '#80CAEE'],
        useSeriesColors: true,
      },
    },
    colors: ['#3C50E0', '#80CAEE', '#FF5733', '#FFC300'], // Agregar colores adicionales si hay más cámaras
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
    stroke: {
      width: [2, 2],
      curve: 'smooth',
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
    },
    xaxis: {
      type: 'category',
      categories: [
        'Abr',
        'May',
        'Jun',
        'Jul',
        'Ago',
        'Sep',
        'Oct',
        'Nov',
        'Dic',
      ],
    },
    yaxis: {
      min: 0,
      max: 600,
    },
  };

  const selectedData = availableCameras
    .filter((camera) => selectedCameras.includes(camera.name))
    .map((camera) => ({ name: camera.name, data: camera.data }));

  return (
    <div className="col-span-12 rounded-sm p-4 bg-white dark:bg-boxdark">
      {/* Barra de Opciones */}
      <div className="flex flex-wrap items-center justify-between mb-2">
        {/* Botones de selección de métricas estilo pestaña */}
        <div className="flex items-center space-x-8 border-b mb-2">
          <button
            onClick={() => setViewType('volumeTraffic')}
            className={`pb-2 ${
              viewType === 'volumeTraffic'
                ? 'border-b-2 border-blue-500 text-blue-500 font-semibold'
                : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            Volumen de Tráfico
          </button>
          <button
            onClick={() => setViewType('speed')}
            className={`pb-2 ${
              viewType === 'speed'
                ? 'border-b-2 border-blue-500 text-blue-500 font-semibold'
                : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            Velocidades Promedio
          </button>
          <button
            onClick={() => setViewType('peakHours')}
            className={`pb-2 ${
              viewType === 'peakHours'
                ? 'border-b-2 border-blue-500 text-blue-500 font-semibold'
                : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            Horas Pico
          </button>
        </div>

        {/* Botón de Filtros con icono */}
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="flex items-center bg-gray-200 px-3 py-1 rounded border text-sm text-gray-700 hover:bg-gray-300 "
        >
          <FilterIcon className="h-4 w-4 mr-1" /> Filtros
        </button>
      </div>

      {/* Filtros desplegables */}
      {filtersOpen && (
        <div className="flex flex-wrap items-center mt-2 mb-4 p-4 border rounded">
          {/* Título de los filtros */}
          <label className="mr-2 font-semibold">Tipos de Vehículos:</label>

          {/* Opción de Peatones */}
          <div className="flex items-center mr-4">
            <input type="checkbox" id="peatones" className="mr-1" />
            <label htmlFor="peatones" className="text-gray-700">
              Peatones
            </label>
          </div>

          {/* Opción de Bicletas */}
          <div className="flex items-center mr-4">
            <input type="checkbox" id="bicicletas" className="mr-1" />
            <label htmlFor="bicicletas" className="text-gray-700">
              Bicicletas
            </label>
          </div>

          {/* Opción de Motociletas */}
          <div className="flex items-center mr-4">
            <input type="checkbox" id="motocicletas" className="mr-1" />
            <label htmlFor="motocicletas" className="text-gray-700">
              Motocicletas
            </label>
          </div>

          {/* Opción de Carros */}
          <div className="flex items-center mr-4">
            <input type="checkbox" id="carros" className="mr-1" />
            <label htmlFor="carros" className="text-gray-700">
              Carros
            </label>
          </div>

          {/* Opción de Transporte de Carga */}
          <div className="flex items-center mr-4">
            <input type="checkbox" id="transporteCarga" className="mr-1" />
            <label htmlFor="TransporteCarga" className="text-gray-700">
              Transporte de Carga
            </label>
          </div>

          {/* Opción de Transporte Público */}
          <div className="flex items-center mr-4">
            <input type="checkbox" id="transportePublico" className="mr-1" />
            <label htmlFor="TransporteCarga" className="text-gray-700">
              Transporte Público
            </label>
          </div>
        </div>
      )}

      {/* Selector de fechas */}
      <div className="flex flex-wrap items-center justify-between mb-4">
        <div className="flex items-center">
          <label className="font-semibold text-md mr-2">Rango de fechas:</label>
          <div className="flex items-center space-x-2">
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => date && setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className="p-2 border rounded w-30 h-8 text-center text-base"
            />
            <span className="mx-2 text-lg">-</span>{' '}
            {/* Agregar un guion con separación */}
            <DatePicker
              selected={endDate}
              onChange={(date: Date | null) => date && setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              className="p-2 border rounded w-30 h-8 text-center text-base"
            />
          </div>
        </div>

        {/* Dropdowns de tipo de gráfico y vista */}
        <div className="relative flex items-center space-x-2 mt-2">
          {/* Botón para cambiar tipo de gráfico */}
          <div className="relative">
            <button
              onClick={() => setChartDropdownOpen(!chartDropdownOpen)}
              className="flex items-center bg-gray-200 px-3 py-1 rounded border text-sm text-gray-700 hover:bg-gray-300"
            >
              {chartType === 'area'
                ? 'Gráfico de Área'
                : chartType === 'line'
                ? 'Gráfico de Líneas'
                : 'Gráfico de Barras'}
              <ChevronDownIcon className="h-4 w-4 ml-1" />
            </button>
            {chartDropdownOpen && (
              <div className="absolute -left-2 top-8 bg-white shadow-md rounded-md z-10">
                <button
                  onClick={() => {
                    setChartType('line');
                    setChartDropdownOpen(false);
                  }}
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                >
                  Gráfico de Línea
                </button>
                <button
                  onClick={() => {
                    setChartType('area');
                    setChartDropdownOpen(false);
                  }}
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                >
                  Gráfico de Área
                </button>
                <button
                  onClick={() => {
                    setChartType('bar');
                    setChartDropdownOpen(false);
                  }}
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                >
                  Gráfico de Barras
                </button>
              </div>
            )}
          </div>

          {/* Dropdown de vista */}
          <div className="relative">
            <button
              onClick={() => setViewDropdownOpen(!viewDropdownOpen)}
              className="flex items-center bg-gray-200 px-3 py-1 rounded border text-sm text-gray-700 hover:bg-gray-300"
            >
              {viewMode === 'day'
                ? 'Día'
                : viewMode === 'week'
                ? 'Semanal'
                : 'Mensual'}
              <ChevronDownIcon className="h-4 w-4 ml-1" />
            </button>
            {viewDropdownOpen && (
              <div className="absolute -left-2 top-8 bg-white shadow-md rounded-md z-10">
                <button
                  onClick={() => {
                    setViewMode('day');
                    setViewDropdownOpen(false);
                  }}
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                >
                  Día
                </button>
                <button
                  onClick={() => {
                    setViewMode('week');
                    setViewDropdownOpen(false);
                  }}
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                >
                  Semanal
                </button>
                <button
                  onClick={() => {
                    setViewMode('month');
                    setViewDropdownOpen(false);
                  }}
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                >
                  Mensual
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Selector de Cámaras */}

      <div className="flex items-center mt-4">
        <label className="mr-2 font-semibold">Selecciona cámaras:</label>
        <div className="flex flex-wrap gap-2">
          {availableCameras.map((camera) => (
            <button
              key={camera.name}
              onClick={() => handleCameraSelection(camera.name)}
              className={`py-1 px-3 rounded border ${
                selectedCameras.includes(camera.name)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
              }`}
            >
              {camera.name}
            </button>
          ))}
        </div>
      </div>

      {/* Gráfico */}
      <div className="mt-5">
        <ReactApexChart
          options={options}
          series={selectedData}
          type="area"
          height={350}
        />
      </div>
    </div>
  );
};

export default TrafficAnalysisChart;
