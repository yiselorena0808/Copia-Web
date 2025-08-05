import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaHardHat, FaRegClipboard, FaRegSmileBeam } from "react-icons/fa";
import "./Bienvenida.css"; 

const Bienvenida: React.FC = () => {
  return (
    <Container fluid className="bienvenida-bg py-5 text-black">
      <Container>
        <Row className="justify-content-center text-center mb-5">
          <Col lg={8}>
            <h1 className="display-4 fw-bold">Bienvenidos al Sistema SST</h1>
            <p className="lead">
              Una plataforma integral para garantizar el bienestar, la prevención y la seguridad de todos
              nuestros colaboradores.
            </p>
            <div className="video-wrapper mt-4 mb-4">
              <iframe
                width="100%"
                height="400"
                src="https://www.youtube.com/watch?v=WFeuK53MPyU" 
                title="Video de presentación"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <Button variant="light" size="lg" href="/dashboard">
              Ir al Panel Principal
            </Button>
          </Col>
        </Row>

        <Row className="text-center text-dark">
          <Col md={4}>
            <FaHardHat size={50} className="mb-3 text-warning" />
            <h4>Prevención</h4>
            <p>Accede a listas de chequeo, capacitaciones y protocolos de seguridad.</p>
          </Col>
          <Col md={4}>
            <FaRegClipboard size={50} className="mb-3 text-primary" />
            <h4>Gestión</h4>
            <p>Registra reportes, gestiona tus EPPs y mantén actualizada la información.</p>
          </Col>
          <Col md={4}>
            <FaRegSmileBeam size={50} className="mb-3 text-success" />
            <h4>Bienestar</h4>
            <p>Participa en actividades lúdicas y programas de salud para tu desarrollo integral.</p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Bienvenida;
