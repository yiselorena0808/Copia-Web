import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registro: React.FC = () => {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [cargo, setCargo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmacion, setConfirmacion] = useState("");
  const registrar = async (e: React.FormEvent) => {
    e.preventDefault();

    if (contrasena !== confirmacion) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const res = await fetch("http://localhost:3333/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    nombre,
    apellido,
    nombre_usuario: nombreUsuario,
    correo_electronico: correoElectronico,
    cargo,
    contrasena,
    confirmacion,
  }),
});

console.log("Status:", res.status); 
const data = await res.json();
console.log("Respuesta JSON:", data);
if (data.mensaje === "Registro correcto") {
  alert("Registro exitoso");
  navigate("/");
} else {
 alert("Error en el registro: " + (data.mensaje || JSON.stringify(data)));

}
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#f3f3f3" }}>
      <div className="rounded-5 p-3 shadow-lg d-flex flex-column align-items-center" style={{ backgroundColor: "#ddd", width: "420px" }}>
        <h4 className="text-center fw-bold mb-2">Crear cuenta</h4>

        <form onSubmit={registrar} className="w-100">
          <div className="mb-1">
            <label className="form-label">Nombre</label>
            <input type="text" className="form-control rounded-pill" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </div>

          <div className="mb-1">
            <label className="form-label">Apellido</label>
            <input type="text" className="form-control rounded-pill" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
          </div>

          <div className="mb-1">
            <label className="form-label">Nombre de usuario</label>
            <input type="text" className="form-control rounded-pill" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} required />
          </div>

          <div className="mb-1">
            <label className="form-label">Correo electrónico</label>
            <input type="email" className="form-control rounded-pill" value={correoElectronico} onChange={(e) => setCorreoElectronico(e.target.value)} required />
          </div>

          <div className="mb-1">
            <label className="form-label">Cargo</label>
            <input type="text" className="form-control rounded-pill" value={cargo} onChange={(e) => setCargo(e.target.value)} required />
          </div>

          <div className="mb-1">
            <label className="form-label">Contraseña</label>
            <input type="password" className="form-control rounded-pill" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
          </div>

          <div className="mb-2">
            <label className="form-label">Confirmar contraseña</label>
            <input type="password" className="form-control rounded-pill" value={confirmacion} onChange={(e) => setConfirmacion(e.target.value)} required />
          </div>

          <button type="submit" className="btn btn-dark w-100 rounded-pill shadow-sm">
            Registrarse
          </button>

          <div className="text-center mt-2">
            <span className="text-muted">¿Ya tienes cuenta? </span>
            <span
              className="text-primary"
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() => navigate("/nav")}
            >
              Inicia sesión
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registro;
