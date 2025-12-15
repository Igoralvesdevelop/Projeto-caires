import express, {request, response} from 'express';
import { vCpf } from '../helpers/validacoes.js';
import moradores from "../services/Mora-S.js";

const route = express.Router();

function formatarDataParaMySQL(data) {
    const [dia, mes, ano] = data.split("/");
    return `${ano}-${mes}-${dia}`;
}
route.get("/", async (request, response) =>{
    const Morador = await moradores.listMorador();
    if(Morador.length <1){
        return response.status(204).end()
    }
    return response.status(200).send({"message":Morador})
})
route.post("/", async (request, response) => {
    const { nome, cpf, senha, data_nascimento, id_genero, email, id_unidade } = request.body;

    // Verificar se todos os campos obrigatórios estão presentes
    if (!nome || !cpf || !senha || !data_nascimento || !id_genero || !email || !id_unidade) {
        return response.status(400).send({ message: "Todos os campos obrigatórios devem ser preenchidos" });
    }

    // Validar CPF
    if (!vCpf(cpf)) {
        return response.status(400).send({ message: "CPF inválido" });
    }

    // Validar tamanho da senha
    if (senha.length < 8) {
        return response.status(400).send({ message: "A Senha Deve Possuir 8 Caracteres" });
    }

    try {
        const cpfLimpo = cpf.replace(/\D/g, "");
        const dtNascimentoMySQL = formatarDataParaMySQL(data_nascimento);

        await moradores.CreateMorador(nome, cpfLimpo, senha, id_genero, dtNascimentoMySQL, email, id_unidade);

        return response.status(201).send({ message: "Morador cadastrado" });
    } catch (error) {
        console.error("Erro ao criar morador:", error.message);
        return response.status(500).send({ message: "Erro interno no servidor" });
    }
})
route.put("/:id_unidade", async (request, response) => {
    const { nome, cpf, senha, data_nascimento, id_genero, email } = request.body;
    const { id_unidade } = request.params;

    if (!nome || !cpf || !senha || !id_genero || !data_nascimento || !id_unidade) {
        return response.status(400).send({ message: "Todos os campos obrigatórios devem ser preenchidos" });
    }
    if (!vCpf(cpf)) {
        return response.status(400).send({ message: "CPF inválido" });
    }
    if (senha.length < 8) {
        return response.status(400).send({ message: "A Senha Deve Possuir 8 Caracteres" });
    }

    try {
        const cpfLimpo = cpf.replace(/\D/g, "");
        const dtNascimentoMySQL = formatarDataParaMySQL(data_nascimento);

        await moradores.UpdateMorador(nome, cpfLimpo, senha, id_genero, dtNascimentoMySQL, email, id_unidade);

        return response.status(200).send({ message: "Morador atualizado com sucesso" });
    } catch (error) {
        console.error("Erro ao atualizar morador:", error.message);
        return response.status(500).send({ message: "Erro interno no servidor" });
    }
});

route.delete("/:id_unidade", async (request, response) => {
    const { id_unidade } = request.params;

    try {
        await moradores.Deletemorador(id_unidade);
        return response.status(200).send({ message: "Usuário excluído com sucesso" });
    } catch (error) {
        console.error("Erro ao excluir morador:", error.message);
        return response.status(500).send({ message: "Erro interno no servidor" });
    }
});

route.get("/:id_unidade", async (request, response) => {
    const { id_unidade } = request.params;
    const morador = await moradores.getMoradorById(id_unidade);
    if (!morador) {
        return response.status(404).send({ message: "Morador não encontrado" });
    }
    return response.status(200).send({ message: morador });''
});
route.get("/:id_morador", async (request, response) => {
    const { id_visitante } = request.params;

    try {
        const visitante = await visitantes.getVisitanteById(id_visitante);
        if (!visitante) {
            return response.status(404).send({ message: "Visitante não encontrado" });
        }
        return response.status(200).send({ message: visitante });
    } catch (error) {
        return response.status(500).send({ message: "Erro ao buscar visitante", error: error.message });
    }
});

export default route;