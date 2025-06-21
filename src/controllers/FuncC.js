import express from "express";
import funcionario from "../services/FuncS.js";
import { vCpf } from "../helpers/validacoes.js";

const route = express.Router();

function formatarDataParaMySQL(data) {
    const [dia, mes, ano] = data.split("/");
    return `${ano}-${mes}-${dia}`;
}


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
    const { nome, cpf, telefone, data_nascimento, genero, nivel_acesso, id_condominio } = req.body;

    try {
        if (!nome || !cpf || !data_nascimento || !genero || !nivel_acesso || !id_condominio) {
            return res.status(400).send({ message: "Todos os campos obrigatórios devem ser preenchidos." });
        }
        if (!vCpf(cpf)) {
            return res.status(400).send({ message: "CPF inválido." });
        }

        const cpfLimpo = cpf.replace(/\D/g, "");
        const dataNascimentoMySQL = formatarDataParaMySQL(data_nascimento);

        await funcionario.CreateUsuario(nome, cpfLimpo, telefone, dataNascimentoMySQL, genero, nivel_acesso, id_condominio);

        return res.status(201).send({ message: "Funcionário cadastrado com sucesso!" });
    } catch (error) {
        console.error("Erro ao cadastrar funcionário:", error);
        return res.status(500).send({ error: "Erro ao cadastrar funcionário. Verifique os dados e tente novamente." });
    }
});


route.put("/:id_usuario", async (req, res) => {
    const { nome, email, cpf, telefone, data_nascimento, genero, nivel_acesso, id_condominio } = req.body;
    const { id_usuario } = req.params;

    try {
        if (!nome || !cpf || !data_nascimento || !genero || !nivel_acesso || !id_condominio) {
            return res.status(400).send({ message: "Todos os campos obrigatórios devem ser preenchidos." });
        }
        if (!vCpf(cpf)) {
            return res.status(400).send({ message: "CPF inválido." });
        }

        const cpfLimpo = cpf.replace(/\D/g, "");
        const dataNascimentoMySQL = formatarDataParaMySQL(data_nascimento);

        await funcionario.UpdateUsuario(nome, email, cpfLimpo, telefone, dataNascimentoMySQL, genero, nivel_acesso, id_condominio, id_usuario);

        return res.status(200).send({ message: "Funcionário atualizado com sucesso!" });
    } catch (error) {
        console.error("Erro ao atualizar funcionário:", error);
        return res.status(500).send({ error: "Erro ao atualizar funcionário. Verifique os dados e tente novamente." });
    }
});


route.delete("/:id_usuario", async (req, res) => {
    const { id_usuario } = req.params;
    const { id_condominio } = req.body;

    try {
        if (!id_usuario || isNaN(id_usuario) || !id_condominio) {
            return res.status(400).send({ message: "ID ou condomínio inválido." });
        }
        await funcionario.DeleteUsuario(id_usuario, id_condominio);
        return res.status(200).send({ message: "Funcionário excluído com sucesso!" });
    } catch (error) {
        console.error("Erro ao excluir funcionário:", error);
        return res.status(500).send({ error: "Erro ao excluir funcionário. Verifique os dados e tente novamente." });
    }
});

export default route;
