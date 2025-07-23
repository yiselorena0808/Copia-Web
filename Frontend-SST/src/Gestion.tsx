import React, { useState } from "react";
import { Form, Button, Row, Col, Alert, Card } from "react-bootstrap";

interface Gestion1 {
  onSubmit: (datos: {
    nombre: string;
    apellido: string;
    cedula: number;
    cargo: string;
    productos: string;
    cantidad: number;
    importancia: string;
    estado:string;
    fecha_creacion:string
  }) => void;
}

const Gestion: React.FC<Gestion1> = ({ onSubmit }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cedula, setCedula] = useState("");
  const [cargo, setCargo] = useState("");
  const [productos, setProductos] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [importancia, setImportancia] = useState("");
  const [mensaje, setMensaje] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cedulaNum = parseInt(cedula);
    const cantidadNum = parseInt(cantidad);

    if (isNaN(cedulaNum) || isNaN(cantidadNum)) {
      alert("Cédula y Cantidad deben ser números válidos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3333/crearGestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre,apellido,cedula,cargo,productos,cantidad,importancia }),
      });

      const msj = await response.json();
      setMensaje(msj.mensaje);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      setMensaje("Error al conectar con el servidor.");
    }

    onSubmit({
      nombre,
      apellido,
      cedula: cedulaNum,
      cargo,
      productos,
      cantidad: cantidadNum,
      importancia,
    });
  };

  return (
    <div className="p-4 bg-light" style={{ minHeight: "100vh" }}>
      <h2 className="text-center mb-4 fw-bold">Gestión de Entrega de EPP</h2>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="p-4 shadow">
            <h5 className="text-center mb-3 fw-bold">Formulario de Gestión</h5>
            {mensaje && <Alert variant="info">{mensaje}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Cédula</Form.Label>
                <Form.Control
                  type="number"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Cargo</Form.Label>
                <Form.Control
                  type="text"
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Lista de Productos</Form.Label>
                <Form.Control
                  type="text"
                  value={productos}
                  onChange={(e) => setProductos(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Cantidad</Form.Label>
                <Form.Control
                  type="number"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Importancia</Form.Label>
                <div className="d-flex gap-3">
                  {["Alta", "Media", "Baja"].map((nivel) => (
                    <Form.Check
                      key={nivel}
                      type="radio"
                      label={nivel}
                      name="importancia"
                      value={nivel}
                      checked={importancia === nivel}
                      onChange={(e) => setImportancia(e.target.value)}
                      inline
                    />
                  ))}
                </div>
              </Form.Group>

              <Button type="submit" variant="success" className="w-100">
                Enviar
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Gestion;
