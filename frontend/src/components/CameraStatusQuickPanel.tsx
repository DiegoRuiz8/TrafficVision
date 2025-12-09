import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";

interface CameraStatusQuickPanelProps {
  totalCameras: number;
  connectedCameras: number;
  disconnectedCameras: number;
  activeStreams: number;
}

const CameraStatusQuickPanel: React.FC<CameraStatusQuickPanelProps> = ({ 
  totalCameras, 
  connectedCameras,
  disconnectedCameras, 
  activeStreams 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 text-black dark:text-white">
      <Card>
        <CardHeader>
          <CardTitle>Cámaras totales</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{totalCameras}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Cámaras Conectadas</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{connectedCameras}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Cámaras Desconectadas</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{disconnectedCameras}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Streams Activos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{activeStreams}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CameraStatusQuickPanel;
