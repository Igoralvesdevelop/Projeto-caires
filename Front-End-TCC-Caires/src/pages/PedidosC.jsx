import Title from "../components/Title";
import Button from '../components/Button'


function PedidosC () {


    return (
        <div class="container ">
          
          <div class="othe-side">
            {/* <div class="conten-1"> */}
            <Title>Adicionar uma nova encomenda:</Title>
            {/* <div class="phot-circle">
            </div>
    
            </div> */}
    
           
          </div>
    
          <div className="direit-side">
            <div className="tamanho"></div>
            <div className="putb">
              <div className="input-container">
                <Title>Empresa:</Title>
                <input
                  type="text"
                  className="input-fields"
                  placeholder="Digite a empresa"
                />
              </div>
    
              <div className="input-container">
                <Title>Id_morador:</Title>
                <input
                  type="text"
                  className="input-fields"
                  placeholder="Digite o Id do morador"
                />
              </div>
              <div className="input-container">
                <Title>Data da Entrega:</Title>
                <input
                  type="text"
                  className="input-fields"
                  placeholder="Digite a data de entrega"
                />
              </div>
    
              <div className="input-container">
                <Title>Status da Entrega:</Title>
                <input
                  type="text"
                  className="input-fields"
                  placeholder="Digite o status. ex:Pendente,Processando"
                />
              </div>
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
              <div>
        
        </div>
            
            </div>
          </div>
        </div>
      );
    }

export default PedidosC