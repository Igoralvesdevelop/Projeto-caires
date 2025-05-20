import Title from "../components/Title";
import SelectV from "../components/SelectV";
import Button from "../components/Button";
import PickDate from "../components/PickDate";
import DropdownWithRadios from "../components/Dropdown";
import MeuMenu from "../components/MeuMenu";

import { useNavigate } from "react-router-dom";

function VisitantesC() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Funciocondo");
  };
  return (
    <div class="container teste">
      <div class="other-side">
        <div class="contente-1">
          <div>
            <MeuMenu /> {/* Aqui o menu aparece na tela */}
          </div>
          <Title>Adicionar um novo Visitante:</Title>
          <div class="photo-circle"></div>
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
            <Title>RG:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite seu RG"
            />
          </div>
          <div className="input-container">
            <Title>Gênero:</Title>
            <DropdownWithRadios></DropdownWithRadios>
          </div>
          <div className="input-container">
            <Title>Telefone:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite seu telefone"
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
            <PickDate />
          </div>

          <div className="input-container">
            <Title>Data de saída:</Title>
            <PickDate />
          </div>
          <div>
            <SelectV />
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

export default VisitantesC;
