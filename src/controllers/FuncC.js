import express from "express";
import funcionario from "../services/FuncS.js";
import { validarCPF } from "../Funçoes/funcoesl.js";

const route = express.Router();

// Endpoint para listar todos os funcionários
route.get("/", async (request, response) => {
    try {
        const Funcionario = await funcionario.listUsuario();
        if (!Funcionario || Funcionario.length < 1) {
            return response.status(404).send({ message: "Nenhum funcionário encontrado." });
        }
        return response.status(200).send(Funcionario); // Removido o objeto "message" para enviar apenas a lista
    } catch (error) {
        console.error("Erro ao listar funcionários:", error);
        return response.status(500).send({ error: "Erro ao listar funcionários. Tente novamente mais tarde." });
    }
});

// Endpoint para criar um funcionário
route.post("/", async (request, response) => {
    const { nome, cpf, senha, telefone, dt_nascimento, genero, nivel_acesso, cnpj } = request.body;

    try {
        if (!nome || !cpf || !senha || !dt_nascimento || !genero || !nivel_acesso) {
            return response.status(400).send({ message: "Todos os campos obrigatórios devem ser preenchidos." });
        }
        if (!validarCPF(cpf)) {
            return response.status(400).send({ message: "CPF inválido." });
        }
        if (senha.length < 8) {
            return response.status(400).send({ message: "A senha deve possuir no mínimo 8 caracteres." });
        }

        await funcionario.CreateUsuario(nome, cpf, cnpj, senha, telefone, dt_nascimento, genero, nivel_acesso);

        return response.status(201).send({ message: "Funcionário cadastrado com sucesso!" });
    } catch (error) {
        console.error("Erro ao cadastrar funcionário:", error);
        return response.status(500).send({ error: "Erro ao cadastrar funcionário. Verifique os dados e tente novamente." });
    }
});

// Endpoint para atualizar um funcionário
route.put("/:id_usuario", async (request, response) => {
    const { nome, email, cpf, senha, telefone, dt_nascimento, genero, nivel_acesso, cnpj } = request.body;
    const { id_usuario } = request.params;

    try {
        if (!nome || !cpf || !senha || !dt_nascimento || !genero || !nivel_acesso) {
            return response.status(400).send({ message: "Todos os campos obrigatórios devem ser preenchidos." });
        }
        if (!validarCPF(cpf)) {
            return response.status(400).send({ message: "CPF inválido." });
        }
        if (senha.length < 8) {
            return response.status(400).send({ message: "A senha deve possuir no mínimo 8 caracteres." });
        }

        await funcionario.UpdateUsuario(nome, email, cpf, cnpj, senha, telefone, dt_nascimento, genero, nivel_acesso, id_usuario);

        return response.status(200).send({ message: "Funcionário atualizado com sucesso!" });
    } catch (error) {
        console.error("Erro ao atualizar funcionário:", error);
        return response.status(500).send({ error: "Erro ao atualizar funcionário. Verifique os dados e tente novamente." });
    }
});

// Endpoint para deletar um funcionário
route.delete("/:id_usuario", async (request, response) => {
    const { id_usuario } = request.params;

    try {
        if (!id_usuario || isNaN(id_usuario)) {
            return response.status(400).send({ message: "ID inválido." });
        }
        await funcionario.DeleteUsuario(id_usuario);
        return response.status(200).send({ message: "Funcionário excluído com sucesso!" });
    } catch (error) {
        console.error("Erro ao excluir funcionário:", error);
        return response.status(500).send({ error: "Erro ao excluir funcionário. Verifique os dados e tente novamente." });
    }
});

export default route;
