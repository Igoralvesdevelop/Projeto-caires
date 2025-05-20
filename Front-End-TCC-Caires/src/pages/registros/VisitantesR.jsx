import "./MoradoresR.css";
import cairesa from "../../assets/cairesazul.png";
import { IoIosSearch } from "react-icons/io";
import ButtonR from "../../components/ButtonR";
import ButtonAz from "../../components/ButtonAz";
import MenuC from "../../components/MenuC";

function VisitantesR() {
  return (
    
    <div className="container-principal">
      {/* Container dos botões - Não interfere no alinhamento */}
      <div className="container-botoes">
        <ButtonAz />
      </div>

      {/* Container principal do conteúdo */}
      <div className="continent-4">
        <div className="continente scroll">
       
          {/* Barra de pesquisa */}
          <div className="pesquisa-side">
            <div className="continente-1">
            <div>
      <MenuC /> {/* Aqui o menu aparece na tela */}
    </div>
              <img src={cairesa} alt="Logo" className="img-cadA" />
            </div>
            <div className="procura-2">
              <div className="input-contain">
                <IoIosSearch size={20} color="black" className="input-icon" />
                <input
                  type="text"
                  className="input-fiels"
                  placeholder="procurar"
                />
              </div>
            </div>
          </div>

          {/* Lista de Informações */}
          <div className="label-side">
            <div className="dive-label">
              <div className="div-label">
                <p>Nome:</p>
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="text-container">
                    <text className="text-fields"></text>
                  </div>
                ))}
              </div>
              <div className="div1-label">
                <p>Ramal:</p>
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="text-container">
                    <text className="text-fields"></text>
                  </div>
                ))}
              </div>
              <div className="div2-label">
                <p>Telefone:</p>
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="text-container">
                    <text className="text-fields"></text>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisitantesR;
