import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Table } from 'react-bootstrap';

const LectorListaChequeo: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!state) {
      // Si no hay datos, regresamos a la lista
      navigate('/nav/listas');
    } else {
      setData(state);
    }
  }, [state, navigate]);

  const formatearFecha = (fechaIso: string): string => {
    const fecha = new Date(fechaIso);
    return fecha.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!data) return null; // Mostrar nada hasta que se establezca data

  return (
    <div className="p-4 bg-light" style={{ minHeight: '100vh' }}>
      <h3 className="fw-bold text-center mb-4">Lector de Listas</h3>

      <div className="mx-auto p-4 rounded-4 shadow" style={{ backgroundColor: '#cfd2d4', maxWidth: '900px' }}>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label><strong>Nombre Usuario:</strong></Form.Label>
            <Form.Control type="text" readOnly defaultValue={data.usuario} />
          </Form.Group>

          <div className="d-flex gap-3">
            <Form.Group className="mb-3 flex-fill">
              <Form.Label><strong>Fecha Realizada:</strong></Form.Label>
              <Form.Control type="text" readOnly defaultValue={formatearFecha(data.fecha)} />
            </Form.Group>
            <Form.Group className="mb-3 flex-fill">
              <Form.Label><strong>Hora:</strong></Form.Label>
              <Form.Control type="text" readOnly defaultValue={data.hora} />
            </Form.Group>
          </div>

          <Form.Group className="mb-3">
            <Form.Label><strong>Marca:</strong></Form.Label>
            <Form.Control type="text" readOnly defaultValue={data.marca} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><strong>Modelo:</strong></Form.Label>
            <Form.Control type="text" readOnly defaultValue={data.modelo} />
          </Form.Group>

          <div className="d-flex gap-5 mb-3">
            <Form.Group>
              <Form.Label><strong>Soat:</strong></Form.Label><br />
              <Form.Check inline label="Sí" type="radio" checked={data.soat} readOnly />
              <Form.Check inline label="No" type="radio" checked={!data.soat} readOnly />
            </Form.Group>

            <Form.Group>
              <Form.Label><strong>Tecnicomecánica:</strong></Form.Label><br />
              <Form.Check inline label="Sí" type="radio" checked={data.tecnico} readOnly />
              <Form.Check inline label="No" type="radio" checked={!data.tecnico} readOnly />
            </Form.Group>
          </div>

          <Form.Group className="mb-4">
            <Form.Label><strong>Kilometraje Actual:</strong></Form.Label>
            <Form.Control type="text" readOnly defaultValue={data.kilometraje} />
          </Form.Group>
        </Form>

        <Table bordered hover>
          <thead>
            <tr style={{ backgroundColor: '#007b8a', color: 'white', textAlign: 'center' }}>
              <th>CARACTERISTICAS</th>
              <th>VERIFICADO</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Frenos</td><td style={{ textAlign: 'center' }}>✔️</td></tr>
            <tr><td>Luces</td><td style={{ textAlign: 'center' }}>✔️</td></tr>
            <tr><td>Espejos</td><td style={{ textAlign: 'center' }}>❌</td></tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default LectorListaChequeo;

