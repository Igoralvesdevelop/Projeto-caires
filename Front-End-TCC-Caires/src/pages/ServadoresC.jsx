import Title from "../components/Title";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function PrestadoresC() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Funciocondo");
  };
  return (
    <div class="container teste">
      <div class="other-side">
        <div class="contente-1">
        <Title>Adicionar um novo Prestador de serviço:</Title>
        <div class="photo-circle">
        </div>

        </div>
      </div>

      <div className="direita-side">
        <div className="putbu">
          <div className="input-container">
            <Title>Nome:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite o seu nome"
            />
          </div>
          <div className="input-container">
            <Title>CPF:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite seu CPF"
            />
          </div>

          <div className="input-container">
            <Title>UF:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite seu UF"
            />
          </div>
          <div className="input-container">
            <Title>Apartamento:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite seu apartamento"
            />
          </div>
          <div className="input-container">
            <Title>Bloco:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite seu bloco"
            />
          </div>
          <div className="input-container">
            <Title>Data de entrada:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite a data de entrada"
            />
          </div>
          <div className="input-container">
            <Title>Data de saída:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite a data de saída"
            />
          </div>

          <div className="contente-3"></div>
          <div class="contente-2">
            <div className="button-div">
              <Button
                text="VOLTAR"
                onClick={handleClick}
                // Função de clique
              />

              <Button
                text="CADASTRAR"
                onClick={() => alert("Botão clicado!")}
                // Função de clique
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrestadoresC;
