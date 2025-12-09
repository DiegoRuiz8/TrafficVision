import React from 'react';
import Button from '@/components/Buttons/Button';
import { PlusCircle, Settings, RefreshCw } from 'lucide-react';

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

interface CameraTableProps {
  cameras: Camera[];
  onToggleConnection: (id: number) => void;
  onToggleStreaming: (id: number) => void;
  onDeleteCamera: (id: number) => void;
  onAddCamera: () => void;
}

const CameraTable: React.FC<CameraTableProps> = ({
  cameras,
  onToggleConnection,
  onToggleStreaming,
  onDeleteCamera,
  onAddCamera,
}) => {
  return (
    <div className="col-span-12 rounded-lg bg-white shadow-lg p-6 dark:border-strokedark dark:bg-boxdark">
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4 text-black ">
        <h2 className="text-xl font-semibold dark:text-white">
          Estado de las Cámaras
        </h2>
        <Button
          onClick={onAddCamera}
          className="flex items-center bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none rounded px-4 py-2"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          <span>Añadir cámara</span>
        </Button>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left text-black dark:text-white">
              <th className="py-4 px-4">Nombre</th>
              <th className="py-4 px-4">Ubicación</th>
              <th className="py-4 px-4">Estatus</th>
              <th className="py-4 px-4">Streaming</th>
              <th className="py-4 px-4">Resolución</th>
              <th className="py-4 px-4">Dirección MAC o IP</th>
              <th className="py-4 px-4">Última actualización</th>
              <th className="py-4 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cameras.map((camera) => (
              <tr key={camera.id}>
                <td className="border-b py-4 px-4">{camera.name}</td>
                <td className="border-b py-4 px-4">{camera.location}</td>
                <td className="border-b py-4 px-4">
                  <div className="flex items-center min-h-[48px]">
                    <span
                      className={`inline-block w-3 h-3 rounded-full mr-2 ${
                        camera.connected ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    ></span>
                    <span className="whitespace-nowrap">
                      {camera.connected ? 'Connected' : 'Disconnected'}
                    </span>
                  </div>
                </td>
                <td className="border-b py-4 px-4">
                  {camera.streaming ? 'Active' : 'Inactive'}
                </td>
                <td className="border-b py-4 px-4">{camera.resolution}</td>
                <td className="border-b py-4 px-4">{camera.macOrIpAddress}</td>
                <td className="border-b py-4 px-4">{camera.lastUpdate}</td>
                <td className="border-b py-4 px-4">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="small"
                      onClick={() => onToggleConnection(camera.id)}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="small"
                      onClick={() =>
                        console.log(`Configuring camera ${camera.id}`)
                      }
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default CameraTable;
