import { useState } from 'react';
import './App.css';
import { IoIosFingerPrint } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import caires from './assets/caires.png'
import Funciocondo from './pages/Funciocondo'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login  from './pages/Login.jsx'
import Telainicial from './pages/TelaInicial.jsx';
import Cadaminion from './pages/Cadaminion.jsx';
import Cadanario from './pages/Cadanario.jsx';






function Rotas() {
  return(
    <Router>
      <Routes>
        <Route path='/Funciocondo' element={<Funciocondo/>} />
        <Route path='/' element={<Login/>} />
        <Route path='/Telainicial' element={<Telainicial/>} />
        <Route path='/Cadaminion' element={<Cadaminion/>} />
        <Route path='/Cadanario' element={<Cadanario/>} />

      </Routes>
      </Router>
  );
}

export default Rotas;
