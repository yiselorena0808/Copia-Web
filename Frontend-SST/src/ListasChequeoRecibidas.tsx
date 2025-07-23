import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaSearch, FaDownload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface ListaChequeo {
  id: number;
  usuario: string;
  fecha: string;
  hora: string;
  marca: string;
  modelo: string;
  soat: boolean;
  tecnico: boolean;
  kilometraje: number;
}

const ListasChequeoRecibidas: React.FC = () => {
  const navigate = useNavigate();
  const [listas, setListas] = useState<ListaChequeo[]>([]);

  useEffect(() => {
    const obtenerListas = async () => {
      const res = await fetch("http://localhost:3333/listarListasChequeo");
      const data = await res.json();
      setListas(data.datos);
    };

    obtenerListas();
  }, []);

  const abrirDetalle = (item: ListaChequeo) => {
    navigate("/nav/lector", { state: item });
  };

  const formatearFecha = (fechaIso: string): string => {
    const fecha = new Date(fechaIso);
    return fecha.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="p-4 bg-light" style={{ minHeight: '100vh' }}>
      <h3 className="fw-bold text-center mb-4">Listas de Chequeo Recibidas</h3>

      <div className="mx-auto p-4 rounded-4 shadow" style={{ backgroundColor: '#e9ecef', maxWidth: '900px' }}>
        <div className="d-flex justify-content-end mb-4">
          <div className="input-group shadow-sm" style={{ width: '300px' }}>
            <input type="text" className="form-control rounded-start-pill" placeholder="Buscar ..." />
            <span className="input-group-text bg-white rounded-end-pill">
              <FaSearch />
            </span>
          </div>
        </div>

        {listas.map((item) => (
          <div
            key={item.id}
            className="d-flex justify-content-between align-items-center p-3 my-2 bg-white rounded-3 shadow-sm"
          >
            <span className="fw-bold">{item.usuario} - {formatearFecha(item.fecha)}</span>
            <div className="d-flex gap-2">
              <Button
                size="sm"
                style={{
                  backgroundColor: '#7fffd4',
                  color: '#000',
                  border: '1px solid #5cd3b0'
                }}
                onClick={() => abrirDetalle(item)}
              >
                Abrir
              </Button>
              <Button variant="danger" size="sm">
                <FaDownload />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListasChequeoRecibidas;
