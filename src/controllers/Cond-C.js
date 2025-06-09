import express from 'express';
import condominio from "../services/cond-S.js";
import { validarCEP, vCNPJ } from '../helpers/validacoes.js';
import nodemailer from 'nodemailer';

const route = express.Router();


route.get("/", async (request, response) => {
    const Condominio = await condominio.listCond();
    if (Condominio.length < 1) {
        return response.status(204).end();
    }
    return response.status(200).send({ "message": Condominio });
});


route.post("/", async (request, response) => {
    const {nome, numero_bloco, numero_unidades, ramal, cep, endereco, cnpj, email } = request.body;
    if(!nome || !numero_bloco || !numero_unidades || !ramal || !cep || !endereco || !cnpj || !email){
        return response.status(400).send({ message: "Todos os campos obrigatórios devem ser preenchidos" });
    }
    if (!vCNPJ(cnpj)) {
        return response.status(400).send({ message: "CNPJ inválido" });
    }

    try {
        const novoCondominio = await condominio.createCondominio(nome, numero_bloco, numero_unidades, ramal, cep, endereco, cnpj, email);
        const codigoCondominio = novoCondominio.id_condominio;

        const smtp = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // CORRETO para porta 587
            auth: {
                user: 'cairessecurit@gmail.com',
                pass: 'caires123'
            }
        });

        const configemail = {
            from: "cairessecurit@gmail.com",
            to: email,
            subject: 'Cadastro de Condomínio',
            html: `<h1>Cadastro de Condomínio realizado com sucesso!</h1>
                   <p>O código do seu condomínio é: <b>${codigoCondominio}</b></p>`
        };

        // Envia o e-mail e aguarda o resultado
        await smtp.sendMail(configemail);

        return response.status(201).send({ "message": "Condominio cadastrado com sucesso", codigo: codigoCondominio });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return response.status(409).send({ message: "E-mail já cadastrado para outro condomínio." });
        }
        return response.status(500).send({ message: "Erro interno ao cadastrar condomínio", error: error.message });
    }
});

route.put("/:id_condominio", async (request, response) => {
    const {nome, numero_bloco, numero_unidades, ramal, cep, endereco, cnpj  } = request.body;
    const { id_condominio } = request.params;
    
    if(!nome, !numero_bloco || !numero_unidades || !ramal || !cep ||!endereco, !cnpj ){
        return response.status(400).send({ message: "Todos os campos obrigatórios devem ser preenchidos" });
    }
    if (!vCNPJ(cnpj)) {
        return response.status(400).send({ message: "CPF inválido" });
    }
    if (!validarCEP(cep)) {
        return response.status(400).send({ message: "CEP inválido" });
    }

    await condominio.updateCondominio(nome, numero_bloco, numero_unidades, ramal, cep, endereco, cnpj, id_condominio);

    return response.status(200).send({ "message": "Condominio atualizado com sucesso" });
});


route.delete("/:id_condominio", async (request, response) => {
    const { id_condominio } = request.params;

    await condominio.deleteCondominio(id_condominio);

    return response.status(200).send({ "message": "Condominio excluído com sucesso" });
});

export default route;
