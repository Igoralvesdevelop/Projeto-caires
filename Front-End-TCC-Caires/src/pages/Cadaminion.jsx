import "./Cadaminion.css";
import Title from "../components/Title";
import SelectComponent from "../components/SelectComponent";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Cadaminion() {
  const navigate = useNavigate();
  const [Condominio, setCondominio] = useState({});
  const [cnpj, setCnpj] = useState("");
  const [cep, setCep] = useState("");

  function handlerChangeCondo(event) {
    setCondominio({ ...Condominio, [event.target.name]: event.target.value });
    console.log(Condominio);
  }

  function formatCnpj(value) {
    return value
      .replace(/\D/g, "") // Remove tudo que não for dígito
      .replace(/^(\d{2})(\d)/, "$1.$2") // Adiciona o primeiro ponto
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3") // Adiciona o segundo ponto
      .replace(/\.(\d{3})(\d)/, ".$1/$2") // Adiciona a barra
      .replace(/(\d{4})(\d)/, "$1-$2") // Adiciona o traço
      .slice(0, 18); // Limita ao tamanho do CNPJ
  }

  function handleCnpjChange(event) {
    const formattedCnpj = formatCnpj(event.target.value);
    setCnpj(formattedCnpj);
    setCondominio({ ...Condominio, cnpj: formattedCnpj });
  }

  function formatCep(value) {
    return value
      .replace(/\D/g, "") // Remove tudo que não for dígito
      .replace(/^(\d{5})(\d)/, "$1-$2") // Adiciona o traço após os primeiros 5 dígitos
      .slice(0, 9); // Limita ao tamanho do CEP
  }

  function handleCepChange(event) {
    const formattedCep = formatCep(event.target.value);
    setCep(formattedCep);
    setCondominio({ ...Condominio, cep: formattedCep });
  }

  function submit(event) {
    event.preventDefault();
    console.log(Condominio);
    insertcondo(Condominio);
  }

  function insertcondo(Condominio) {
    fetch("http://localhost:3333/condominio", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify(Condominio),
    })
      .then((resp) => resp.json())
      .then((respJSON) => {
        console.log("RESPOSTA: " + respJSON);
        navigate("/");
      })
      .catch((error) => {
        console.log("ERRO: " + error);
      });
  }

  const handleClicks = () => {
    navigate("/Funciocondo");
  };

  return (
    <form onSubmit={submit}>
    <div className="container teste">
      <div className="other-side">
        <div className="contente-1">
          <Title>Adicionar um novo Condomínio:</Title>
          <div className="photo-circle"></div>
        </div>
      </div>

      <div className="direita-side">
        <div className="putbu">
        
          <div className="input-container">
            <Title>Nome:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite seu nome"
              id="nome"
              name="nome"
              handlerChange={handlerChangeCondo}
              onChange={handlerChangeCondo}
            />
          </div>

          <div className="input-container">
            <Title>Endereço:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite seu endereço"
              id="endereco"
              name="endereco"
              handlerChange={handlerChangeCondo}
              onChange={handlerChangeCondo}
            />
          </div>
          <div className="input-container">
            <Title>Número de Blocos:</Title>
            <input
              type="number"
              className="input-fields"
              placeholder="Digite o número de blocos"
              id="numero_bloco"
              name="numero_bloco"
              onChange={handlerChangeCondo}
            />
          </div>
          <div className="input-container">
            <Title>Números de Unidades:</Title>
            <input
              type="number"
              className="input-fields"
              placeholder="Digite o número de unidades"
              name="numero_unidades"
              id="numero_unidades"
              onChange={handlerChangeCondo}
            />
          </div>
          <div className="input-container">
            <Title>CEP:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite o CEP"
              id="cep"
              name="cep"
              value={cep}
              onChange={handleCepChange}
            />
          </div>

          <div className="input-container">
            <Title>Ramal:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite o ramal"
              id="ramal"
              name="ramal"
              handlerChange={handlerChangeCondo}
              onChange={handlerChangeCondo}
            />
          </div>
          <div className="input-container">
            <Title>CNPJ:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite o CNPJ"
              value={cnpj}
              id="cnpj"
              name="cnpj"
              handlerChange={handlerChangeCondo}
              onChange={handleCnpjChange}
            />
          </div>

          <div className="contente-3"></div>
          <div className="contente-2">
            <div className="button-div">
              <Button
                text="VOLTAR"
                onClick={handleClicks}

                // Função de clique
              />

              <Button
                text="CADASTRAR"
                onClick={() => alert("Botão clicado!")}
             
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </form>
  );
}

export default Cadaminion;
