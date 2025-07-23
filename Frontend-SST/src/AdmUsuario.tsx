import { useEffect, useState } from "react";
import { Button, Table, Form } from "react-bootstrap";
import ActualizarUsuarioModal from "./ActualizarUsuarioModal";

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  cedula: number;
  nombre_usuario: string;
  correo_electronico: string;
  cargo: string;
  contrasena?: string; // opcional, para no obligar a cambiarla
}

const AdmUsuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [filtro, setFiltro] = useState<string>("");
  const [usuarioAEditar, setUsuarioAEditar] = useState<Usuario | null>(null);

  const obtenerUsuarios = async () => {
    try {
      const res = await fetch("http://localhost:3333/listarUsuarios");
      const data = await res.json();
      setUsuarios(data.datos);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };

  const eliminarUsuario = async (id: number) => {
    if (!confirm("¿Estás seguro de eliminar este usuario?")) return;

    try {
      const res = await fetch(`http://localhost:3333/eliminarUsuario/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      alert(data.mensaje);
      obtenerUsuarios();
    } catch (error) {
      alert("No se pudo eliminar el usuario.");
    }
  };

  const actualizarUsuario = async (usuario: Usuario) => {
    try {
      const res = await fetch(`http://localhost:3333/actualizarUsuario/${usuario.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });

      const data = await res.json();
      alert(data.mensaje);
      setUsuarioAEditar(null);
      obtenerUsuarios();
    } catch (error) {
      alert("Error al actualizar usuario");
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const usuariosFiltrados = usuarios.filter(
    (u) =>
      u.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      u.nombre_usuario.toLowerCase().includes(filtro.toLowerCase()) ||
      u.id.toString().includes(filtro)
  );

  return (
    <div className="p-4">
      <h1>Administración de usuarios</h1>
      <Button
        className="boton-flotante"
        onClick={() => (window.location.href = "/registro")}
      >
        + Crear Usuario
      </Button>

      <Form.Control
        type="text"
        placeholder="Buscar por nombre o usuario"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="my-3 w-50"
      />

      <Table striped bordered hover>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Usuario</th>
            <th>Correo</th>
            <th>Cargo</th>
            <th colSpan={2}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuariosFiltrados.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.apellido}</td>
              <td>{u.nombre_usuario}</td>
              <td>{u.correo_electronico}</td>
              <td>{u.cargo}</td>
              <td>
                <Button variant="warning" onClick={() => setUsuarioAEditar(u)}>
                  Editar
                </Button>
              </td>
              <td>
                <Button variant="danger" onClick={() => eliminarUsuario(u.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {usuarioAEditar && (
        <ActualizarUsuarioModal
        usuario={usuarioAEditar}
          onClose={() => setUsuarioAEditar(null)}
          onUpdate={actualizarUsuario}
        />
      )}
    </div>
  );
};

export default AdmUsuarios;
