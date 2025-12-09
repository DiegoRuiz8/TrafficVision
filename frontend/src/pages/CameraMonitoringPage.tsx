import React, { useState } from 'react';
import CameraStatusQuickPanel from '@/components/CameraStatusQuickPanel';
import CameraTable from '@/components/Tables/CameraTable';

interface Camera {
  id: number;
  name: string;
  location: string;
  connected: boolean;
  streaming: boolean;
  lastUpdate: string;
  resolution: string;
  macOrIpAddress: string;
}

const TrafficCameraMonitoring: React.FC = () => {
  // Estado de cámaras con datos de ejemplo
  const [cameras, setCameras] = useState<Camera[]>([
    {
      id: 1,
      name: 'Calle Principal',
      location: 'Centro',
      connected: true,
      streaming: true,
      lastUpdate: '2023-10-29 15:30:00',
      resolution: '1080p',
      macOrIpAddress: '192.168.1.10',
    },
    {
      id: 2,
      name: 'Autopista 101',
      location: 'Salida Norte',
      connected: true,
      streaming: false,
      lastUpdate: '2023-10-29 15:25:00',
      resolution: '720p',
      macOrIpAddress: '192.168.1.11',
    },
    {
      id: 3,
      name: 'Vista al Parque',
      location: 'Parque Central',
      connected: false,
      streaming: false,
      lastUpdate: '2023-10-29 14:45:00',
      resolution: '4K',
      macOrIpAddress: '192.168.1.12',
    },
  ]);

  // Funciones para manejar los eventos en la tabla de cámaras
  const handleToggleConnection = (id: number) => {
    setCameras(
      cameras.map((camera) =>
        camera.id === id
          ? {
              ...camera,
              connected: !camera.connected,
              lastUpdate: new Date().toLocaleString(),
            }
          : camera,
      ),
    );
  };

  const handleToggleStreaming = (id: number) => {
    setCameras(
      cameras.map((camera) =>
        camera.id === id
          ? {
              ...camera,
              streaming: !camera.streaming,
              lastUpdate: new Date().toLocaleString(),
            }
          : camera,
      ),
    );
  };

  const handleDeleteCamera = (id: number) => {
    setCameras(cameras.filter((camera) => camera.id !== id));
  };

  const handleAddCamera = () => {
    const newId = cameras.length + 1;
    const newCamera: Camera = {
      id: newId,
      name: `Cámara ${newId}`,
      location: 'Nueva Ubicación',
      connected: true,
      streaming: false,
      lastUpdate: new Date().toLocaleString(),
      resolution: '1080p',
      macOrIpAddress: `192.168.1.${newId + 9}`,
    };
    setCameras([...cameras, newCamera]);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Encabezado */}
      <header className="text-left mb-8 text-black dark:text-white">
        <h2 className="text-2xl font-bold">Monitoreo de Cámaras de Tráfico</h2>
        <p className="text-xl text-muted-foreground">Estado de Cámaras en Tiempo Real</p>
      </header>

      {/* Panel Rápido de Estado de Cámaras */}
      <CameraStatusQuickPanel
        totalCameras={cameras.length}
        connectedCameras={cameras.filter((camera) => camera.connected).length}
        disconnectedCameras={
          cameras.filter((camera) => !camera.connected).length
        }
        activeStreams={cameras.filter((camera) => camera.streaming).length}
      />

      {/* Tabla de Estado de Cámaras */}
      <CameraTable
        cameras={cameras}
        onToggleConnection={handleToggleConnection}
        onToggleStreaming={handleToggleStreaming}
        onDeleteCamera={handleDeleteCamera}
        onAddCamera={handleAddCamera}
      />
    </div>
  );
};

export default TrafficCameraMonitoring;
