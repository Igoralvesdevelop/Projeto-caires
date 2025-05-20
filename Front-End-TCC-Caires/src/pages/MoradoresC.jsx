import Title from "../components/Title";
import SelectComponent from "../components/SelectComponent";
import Button from "../components/Button";
import DropdownWithRadios from "../components/Dropdown";
import PickDate from "../components/PickDate";
import MeuMenu from "../components/MeuMenu";


function MoradoresC() {
  return (
    <div class="container teste">
      <div class="other-side">
        <div class="contente-1">
          <div>
      <MeuMenu /> {/* Aqui o menu aparece na tela */}
    </div>
          <Title>Adicionar um novo Morador:</Title>
          <div class="photo-circle"></div>
        </div>
      </div>

      <div className="direita-side">
        <div className="tamanho"></div>
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
              placeholder="Digite seu endereço"
            />
          </div>
          <div className="input-container">
            <Title>Data de Nascimento:</Title>
            <PickDate />
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
              placeholder="Digite seu nome"
            />
          </div>
          <div className="input-container">
            <Title>Email:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite seu email"
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
            <Title>Ramal:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite seu ramal"
            />
          </div>
         
          <div className="input-container">
            <Title>Senha:</Title>
            <input
              type="text"
              className="input-fields"
              placeholder="Digite sua senha"
            />
          </div>

          <div>
            <div className="contente-3"></div>
            <div class="contente-2">
              <div className="button-div">
                <Button
                  text="VOLTAR"
                  onClick={() => alert("Botão clicado!")} // Função de clique
                />

                <Button
                  text="CADASTRAR"
                  onClick={() => alert("Botão clicado!")} // Função de clique
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoradoresC;
