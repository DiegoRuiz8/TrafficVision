import React from 'react';

interface ChartLocationProps {
  latitude: number;
  longitude: number;
}

const ChartLocation: React.FC<ChartLocationProps> = ({ latitude, longitude }) => {
  const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=14&output=embed`;

  return (
    <div className="col-span-12 rounded-lg bg-white shadow-lg p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4">
        <h4 className="text-xl font-semibold text-black dark:text-white">Ubicación</h4>
      </div>
      <div className="relative">
        <iframe
          src={mapUrl}
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-md"
        ></iframe>
      </div>
    </div>
  );
};

export default ChartLocation;
