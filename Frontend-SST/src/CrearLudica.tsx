import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const RegistrarActividadLudica: React.FC = () => {
  const [formData, setFormData] = useState({
    id_usuario: 0,
    nombre_usuario: '',
    titulo: '',
    fecha_Actividad: '',
    descripcion: '',
    imagen: '',
    archivo: '',
  });

  const [mensaje, setMensaje] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3333/crearBlog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      setMensaje(result.msj || result.error);

      if (result.datos) {
        setFormData({
          id_usuario: 0,
          nombre_usuario: '',
          titulo: '',
          fecha_Actividad: '',
          descripcion: '',
          imagen: '',
          archivo: '',
        });
      }
    } catch (error: any) {
      setMensaje("Error al enviar la actividad.");
    }
  };

  return (
    <div className="p-4 bg-light" style={{ minHeight: '100vh' }}>
      <h3 className="fw-bold text-center mb-4">Actividades Lúdicas</h3>

      <div className="mx-auto p-4 rounded-4 shadow" style={{ backgroundColor: '#e5e5e5', maxWidth: '800px' }}>
        {mensaje && <Alert variant="info">{mensaje}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label><strong>Id usuario:</strong></Form.Label>
            <Form.Control
              type="number"
              name="id_usuario"
              value={formData.id_usuario}
              onChange={handleChange}
            />
          </Form.Group>

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
            <Form.Label><strong>Título de la Actividad:</strong></Form.Label>
            <Form.Control
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><strong>Fecha de la Actividad:</strong></Form.Label>
            <Form.Control
              type="date"
              name="fecha_Actividad"
              value={formData.fecha_Actividad}
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
            <Form.Label><strong>Subir imagen o video (URL o nombre de archivo):</strong></Form.Label>
            <Form.Control
              type="text"
              name="imagen"
              value={formData.imagen}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label><strong>Subir archivo (URL o nombre de archivo):</strong></Form.Label>
            <Form.Control
              type="text"
              name="archivo"
              value={formData.archivo}
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
