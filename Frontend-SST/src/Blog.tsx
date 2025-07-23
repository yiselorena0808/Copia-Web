import React, { useEffect, useState } from 'react';
import { Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';

interface PublicacionBlog {
  id?: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  archivo: string;
  fecha_creacion?: string;
}

const Blog: React.FC = () => {
  const [publicaciones, setPublicaciones] = useState<PublicacionBlog[]>([]);
  const [formData, setFormData] = useState<PublicacionBlog>({
    titulo: '',
    descripcion: '',
    imagen: '',
    archivo: '',
  });
  const [mensaje, setMensaje] = useState<string | null>(null);

  // Cargar publicaciones al inicio
  useEffect(() => {
    fetch('http://localhost:3333/listarBlog')
      .then(res => res.json())
      .then(res => setPublicaciones(res.data || []));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3333/crearBlog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    setMensaje(data.datos);

    if (data.data) {
      setFormData({ titulo: '', descripcion: '', imagen: '', archivo: '' });
      setPublicaciones(prev => [data.data, ...prev]); // Añadir publicación arriba
    }
  };

  return (
    <div className="p-4 bg-light" style={{ minHeight: '100vh' }}>
      <h2 className="text-center mb-4 fw-bold">Blog De Salud y Seguridad En El Trabajo</h2>
      <Row className="gap-4 justify-content-center">
        {/* Sección publicaciones */}
        <Col md={7}>
          {publicaciones.map((pub) => (
            <Card key={pub.id} className="mb-4 shadow">
              <Card.Body>
                <Card.Title className="text-center">{pub.titulo}</Card.Title>
                {pub.imagen && (
                  <div className="text-center mb-3">
                    <img
                      src={pub.imagen}
                      alt="imagen"
                      style={{ maxWidth: '100%', maxHeight: '300px' }}
                    />
                  </div>
                )}
                <Card.Text>{pub.descripcion}</Card.Text>
                <div className="d-flex justify-content-around mt-3 fs-4">
                  <span>❤️</span>
                  <span>💬</span>
                  <span>🔖</span>
                </div>
              </Card.Body>
              <Card.Footer className="text-muted text-center">
                {new Date(pub.fecha_creacion || '').toLocaleDateString('es-CO')}
              </Card.Footer>
            </Card>
          ))}
        </Col>

        {/* Sección formulario */}
        <Col md={4}>
          <div className="p-4 rounded-4 shadow bg-white">
            <h5 className="text-center mb-3 fw-bold">¡Crea una publicación!</h5>
            {mensaje && <Alert variant="info">{mensaje}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Título</Form.Label>
                <Form.Control
                  type="text"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  placeholder='Añade un titulo'
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Imagen (URL)</Form.Label>
                <Form.Control
                  type="text"
                  name="imagen"
                  value={formData.imagen}
                  placeholder='añade una imagen'
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  name="descripcion"
                  rows={3}
                  value={formData.descripcion}
                  onChange={handleChange}
                  placeholder='añade una descripcion'
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Archivo (URL)</Form.Label>
                <Form.Control
                  type="text"
                  name="archivo"
                  value={formData.archivo}
                  placeholder="URL del archivo adjunto (opcional)"
                  onChange={handleChange}
                />
              </Form.Group>

              <Button type="submit" className="w-100" variant="success">
                PUBLICAR
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Blog;
