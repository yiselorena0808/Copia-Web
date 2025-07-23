import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  cedula: number;              // si lo usas, mantenlo
  nombre_usuario: string;
  correo_electronico: string;
  cargo: string;
  contrasena: string;          // nueva propiedad
  fecha_registro: string;      // nueva propiedad, formato ISO string o similar
}

interface Props {
  usuario: Usuario;
  onClose: () => void;
  onUpdate: (usuario: Usuario) => void;
}

const ActualizarUsuarioModal: React.FC<Props> = ({ usuario, onClose, onUpdate }) => {
  const [formData, setFormData] = useState<Usuario>(usuario);
  const [mensaje, setMensaje] = useState<string>("");

  useEffect(() => {
    setFormData(usuario);
  }, [usuario]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: name === "cedula" ? Number(value) : value,  // si cedula es número
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar campos obligatorios, puedes ajustar según necesites
    if (!formData.nombre || !formData.apellido || !formData.nombre_usuario || !formData.correo_electronico || !formData.cargo) {
      setMensaje("Todos los campos obligatorios deben estar completos.");
      return;
    }

    setMensaje("");
    onUpdate(formData);
  };

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Actualizar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {mensaje && <Alert variant="danger">{mensaje}</Alert>}

        <Form onSubmit={handleSubmit}>
          {/* id: usualmente solo lectura */}
          <Form.Group className="mb-3">
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="number"
              name="id"
              value={formData.id}
              readOnly
              disabled
            />
          </Form.Group>


          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nombre de Usuario</Form.Label>
            <Form.Control
              type="text"
              name="nombre_usuario"
              value={formData.nombre_usuario}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              name="correo_electronico"
              value={formData.correo_electronico}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cargo</Form.Label>
            <Form.Control
              type="text"
              name="cargo"
              value={formData.cargo}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              placeholder="Ingresa nueva contraseña o deja vacía para no cambiar"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Fecha de Registro</Form.Label>
            <Form.Control
              type="date"
              name="fecha_registro"
              value={formData.fecha_registro ? formData.fecha_registro.substring(0,10) : ""}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Guardar Cambios
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ActualizarUsuarioModal;
