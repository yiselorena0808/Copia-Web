import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navba from './Navbar';
import ListasChequeoRecibidas from './ListasChequeoRecibidas';
import LectorListaChequeo from './LectorListas';
import Login from './Login'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Registro from './Registro'; 
import RegistrarActividadLudica from './CrearLudica';
import Blog from './Blog';
import Gestion from './Gestion';
import AdmUsuarios from './AdmUsuario';
import DetalleGestion from './DetalleGestion';
import ListasReportes from './Reportes';
import DetalleReporte from './DetalleReporte';
import ListarGestiones from './ListarGestiones';
import Bienvenida from './Bienvenida';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
    
        <Route path="/nav" element={<Navba />}>
        <Route path="bienvenida" element={<Bienvenida></Bienvenida>}></Route>
          <Route path="listas" element={<ListasChequeoRecibidas />} />
          <Route path="lector" element={<LectorListaChequeo />} />
          <Route path="crearLudica" element={<RegistrarActividadLudica/>} />
          <Route path="blog" element={<Blog/>} />
          <Route path="listarUsuarios" element={<AdmUsuarios></AdmUsuarios>} />
          <Route path="gestion" element={<Gestion onSubmit={(datos) => console.log("Datos enviados:", datos)} />} ></Route>
            <Route path="detalleGestion" element={<DetalleGestion></DetalleGestion>} />
            <Route path="reportes" element={<ListasReportes></ListasReportes>} />
            <Route path="detalleReporte" element={<DetalleReporte />} />
            <Route path="listarGestiones" element={<ListarGestiones></ListarGestiones>} />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
