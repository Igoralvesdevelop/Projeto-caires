import SelectE from "../components/SelectE";

import Title from "../components/Title";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function EventosC() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Funciocondo");
  };
  return (
    <div class="container teste">
      <div class="other-side">
        {/* <div class="contente-1"> */}
        <Title>Adicionar um novo Evento:</Title>
        {/* <div class="photo-circle">
        </div>

        </div> */}
      </div>

      <div className="direita-side">
        <div className="putbu">
          <div className="input-container">
            <Title>CPF:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite seu CPF"
            />
          </div>

          <div className="input-container">
            <Title>Título do Evento:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite o título do evento"
            />
          </div>
          <div className="input-container">
            <Title>Descrição do Evento:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite a descrição do evento"
            />
          </div>
          <div>
            <SelectE />
          </div>
        <div className="input-container">
          <Title>Início do Evento:</Title>
          <input
            type="text"
            className="input-fields"
            placeholder="Digite a data do início"
          />
        </div>
        <div className="input-container">
          <Title>Fim do Evento:</Title>
          <input
            type="text"
            className="input-fields"
            placeholder="Digite a data do término"
          />
        </div>
        <div className="input-container">
          <Title>Cor:</Title>
          <input
            type="text"
            className="input-fields"
            placeholder="Digite a cor"
          />
        </div>
        <div className="input-container">
          <Title>Status do Pagamento:</Title>
          <input
            type="text"
            className="input-fields"
            placeholder="Digite o status do pagamento. ex:Pendente"
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

export default EventosC;
