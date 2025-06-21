import express from "express";
import multer from "multer";
import path from "path";
import encomendas from "../services/Enco-S.js";

const route = express.Router();

// Configuração do multer para salvar imagens na pasta 'uploads'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Cadastrar encomenda
route.post("/", upload.single("imagem"), async (request, response) => {
    const { empresa, id_unidade, status_entrega, data_entrega } = request.body;
    const imagem = request.file ? request.file.filename : null;

    if (!empresa || !id_unidade || !status_entrega) {
        return response.status(400).send({ message: "Todos os campos obrigatórios devem ser preenchidos" });
    }

    await encomendas.createEncomenda(empresa, id_unidade, status_entrega, imagem, data_entrega || null);

    return response.status(201).send({ message: "Encomenda cadastrada com sucesso" });
});

// Listar todas as encomendas
route.get("/", async (request, response) => {
    const lista = await encomendas.listEncomendas();
    if (lista.length < 1) {
        return response.status(204).end();
    }
    return response.status(200).send({ message: lista });
});

// Buscar encomenda por ID
route.get("/:id_encomenda", async (request, response) => {
    const { id_encomenda } = request.params;
    const encomenda = await encomendas.getEncomendaById(id_encomenda);
    if (!encomenda) {
        return response.status(404).send({ message: "Encomenda não encontrada" });
    }
    return response.status(200).send({ message: encomenda });
});

// Atualizar encomenda
route.put("/:id_encomenda", upload.single("imagem"), async (request, response) => {
    const { empresa, id_unidade, status_entrega, data_entrega } = request.body;
    const { id_encomenda } = request.params;
    const imagem = request.file ? request.file.filename : null;

    if (!empresa || !id_unidade || !status_entrega) {
        return response.status(400).send({ message: "Todos os campos obrigatórios devem ser preenchidos" });
    }

    await encomendas.updateEncomenda(empresa, id_unidade, status_entrega, imagem, data_entrega || null, id_encomenda);

    return response.status(200).send({ message: "Encomenda atualizada com sucesso" });
});

// Deletar encomenda
route.delete("/:id_encomenda", async (request, response) => {
    const { id_encomenda } = request.params;
    await encomendas.deleteEncomenda(id_encomenda);
    return response.status(200).send({ message: "Encomenda excluída com sucesso" });
});

export default route;
