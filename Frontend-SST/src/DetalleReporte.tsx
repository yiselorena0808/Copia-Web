import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

interface Reporte {
  id_reporte: number;
  nombre_usuario: string;
  cargo_usuario: string;
  cedula: number;
  fecha: string;
  lugar: string;
  descripcion: string;
  img: string;
  archivos: string;
  estado: string;
}


const DetalleReporte: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const reporte: Reporte | undefined = location.state as Reporte;

  if (!reporte) {
    return <p className="p-4">No hay datos para mostrar.</p>;
  }

  const formatearFecha = (fechaIso: string) =>
    new Date(fechaIso).toLocaleString('es-CO', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  const verImagen = () => {
    const imgUrl = `http://localhost:3333/img/${reporte.img}`;
    window.open(imgUrl, '_blank');
  };

  return (
    <div className="p-4 bg-light" style={{ minHeight: '100vh' }}>
      <Button variant="secondary" onClick={() => navigate(-1)}>← Volver</Button>
      <Card className="mt-3 p-4 shadow" style={{ maxWidth: 600, margin: 'auto' }}>
        <h3 className="mb-3">Detalle del Reporte</h3>
        <p><strong>Usuario:</strong> {reporte.nombre_usuario} ({reporte.cargo_usuario})</p>
        <p><strong>Cédula:</strong> {reporte.cedula}</p>
        <p><strong>Fecha:</strong> {formatearFecha(reporte.fecha)}</p>
        <p><strong>Lugar:</strong> {reporte.lugar}</p>
        <p><strong>Descripción:</strong> {reporte.descripcion}</p>
        <p><strong>Estado:</strong> {reporte.estado}</p>

        <div className="d-flex gap-2 mt-3">
          {reporte.img && (
            <Button variant="info" onClick={verImagen}>
              Ver Imagen
            </Button>
            
          )}
          <button>Descargar Solicitud</button>
          
        </div>
      </Card>
    </div>
  );
};

export default DetalleReporte;
