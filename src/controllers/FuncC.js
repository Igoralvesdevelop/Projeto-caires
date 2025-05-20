// routes/funcionarios.js
import express from "express";
import funcionario from "../services/FuncS.js";
import { vCpf, vTelefone, validarSenhaForte, validarEmail } from "../helpers/validacoes.js";

const route = express.Router();

route.get("/", async (req, res) => {
  try {
    const funcionarios = await funcionario.listUsuario();
    if (!funcionarios || funcionarios.length < 1) {
      return res.status(404).send({ message: "Nenhum funcionário encontrado." });
    }
    return res.status(200).send(funcionarios);
  } catch (error) {
    console.error("Erro ao listar funcionários:", error);
    return res.status(500).send({ error: "Erro ao listar funcionários. Tente novamente mais tarde." });
  }
});

route.post("/", async (req, res) => {
  const { nome, cpf, senha, telefone, dt_nascimento, genero, nivel_acesso, fk_id_condominio, email } = req.body;

  try {
    if (!nome || !cpf || !senha || !dt_nascimento || !genero || !nivel_acesso || !fk_id_condominio || !email) {
      return res.status(400).send({ message: "Todos os campos obrigatórios devem ser preenchidos." });
    }
    if (!vCpf(cpf)) {
      return res.status(400).send({ message: "CPF inválido." });
    }
    if (!validarSenhaForte(senha)) {
      return res.status(400).send({ message: "A senha deve possuir no mínimo 8 caracteres, 1 caractere especial e 1 número." });
    }
    if (telefone && !vTelefone(telefone)) {
      return res.status(400).send({ message: "Telefone inválido." });
    }
    if (!validarEmail(email)) {
      return res.status(400).send({ message: "E-mail inválido." });
    }

    // Remove formatações de CPF, CNPJ e converte a data de nascimento para o formato MySQL
    const cpfLimpo = cpf.replace(/\D/g, "");
    const dtNascimentoMySQL = formatarDataParaMySQL(dt_nascimento);

    await funcionario.CreateUsuario(nome, cpfLimpo, senha, telefone, dtNascimentoMySQL, genero, nivel_acesso, fk_id_condominio, email);

    return res.status(201).send({ message: "Funcionário cadastrado com sucesso!" });
  } catch (error) {
    console.error("Erro ao cadastrar funcionário:", error);
    return res.status(500).send({ error: "Erro ao cadastrar funcionário. Verifique os dados e tente novamente." });
  }
});

route.put("/:id_usuario", async (req, res) => {
  const { nome, email, cpf, senha, telefone, dt_nascimento, genero, nivel_acesso, fk_id_condominio } = req.body;
  const { id_usuario } = req.params;

  try {
    if (!nome || !cpf || !senha || !dt_nascimento || !genero || !nivel_acesso || !fk_id_condominio || !email) {
      return res.status(400).send({ message: "Todos os campos obrigatórios devem ser preenchidos." });
    }
    if (!vCpf(cpf)) {
      return res.status(400).send({ message: "CPF inválido." });
    }
    if (senha.length < 8) {
      return res.status(400).send({ message: "A senha deve possuir no mínimo 8 caracteres." });
    }
    if (telefone && !vTelefone(telefone)) {
      return res.status(400).send({ message: "Telefone inválido." });
    }
    if (!validarEmail(email)) {
      return res.status(400).send({ message: "E-mail inválido." });
    }

    // Remove formatações de CPF, CNPJ e data de nascimento
    const cpfLimpo = cpf.replace(/\D/g, "");
    const dtNascimentoLimpo = dt_nascimento.replace(/\D/g, "");

    await funcionario.UpdateUsuario(nome, email, cpfLimpo, senha, telefone, dtNascimentoLimpo, genero, nivel_acesso, fk_id_condominio, id_usuario);

    return res.status(200).send({ message: "Funcionário atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar funcionário:", error);
    return res.status(500).send({ error: "Erro ao atualizar funcionário. Verifique os dados e tente novamente." });
  }
});

route.delete("/:id_usuario", async (req, res) => {
  const { id_usuario } = req.params;
  const { fk_id_condominio } = req.body;

  try {
    if (!id_usuario || isNaN(id_usuario) || !fk_id_condominio) {
      return res.status(400).send({ message: "ID ou Condomínio inválido." });
    }
    await funcionario.DeleteUsuario(id_usuario, fk_id_condominio);
    return res.status(200).send({ message: "Funcionário excluído com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir funcionário:", error);
    return res.status(500).send({ error: "Erro ao excluir funcionário. Verifique os dados e tente novamente." });
  }
});

export default route;
