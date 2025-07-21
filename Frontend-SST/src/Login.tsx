import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [correo_electronico, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  const Enviar = async (event: React.FormEvent) => {
    event.preventDefault();

    const res = await fetch(`http://localhost:56995/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo_electronico, contrasena }),
    });

    const data = await res.json();

    if (data.mensaje == "bienvenido") {
      localStorage.setItem("nombre", data.nombre);
      localStorage.setItem("correo", data.correo);
      localStorage.setItem("auth", "true");
      navigate("/nav", { replace: true });
      window.location.reload();

    } else {
      alert("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div
        className="p-5 bg-secondary bg-opacity-25 rounded-5 shadow-lg"
        style={{ width: "450px" }}
      >
        <div className="text-center mb-4">
          <img
            src="https://img.freepik.com/vector-premium/diseno-logotipo-letra-sst-forma-circulo-diseno-logotipo-forma-circulo-cubo-sst-hexagono-acero-inoxidable_634196-2104.jpg"
            alt="Logo"
            style={{ width: "90px", marginBottom: "15px", borderRadius: "50%" }}
          />
          <h4 className="fw-bold">INICIO SESIÓN</h4>
        </div>

        <form onSubmit={Enviar}>
          <div className="mb-4">
            <label className="form-label fs-5">Email</label>
            <input
              type="email"
              className="form-control form-control-lg rounded-pill"
              placeholder="Escribe tu correo"
              value={correo_electronico}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fs-5">Contraseña</label>
            <input
              type="password"
              className="form-control form-control-lg rounded-pill"
              placeholder="Escribe tu contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />
          </div>

          <div className="d-flex justify-content-between mb-4">
            <small className="text-muted fs-6">¿Olvidaste la contraseña?</small>
            <small
              onClick={() => navigate("/registro")}
              className="text-decoration-underline text-dark fw-semibold fs-6"
              style={{ cursor: "pointer" }}
            >
              Regístrate
            </small>
          </div>

          <button
            type="submit"
            className="btn btn-lg w-100 text-white fw-bold"
            style={{
              borderRadius: "30px",
              backgroundColor: "#000",
              boxShadow: "0 0 15px #00ffcc",
            }}
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;