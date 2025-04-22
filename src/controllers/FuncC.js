// Rotas (routes/funcionarios.js)
import express from "express";
import funcionario from "../services/FuncS.js";

const route = express.Router();

// Endpoint para listar todos os funcionários
route.get("/", async (request, response) => {
    const Funcionario = await funcionario.listUsuario();
    if (Funcionario.length < 1) {
        return response.status(204).end();
    }
    return response.status(200).send({ "message": Funcionario });
});

// Endpoint para criar um funcionário
route.post("/", async (request, response) => {
    const { nome, cpf, senha, telefone, dt_nascimento, genero, nivel_acesso } = request.body;

    try {
    if(!nome || !cpf || !senha || !dt_nascimento || !genero || !nivel_acesso){
        return response.status(400).send({ message: "Todos os campos obrigatórios devem ser preenchidos" });
    }
    if (!validarCPF(cpf)) {
        return response.status(400).send({ message: "CPF inválido" });
    }
    
    if(senha.length < 8){
        return response.status(400).send({"message": "A Senha Deve Possuir 8 Caracteres"})
    }
        
        // Chama a função para criar o funcionário
        await funcionario.CreateUsuario(nome, cpf, senha, telefone, dt_nascimento, genero, nivel_acesso);

        return response.status(201).send({ "message": "Funcionário cadastrado com sucesso!" });
    } catch (error) {
        console.error(error);
        return response.status(500).send({ "error": "Erro ao cadastrar funcionário. Verifique os dados e tente novamente." });
    }
});

// Endpoint para atualizar um funcionário
route.put("/:id_usuario", async (request, response) => {
    const { nome, email, cpf, senha, telefone, dt_nascimento, genero, nivel_acesso } = request.body;
    const { id_usuario } = request.params;

    try {
        if(!nome || !cpf || !senha || !dt_nascimento || !genero || !nivel_acesso){
            return response.status(400).send({ message: "Todos os campos obrigatórios devem ser preenchidos" });
        }
        if (!validarCPF(cpf)) {
            return response.status(400).send({ message: "CPF inválido" });
        }
        
        if(senha.length < 8){
            return response.status(400).send({"message": "A Senha Deve Possuir 8 Caracteres"})
        }
        await funcionario.UpdateUsuario(nome, email, cpf, senha, telefone, dt_nascimento, genero, nivel_acesso, id_usuario);
        return response.status(200).send({ "message": "Funcionário atualizado com sucesso!" });
    } catch (error) {
        console.error(error);
        return response.status(500).send({ "error": "Erro ao atualizar funcionário. Verifique os dados e tente novamente." });
    }
});

// Endpoint para deletar um funcionário
route.delete("/:id_usuario", async (request, response) => {
    const { id_usuario } = request.params;

    try {
        await funcionario.DeleteUsuario(id_usuario);
        return response.status(200).send({ "message": "Funcionário excluído com sucesso!" });
    } catch (error) {
        console.error(error);
        return response.status(500).send({ "error": "Erro ao excluir funcionário. Verifique os dados e tente novamente." });
    }
});

export default route;
