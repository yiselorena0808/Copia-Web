import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const RegistrarActividadLudica: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre_usuario: '',
    nombre_actividad: '',
    fecha_actividad: '',
    descripcion: '',
    imagen_video: '',
    archivo_adjunto: '',
  });

  const [mensaje, setMensaje] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3333/crearLudica', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    setMensaje(result.mensaje);

    if (result.data) {
      setFormData({
        nombre_usuario: '',
        nombre_actividad: '',
        fecha_actividad: '',
        descripcion: '',
        imagen_video: '',
        archivo_adjunto: '',
      });
    }
  };

  return (
    <div className="p-4 bg-light" style={{ minHeight: '100vh' }}>
      <h3 className="fw-bold text-center mb-4">Actividades Lúdicas</h3>

      <div className="mx-auto p-4 rounded-4 shadow" style={{ backgroundColor: '#e5e5e5', maxWidth: '800px' }}>
        {mensaje && <Alert variant="info">{mensaje}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label><strong>Nombre Usuario:</strong></Form.Label>
            <Form.Control
              type="text"
              name="nombre_usuario"
              value={formData.nombre_usuario}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><strong>Nombre de la Actividad:</strong></Form.Label>
            <Form.Control
              type="text"
              name="nombre_actividad"
              value={formData.nombre_actividad}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><strong>Fecha de la Actividad:</strong></Form.Label>
            <Form.Control
              type="date"
              name="fecha_actividad"
              value={formData.fecha_actividad}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><strong>Descripción:</strong></Form.Label>
            <Form.Control
              as="textarea"
              name="descripcion"
              rows={3}
              value={formData.descripcion}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><strong>Subir imagen o video:</strong></Form.Label>
            <Form.Control
              type="text"
              name="imagen_video"
              placeholder="URL o nombre de archivo"
              value={formData.imagen_video}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label><strong>Subir archivo:</strong></Form.Label>
            <Form.Control
              type="text"
              name="archivo_adjunto"
              placeholder="URL o nombre de archivo"
              value={formData.archivo_adjunto}
              onChange={handleChange}
            />
          </Form.Group>

          <Button type="submit" variant="success" className="w-100">
            Enviar evidencias
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default RegistrarActividadLudica;
