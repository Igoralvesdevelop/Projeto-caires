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
route.post("/", async (request, response) =>{
    const {nome, cpf, senha, data_nascimento, id_genero, email, id_unidade} = request.body;
    if(!nome || !cpf || !senha || !data_nascimento || !id_genero || !email || !id_unidade){
        return response.status(400).send({ message: "Todos os campos obrigatórios devem ser preenchidos" });
    }
    if (!vCpf(cpf)) {
        return response.status(400).send({ message: "CPF inválido" });
    }
    
    if(senha.length < 8){
        return response.status(400).send({"message": "A Senha Deve Possuir 8 Caracteres"})
    }
    const cpfLimpo = cpf.replace(/\D/g, "");
      
    const dtNascimentoMySQL = formatarDataParaMySQL(data_nascimento);
    await moradores.CreateMorador(nome, cpfLimpo, id_genero, dtNascimentoMySQL, senha, email, id_unidade);
    
    return response.status(201).send({"message": "Morador cadastrado"})
})
route.put("/:id_unidade", async (request, response)=>{

    const {nome, cpf, senha, data_nascimento, id_genero, email} = request.body;
    const {id_unidade} = request.params;
    
    if(!nome || !cpf || !senha || !id_genero || !data_nascimento || !id_unidade){
        return response.status(400).send({ message: "Todos os campos obrigatórios devem ser preenchidos" });
    }
    if (!vCpf(cpf)) {
        return response.status(400).send({ message: "CPF inválido" });
    }
    
    if(senha.length < 8){
    return response.status(400).send({"message": "A Senha Deve Possuir 8 Caracteres"})
    }
    await moradores.UpdateMorador(nome, cpf, senha, id_genero, data_nascimento, email, id_unidade )

    return response.status(201).send({"message": "Morador atualizado com sucesso"})
})

route.delete("/:id_unidade", async (request, response)=>{
    const {id_unidade} = request.params;
    
    await moradores.DeleteMoradores(id_unidade);
    
    return response.status(200).send({"message":"Usuario excluido com sucesso"})
}),
route.get("/:id_unidade", async (request, response) => {
    const { id_unidade } = request.params;
    const morador = await moradores.getMoradorById(id_unidade);
    if (!morador) {
        return response.status(404).send({ message: "Morador não encontrado" });
    }
    return response.status(200).send({ message: morador });''
});

export default route;