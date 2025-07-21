import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

interface DatosGestion {
  id: number;
  nombre: string;
  apellido: string;
  cedula: number;
  cargo: string;
  productos: string;
  cantidad: number;
  importancia: string;
  fecha_creacion: string;
}

const DetalleGestion: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const datos: DatosGestion | undefined = location.state as DatosGestion;

  if (!datos) {
    return <p className="p-4">No hay datos para mostrar.</p>;
  }

  const formatearFecha = (fechaIso: string): string => {
    const fecha = new Date(fechaIso);
    return fecha.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="p-4 bg-light" style={{ minHeight: '100vh' }}>
      <Button variant="secondary" onClick={() => navigate(-1)}>← Volver</Button>
      <Card className="mt-3 p-4 shadow" style={{ maxWidth: 600, margin: "auto" }}>
        <h3 className="mb-3">Detalle del formulario</h3>
        <p><strong>Nombre:</strong> {datos.nombre} {datos.apellido}</p>
        <p><strong>Cédula:</strong> {datos.cedula}</p>
        <p><strong>Cargo:</strong> {datos.cargo}</p>
        <p><strong>Productos:</strong> {datos.productos}</p>
        <p><strong>Cantidad:</strong> {datos.cantidad}</p>
        <p><strong>Importancia:</strong> {datos.importancia}</p>
        <p><strong>Fecha de creación:</strong> {formatearFecha(datos.fecha_creacion)}</p>
      <Button>Descargar Solicitud</Button>
      </Card>
    </div>
  );
};

export default DetalleGestion;

