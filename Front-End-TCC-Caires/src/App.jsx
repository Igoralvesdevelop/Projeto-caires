import { useState } from 'react';
import './App.css';
import { IoIosFingerPrint } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import caires from './assets/caires.png'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login  from './pages/Login.jsx';
import Funciocondo from './pages/Funciocondo.jsx';
import Telainicial from './pages/TelaInicial.jsx';
        /*cadastros*/
import Cadaminion from './pages/Cadaminion.jsx';
import Cadanario from './pages/Cadanario.jsx';
import MoradoresC from './pages/MoradoresC.jsx';
import VeiculosC from './pages/VeiculosC.jsx';
import VisitantesC from './pages/VisitantesC.jsx'
import PedidosC from './pages/PedidosC.jsx';
import EventosC from './pages/EventosC.jsx';
import PrestadoresC from './pages/ServadoresC.jsx';



function Rotas() {
  return(
    <Router>
      <Routes>
        <Route path='/Funciocondo' element={<Funciocondo/>} />
        <Route path='/' element={<Login/>} />
        <Route path='/Telainicial' element={<Telainicial/>} />
        <Route path='/Cadaminion' element={<Cadaminion/>} />
        <Route path='/Cadanario' element={<Cadanario/>} />
        <Route path='/MoradoresC' element={<MoradoresC/>} />
        <Route path='/VeiculosC' element={<VeiculosC/>} />
        <Route path='/VisitantesC' element={<VisitantesC/>} />
        <Route path='/PedidosC' element={<PedidosC/>} />
        <Route path='/EventosC' element={<EventosC/>} />
        <Route path='/PrestadoresC' element={<PrestadoresC/>} />




      </Routes>
      </Router>
  );
}

export default Rotas;
