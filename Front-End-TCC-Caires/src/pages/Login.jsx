import React, { useState } from "react";
import "./Login.css";
import caires from "../assets/caires.png";
import { IoIosFingerPrint } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Cadastro() {
  const navigate = useNavigate();
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");

  async function realizarLogin() {
    try {
      const response = await fetch("http://localhost:3333/loginFuncionario", {
        method: "POST",
        mode: "cors",
         allowedHeaders: 'Content-Type',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha: password })
      });

      const respJSON = await response.json();
      console.log("RESPOSTA:", respJSON);

      if (response.status === 200) {
        navigate("/Telainicial");
      } else {
        alert(respJSON.message || "Email ou senha incorretos.");
      }
    } catch (error) {
      console.log("ERRO:", error);
      alert("Erro ao conectar com o servidor.");
    }
  }

  const submit = async (event) => {
    event.preventDefault();  
    await realizarLogin();
  };

  const Cadastre = () => {
    navigate("/Funciocondo");
  };

  return (
    <div className="container">
      <div className="left-side">
        <div className="content-1">
          <img src={caires} alt="Logo" className="img-cad" />
        </div>

        <div className="content-2">
          <div className="div-a">
            <h1 className="text2-cad">
              Bem-vindo ao <br /> Caires!
            </h1>
          </div>
          <div className="text1-cad">Cadastre sua conta.</div>
          <div className="button-div">
            <button className="custom-button-cad" onClick={Cadastre}>
              CADASTRE-SE
            </button>
          </div>
        </div>
      </div>

      <div className="right-side">
        <div className="login-div">
          <h1 className="login-cad">LOGIN</h1>
        </div>

        <form className="buput" onSubmit={submit}>
          <div className="input-cad1">
            <MdOutlineMail size={30} color="black" className="icon-email" />
            <input
              type="text"
              className="input-field-cad"
              placeholder="Email:"
              name="email"
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>

          <div className="input1-cad">
            <IoIosFingerPrint size={30} color="black" className="icon-password" />
            <input
              type="password"
              className="input-field-cad"
              placeholder="Senha:"
              name="senha"
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>

          <div className="div-button2">
            <button className="custom-button-cad1" type="submit">
              ENTRAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
