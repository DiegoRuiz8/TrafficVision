import React, { useEffect, useState } from 'react';
import CloudsIcon from '../../images/weather/clouds.png';
import ClearIcon from '../../images/weather/clear.png';
import RainIcon from '../../images/weather/rain.png';
import DrizzleIcon from '../../images/weather/drizzle.png';
import MistIcon from '../../images/weather/mist.png';

const apiKey = "f2e39fc220db3418571120357c8b9c1f";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=Guadalajara&appid=${apiKey}`;

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: [
    {
      main: string;
    }
  ];
}

const weatherIcons: { [key: string]: string } = {
  Clouds: CloudsIcon,
  Clear: ClearIcon,
  Rain: RainIcon,
  Drizzle: DrizzleIcon,
  Mist: MistIcon,
};

const ChartWeather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
      } else {
        console.error("Error fetching weather data");
      }
    };
    fetchWeather();
  }, []);

  if (!weatherData) return <div>Loading...</div>;

  const { name, main, wind, weather } = weatherData;
  const weatherCondition = weather[0].main;
  const iconUrl = weatherIcons[weatherCondition] || CloudsIcon;

  return (
    <div className="col-span-12 rounded-lg bg-white shadow-lg p-6 dark:bg-boxdark xl:col-span-4">
      <h4 className="text-xl font-semibold text-black dark:text-white">Clima</h4>
      <div className="flex flex-col items-center">
        <img src={iconUrl} alt={weatherCondition} className="mb-4 w-48 h-48" />
        <div className="text-6xl font-bold text-black dark:text-white">{Math.round(main.temp)}°C</div>
        <div className="text-lg mb-4 text-sm font-medium text-black dark:text-white">{name}</div>
      </div>
      <div className="flex justify-center gap-8 mt-4">
        <div className="text-center">
          <p className="text-2xl font-semibold text-black dark:text-white">{main.humidity}%</p>
          <p className="text-sm text-sm font-medium text-black dark:text-white">Humedad</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-semibold text-black dark:text-white">{wind.speed} km/h</p>
          <p className="text-sm text-sm font-medium text-black dark:text-white">Velocidad del Viento</p>
        </div>
      </div>
    </div>
  );
};

export default ChartWeather;
