import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ButtonR.css";

function ButtonR() {
  const navigate = useNavigate();
  const [abaSelecionada, setAbaSelecionada] = useState(
    localStorage.getItem("abaSelecionada") 
  );

  const abasHorizontais = [
    { nome: "moradores", rota: "/moradores" },
    { nome: "servidor", rota: "/servidor" },
    { nome: "visitantes", rota: "/visitantes" },
    { nome: "veículos", rota: "/veiculos" },
    { nome: "eventos", rota: "/eventos" }
  ];

  useEffect(() => {
    localStorage.setItem("abaSelecionada", abaSelecionada);
  }, [abaSelecionada]);

  return (
    <div className="layout-horizontal">
      <div className="container-horizontal">
        {abasHorizontais.map((aba) => (
          <button
            key={aba.nome}
            className={`botao-horizontal ${abaSelecionada === aba.nome ? "selecionado" : ""}`}
            onClick={() => {
              setAbaSelecionada(aba.nome);
              navigate(aba.rota);
            }}
          >
            {aba.nome.charAt(0).toUpperCase() + aba.nome.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ButtonR;
