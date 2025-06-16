import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navba from "./Navbar";
import Login from "./Login";
import Registro from "./Registro";




const App: React.FC = () => {
  return (
    <Router>
      <Navba></Navba>
      <Routes>
        <Route path="/"element={<Login></Login>}></Route>
        <Route path="/registro"element={<Registro></Registro>}></Route>
        <Route path="/nav"element={<Navba></Navba>}></Route>
      </Routes>
    </Router>
  )
}
export default App
