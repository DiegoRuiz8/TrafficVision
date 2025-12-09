// src/components/Dropdowns/CameraSelector.tsx

import React from 'react';

interface CameraSelectorProps {
  selectedCamera: string;
  onCameraChange: (camera: string) => void;
}

const CameraSelector: React.FC<CameraSelectorProps> = ({
  selectedCamera,
  onCameraChange,
}) => {
  return (
    <div className="flex items-center gap-2 mb-6">
      <span className="text-lg font-semibold">Cambiar Cámara</span>
      <select
        className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        value={selectedCamera}
        onChange={(e) => onCameraChange(e.target.value)}
      >
        <option value="camara1">Cámara 1</option>
        <option value="camara2">Cámara 2</option>
        <option value="camara3">Cámara 3</option>
        {/* Agrega más opciones según sea necesario */}
      </select>
    </div>
  );
};

export default CameraSelector;
