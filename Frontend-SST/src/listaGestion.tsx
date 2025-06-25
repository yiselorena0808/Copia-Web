import React, { useEffect, useState } from "react";
import { Button, Table, Modal } from "react-bootstrap";

interface Gestion {
  id: number;
  nombre: string;
  apellido: string;
  cedula: number;
  cargo: string;
  productos: string;
  cantidad: number;
  importancia: string;
}

const ListaGestiones: React.FC = () => {
  const [gestiones, setGestiones] = useState<Gestion[]>([]);
  const [gestionSeleccionada, setGestionSeleccionada] = useState<Gestion | null>(null);

  const obtenerGestiones = async () => {
    try {
      const res = await fetch(`http://localhost:3333/listarGestiones`);
      const data = await res.json();
      setGestiones(data);
    } catch (error) {
      console.error("Error al obtener gestiones:", error);
    }
  };

  const eliminarGestion = async (id: number) => {
    if (!confirm("¿Eliminar esta gestión?")) return;

    try {
      const res = await fetch(`http://localhost:3333/listarGestiones/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      alert(data.mensaje);
      obtenerGestiones();
    } catch (error) {
      alert("Error al eliminar gestión.");
    }
  };

  useEffect(() => {
    obtenerGestiones();
  }, []);

  return (
    <div className="p-4">
      <h2>Gestiones Recibidas</h2>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Cédula</th>
            <th>Cargo</th>
            <th>Productos</th>
            <th>Cantidad</th>
            <th>Importancia</th>
            <th colSpan={2}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {gestiones.map((g) => (
            <tr key={g.id}>
              <td>{g.id}</td>
              <td>{g.nombre}</td>
              <td>{g.apellido}</td>
              <td>{g.cedula}</td>
              <td>{g.cargo}</td>
              <td>{g.productos}</td>
              <td>{g.cantidad}</td>
              <td>{g.importancia}</td>
              <td>
                <Button variant="info" onClick={() => setGestionSeleccionada(g)}>
                  Abrir
                </Button>
              </td>
              <td>
                <Button variant="danger" onClick={() => eliminarGestion(g.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para abrir detalles */}
      <Modal
        show={gestionSeleccionada !== null}
        onHide={() => setGestionSeleccionada(null)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Detalles de la Gestión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {gestionSeleccionada && (
            <>
              <p><strong>Nombre:</strong> {gestionSeleccionada.nombre}</p>
              <p><strong>Apellido:</strong> {gestionSeleccionada.apellido}</p>
              <p><strong>Cédula:</strong> {gestionSeleccionada.cedula}</p>
              <p><strong>Cargo:</strong> {gestionSeleccionada.cargo}</p>
              <p><strong>Productos:</strong> {gestionSeleccionada.productos}</p>
              <p><strong>Cantidad:</strong> {gestionSeleccionada.cantidad}</p>
              <p><strong>Importancia:</strong> {gestionSeleccionada.importancia}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setGestionSeleccionada(null)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListaGestiones;
