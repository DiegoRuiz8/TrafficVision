import React from 'react';
import cameraImage from '../../images/cameras/camera1.png';

const ChartCamera: React.FC = () => {
  return (
    <div className="col-span-12 rounded-lg bg-white shadow-lg px-5 pt-7.5 pb-5 dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <h4 className="text-xl font-semibold mb-4 text-black dark:text-white">Cámara</h4>
        <div className="relative mt-4">
          <img
            src={cameraImage}
            alt="Imagen superior"
            className="w-full h-auto"
          />
      </div>
    </div>
  );
};

export default ChartCamera;
