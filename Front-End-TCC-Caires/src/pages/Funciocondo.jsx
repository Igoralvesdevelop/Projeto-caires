import "./Funciocondo.css";
import caires from "../assets/caires.png";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { FaUserTie } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Funciocondo() {
  const navigate = useNavigate();

  const Entre = () => {
    navigate("/");
  };

  const Condominio = () => {
    navigate("/Cadaminion");
  };

  const Funcionario = () => {
    navigate("/Cadanario");
  };

  return (
    <div class="container">
      <div class="left-side">
        <div class="content-1">
          <img src={caires} alt="Logo" className="img-cad" />
        </div>

        <div class="content-2">
          <div className="div-a">
            <h1 className="text2-cad">
              Bem-vindo ao <br></br>Caires!
            </h1>{" "}
          </div>
          <div className="content2">
            <div className="text-cad1">Você já tem Conta?</div>
            <div className="diva">
              <h1 className="text-cad" onClick={Entre}>
                ENTRE.
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div class="right-side">
        <div className="fc">
          <button className="funio" onClick={Funcionario}>
            <FaUserTie size={30} className="icon-func" /> FUNCIONÁRIO
          </button>

          <button className="funio" onClick={Condominio}>
            <HiOutlineBuildingOffice2 size={30} className="icon-apt" />{" "}
            CONDOMÍNIO
          </button>
        </div>
      </div>
    </div>
  );
}

export default Funciocondo;
