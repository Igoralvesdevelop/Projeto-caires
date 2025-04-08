import './Funciocondo.css'
import caires from "../assets/caires.png";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { FaUserTie } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';




function Funciocondo() {
    
  const navigate = useNavigate();

  const Entre = () => {
      navigate('/Login');
  };

  const Condominio = () => {
    navigate('/Cadaminion');
};

const Funcionario = () => {
  navigate('/Cadanario');
};

  
    
return (
    <>
         <div className='box-funco'>
           <div className='rectangle-funco'>
           <div className="rectangle1-funco" />
           <div className="rectangle2-funco" />
           <div className="text-funco">Você já tem Conta?</div>
           <div className="text1-funco">Bem-vindo ao <br></br>Caires!</div>
           <div className="text2-funco" onClick={Entre}>ENTRE.</div>
            <img src={caires} alt="Logo" className="img-funco"/>

            <button className="funcionario"  onClick={Funcionario}>FUNCIONÁRIO</button>
            <FaUserTie  size={40}  color="black" className="icon-func" />


            <button className="condominio"  onClick={Condominio}>CONDOMÍNIO</button>
            <HiOutlineBuildingOffice2 size={40}  color="black" className="icon-apt" />


          
           
             </div>
           </div>
       </>
     )
   }

export default Funciocondo