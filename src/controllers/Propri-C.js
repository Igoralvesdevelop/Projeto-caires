import express, { request, response } from 'express';
import propietarioS from '../services/propietario-S.js';

const route = express.Router();

route.get("/", async (request, response) => {
    const Proprietario = await propietarioS.listProprietario();
    if (Proprietario.length < 1) {
        return response.status(204).end();
    }
    return response.status(200).send({ "message": Proprietario });
});


route.post("/", async (request, response) => {
    const { nome, cpf, data_nascimento,id_genero, email } = request.body;
    
    //  if(!nome || !cpf || !data_nascimento  ||id_genero || !email){
    //         return response.status(400).send({ message: "Todos os campos obrigatórios devem ser preenchidos" });
    //     }

    await propietarioS.CreateProprietario(nome, cpf, data_nascimento, id_genero,  email);

    return response.status(201).send({ "message": "Proprietario cadastrado com sucesso" });
});

route.put("/:id_proprietario", async (request, response) => {
    const {nome, cpf, data_nascimento,id_genero, email } = request.body;
    const { id_propriedade } = request.params;

    if(!nome || !cpf || !data_nascimento || !id_genero || !email){
        return response.status(400).send({ message: "Todos os campos obrigatórios devem ser preenchidos" });
    }
    await propietarioS.Updateproprietario(nome, cpf, data_nascimento,id_genero, email, id_propriedade);
    return response.status(200).send({ "message": "Proprietario atualizado com sucesso" });
});


route.delete("/:id_proprietario", async (request, response) => {
    const { id_proprietario } = request.params;

    if (!id_proprietario) {
        return response.status(400).send({ message: "ID do proprietário é obrigatório" });
    }

    await propietarioS.DeleteFuncionario(id_proprietario);
    return response.status(200).send({ "message": "Proprietario deletado com sucesso" });
});

export default route;
