import './Telainicial.css'
import cairesazul from "../assets/cairesazul.png"
import { LiaBlackTie } from "react-icons/lia";
import { FaUserCheck } from "react-icons/fa";
import { FaUserAltSlash } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { IoPersonAdd } from "react-icons/io5";
import { IoPeopleSharp } from "react-icons/io5";
import { FaUnlock } from "react-icons/fa6";
import { IoIosMenu } from "react-icons/io";








function Telainicial() {
    

    
return (
    <>
         <div className='box-inicial'>
           <div className='rectangle-inicial'>

            <div className="inicio" />
            <div className="inicio0" />
            <div className="inicio1" />


           <div className="rectangle1-inicial" />
           <IoIosMenu  size={100} color="black" className="icon-menu" />

           <div className='retangulo0' />
            <IoPerson  size={26} color="black" className="icon-morador"/>
            <h1 className="h1-morador">Moradores Ativos</h1>

           <div className='retangulo1' />
           <LiaBlackTie size={35} color="black" className="icon-servidor" />
           <h1 className="h1-servidor">Prestadores</h1>


           <div className='retangulo2' />
           <IoPersonAdd  size={26} color="black" className="icon-visitante"/>
           <h1 className="h1-visitante">Visitantes</h1>



           <div className='retangulo3' />
           <IoPeopleSharp size={34} color="black" className="icon-visitantel" />
           <h1 className="h1-visitantel">Visitantes Liberados</h1>


           <div className='retangulo4' />
           <FaUnlock  size={24} color="black" className="icon-prestador" />
           <h1 className="h1-prestador">Prestadores Liberados</h1>



           <div className='retangulo5' />
           <FaUserAltSlash size={28} color="black" className="icon-acessn" />
           <h1 className="h1-acessn">Acessos Negados</h1>



           <div className='retangulo6' />
           <FaUserCheck  size={28} color="black" className="icon-acessl"/>
           <h1 className="h1-acessl">Acessos Liberados</h1>


           <h1 className="h1-inicio">Ínicio</h1>
           <h1 className="h1-registro">Registro</h1>
           <h1 className="h1-pedido">Pedido</h1>


            <img src={cairesazul} alt="Logo" className="img-inicial"/>


           
          
           
             </div>
           </div>
       </>
     )
   }

export default Telainicial