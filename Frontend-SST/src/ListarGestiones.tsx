import React, { useEffect, useState } from 'react';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import {FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Gestion from './Gestion';

interface Gestion {
  id: number;
  nombre: string;
  apellido: string;
  cedula: number;
  cargo: string;
  productos: string;
  cantidad: number;
  importancia: string;
  fecha_creacion: string;
  estado: string;
}

const ListarGestiones: React.FC = () => {
  const navigate = useNavigate();
  const [listas, setListas] = useState<Gestion[]>([]);
  const [busqueda, setBusqueda] = useState("");

  const obtenerListas = async () => {
    try {
      const res = await fetch("http://localhost:3333/listarGestiones"); 
      const data = await res.json();
      setListas(data.datos);
    } catch (error) {
      console.error("Error al obtener gestiones:", error);
    }
  };

  useEffect(() => {
    obtenerListas();
  }, []);

  const abrirDetalle = (item: Gestion) => {
    navigate("/nav/detalleGestion", { state: item });
  };

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

  const cambiarEstado = async (id: number, nuevoEstado: string) => {
    try {
      await fetch(`http://localhost:3333/actualizarGestion/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: nuevoEstado }),
      });
      setListas(prev =>
        prev.map(item =>
          item.id === id ? { ...item, estado: nuevoEstado } : item
        )
      );
    } catch (error) {
      console.error("Error actualizando estado:", error);
    }
  };
  
  const eliminarGestion = async (id: number) => {
    if (!window.confirm("¿Estás seguro de eliminar esta gestión?")) return;
    try {
      await fetch(`http://localhost:3333/eliminarGestion/${id}`, { method: "DELETE" });
      setListas(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error al eliminar gestión:", error);
    }
  };

  const filtrarPorEstado = (estado: string) =>
    listas.filter(item =>
      item.estado === estado &&
      (`${item.nombre} ${item.apellido} ${item.cargo}`.toLowerCase().includes(busqueda.toLowerCase()))
    );

  const estados = ["Pendiente", "Revisado", "Finalizado"];

  return (
    <div className="p-4 bg-light" style={{ minHeight: '100vh' }}>
      <h3 className="fw-bold text-center mb-4">Listas de Gestión</h3>

      <div className="mx-auto p-4 rounded-4 shadow" style={{ backgroundColor: '#e9ecef', maxWidth: '900px' }}>
        <div className="d-flex justify-content-end mb-4">
          <div className="input-group shadow-sm" style={{ width: '300px' }}>
            <input
              type="text"
              className="form-control rounded-start-pill"
              placeholder="Buscar ..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <span className="input-group-text bg-white rounded-end-pill">
              🔍
            </span>
          </div>
         
        </div>
       
       
        <p></p>

        {estados.map(estado => {
          const gestionesFiltradas = filtrarPorEstado(estado);
          return (
            <div key={estado} className="mb-5">
              <h4>{estado}</h4>
              {gestionesFiltradas.length === 0 ? (
                <p className="text-muted">No hay gestiones {estado.toLowerCase()}.</p>
              ) : (
                gestionesFiltradas.map(item => (
                  <div
                    key={item.id}
                    className="d-flex justify-content-between align-items-center p-3 my-2 bg-white rounded-3 shadow-sm"
                  >
                    <div>
                      <div className="fw-bold">{item.nombre} {item.apellido} - {formatearFecha(item.fecha_creacion)}</div>
                      <div className="text-muted">Cargo: {item.cargo} | Estado: <strong>{item.estado}</strong></div>
                    </div>
                    <div className="d-flex gap-2">
                      <Button size="sm" variant="info" onClick={() => abrirDetalle(item)}>Abrir</Button>

                      <Dropdown as={ButtonGroup}>
                        <Button variant="outline-secondary" size="sm">Estado</Button>
                        <Dropdown.Toggle split variant="outline-secondary" id="dropdown-split-basic" size="sm" />
                        <Dropdown.Menu>
                          {estados.map(e => (
                            <Dropdown.Item key={e} onClick={() => cambiarEstado(item.id, e)}>
                              {e}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>

                      <Button variant="danger" size="sm" onClick={() => eliminarGestion(item.id)}>
                       <FaTrash />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          );
        })}
        
      </div>
      
    </div>
  );
};

export default ListarGestiones;
