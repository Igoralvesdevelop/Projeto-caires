import React, { useState } from "react";
import "./Login.css";
import caires from "../assets/caires.png";
import { IoIosFingerPrint } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Cadastro() {
  const navigate = useNavigate();
  const [login, setLogin] = useState({ email: "", senha: "" });

  function handlerLogin(event) {
    setLogin({ ...login, [event.target.name]: event.target.value });
  }

  async function realizarLogin(login) {
    try {
      const response = await fetch("http://localhost:3333/loginFunciorario", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify(login)
      });

      const respJSON = await response.json();
      console.log("RESPOSTA:", respJSON);

      navigate("/Telainicial");

    } catch (error) {
      console.log("ERRO:", error);
    }
  }

  const submit = async (event) => {
    event.preventDefault();
    await realizarLogin(login);
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
              onChange={handlerLogin}
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
              onChange={handlerLogin}
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
