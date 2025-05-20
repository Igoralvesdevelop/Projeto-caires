import React from "react";
import "./impressao.css"; // Certifique-se de usar o CSS que você forneceu
import cairesd from "../assets/cairesd.png";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Impressao() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Telainicial");
  };

  const Cadastre = () => {
    navigate("/Funciocondo");
  };

  return (
    <div class="container">
      <div class="oeste-side">
        <div class="content-1"></div>
        <div class="busca-2">
          <div className="div-a">
            <div className="busca-contain">
              <IoIosSearch size={20} color="black" className="input-icon" />
              <input
                type="text"
                className="input-fiels"
                placeholder="procurar"
              />
            </div>
          </div>
          <div class="div-but">
            <button className="custom-button-cad" onClick={Cadastre}>
              ACESSAR
            </button>
          </div>
        </div>
      </div>

      <div class="right-side">
        <div className="login-div">
          <h1 className="login-cad">
            {" "}
            <img src={cairesd} alt="Logo" className="img-cad" />
          </h1>
        </div>

        <div className="buput"></div>
        <div className="div-button2">
          <button className="custom-button-cad1" onClick={handleClick}>
            VOLTAR
          </button>
        </div>
      </div>
    </div>
  );
}

export default Impressao;
