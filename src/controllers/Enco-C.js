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
    const { empresa, id_unidade} = request.body;
    const { status_entrega, data_entrega } = "entregue"
    const imagem = request.file ? request.file.filename : null;

    if (!empresa || !id_unidade) {
        return response.status(400).send({ message: "Empresa e id_unidade são obrigatórios" });
    }

    try {
        await encomendas.createEncomenda(
            empresa,
            id_unidade,
            status_entrega,
            imagem,
            data_entrega
        );
        return response.status(201).send({ message: "Encomenda cadastrada com sucesso" });
    } catch (error) {
        return response.status(500).send({ message: "Erro ao cadastrar encomenda", error: error.message });
    }
});

// Listar todas as encomendas
route.get("/", async (request, response) => {
    try {
        const lista = await encomendas.listEncomendas();
        if (lista.length < 1) {
            return response.status(204).end();
        }
        return response.status(200).send({ message: lista });
    } catch (error) {
        return response.status(500).send({ message: "Erro ao listar encomendas", error: error.message });
    }
});

// Buscar encomenda por ID
route.get("/:id_encomenda", async (request, response) => {
    const { id_encomenda } = request.params;
    try {
        const encomenda = await encomendas.getEncomendaById(id_encomenda);
        if (!encomenda) {
            return response.status(404).send({ message: "Encomenda não encontrada" });
        }
        return response.status(200).send({ message: encomenda });
    } catch (error) {
        return response.status(500).send({ message: "Erro ao buscar encomenda", error: error.message });
    }
});

// Atualizar encomenda
route.put("/:id_encomenda", upload.single("imagem"), async (request, response) => {
    const { empresa, id_unidade, status_entrega, data_entrega } = request.body;
    const { id_encomenda } = request.params;
    const imagem = request.file ? request.file.filename : undefined;

    if (!empresa || !id_unidade) {
        return response.status(400).send({ message: "Empresa e id_unidade são obrigatórios" });
    }

    try {
        await encomendas.updateEncomenda(
            empresa,
            id_unidade,
            status_entrega,
            imagem,
            data_entrega,
            id_encomenda
        );
        return response.status(200).send({ message: "Encomenda atualizada com sucesso" });
    } catch (error) {
        return response.status(500).send({ message: "Erro ao atualizar encomenda", error: error.message });
    }
});

// Deletar encomenda
route.delete("/:id_encomenda", async (request, response) => {
    const { id_encomenda } = request.params;
    try {
        await encomendas.deleteEncomenda(id_encomenda);
        return response.status(200).send({ message: "Encomenda excluída com sucesso" });
    } catch (error) {
        return response.status(500).send({ message: "Erro ao excluir encomenda", error: error.message });
    }
});

export default route;
