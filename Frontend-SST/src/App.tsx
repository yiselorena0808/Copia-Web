import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navba from './Navbar';
import ListasChequeoRecibidas from './ListasChequeoRecibidas';
import LectorListaChequeo from './LectorListas';
import Login from './Login'; 
import Registro from './Registro'; 
import RegistrarActividadLudica from './CrearLudica';
import Blog from './Blog';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        <Route path="/nav" element={<Navba />}>
          <Route path="listas" element={<ListasChequeoRecibidas />} />
          <Route path="lector" element={<LectorListaChequeo />} />
          <Route path="crearLudica" element={<RegistrarActividadLudica/>} />
          <Route path="blog" element={<Blog/>} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
