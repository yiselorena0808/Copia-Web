import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navba: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [nombre, setNombre] = useState("");

  const ocultarNavbar = location.pathname === "/" || location.pathname === "/registro";
  if (ocultarNavbar) {
    return null;
  }

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    const nombreGuardado = localStorage.getItem("nombre_completo");

    if (!auth) {
      navigate("/");
    }

    if (nombreGuardado) {
      setNombre(nombreGuardado);
    }
  }, [navigate]);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="d-flex min-vh-100 bg-dark text-white">
      {/* Sidebar */}
      <div className="bg-black text-white d-flex flex-column p-3" style={{ width: '220px' }}>
        <div className="text-center mb-4">
          <img
            src="https://img.freepik.com/vector-premium/diseno-logotipo-letra-sst-forma-circulo-diseno-logotipo-forma-circulo-cubo-sst-hexagono-acero-inoxidable_634196-2104.jpg"
            alt="Logo"
            style={{ width: "70px", borderRadius: "50%" }}
          />
          <h5 className="fw-bold mt-2 text-info">IST SAS</h5>
        </div>

        <Button variant="outline-light" className="w-100 mb-2 rounded-pill" onClick={() => navigate("/nav")}>
          🏠 Inicio
        </Button>
        <Button variant="outline-light" className="w-100 mb-2 rounded-pill" onClick={() => navigate("/nav/listas")}>
          📋 Lista de chequeo
        </Button>
        <Button variant="outline-light" className="w-100 mb-2 rounded-pill">📊 Informes</Button>
        <Button variant="outline-light" className="w-100 mb-2 rounded-pill">⚙️ Gestión EPP</Button>
        <Button variant="outline-light" className="w-100 mb-2 rounded-pill" onClick={() => navigate("/nav/crearLudica")}
        >🎯 Actividades Lúdicas</Button>
        <Button variant="outline-light" className="w-100 mb-2 rounded-pill" onClick={() => navigate("/nav/blog")}
        >📚 Blog</Button>
        <Button variant="outline-light" className="w-100 mb-2 rounded-pill">👤 Administrar usuarios</Button>
        <Button variant="outline-light" className="w-100 mb-2 rounded-pill" onClick={() => navigate("/nav/gestion")}>
          📋 Gestion epp
        </Button>
        <div className="mt-auto text-center">
          <Button variant="danger" className="w-100 mt-2 rounded-pill" onClick={logout}>
            🔒 Cerrar sesión
          </Button>
        </div>
      </div>

      {/* Top Bar + Contenido Dinámico */}
      <div className="flex-grow-1 bg-light text-dark">
        <div className="d-flex justify-content-between align-items-center px-4 py-3 bg-black text-white shadow-sm" style={{ height: "90px" }}>
          <h5 className="m-0 fw-bold">Panel principal</h5>
          <div className="d-flex align-items-center gap-3">
            {nombre && (
              <span className="text-white fw-bold fs-4 text-uppercase">{nombre}</span>
            )}
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="Perfil"
              style={{
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid white'
              }}
            />
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Navba;
