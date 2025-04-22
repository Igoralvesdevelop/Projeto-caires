import express from "express";
import relatorios from "../services/Relatorios-S.js";

const router = express.Router();

router.get("/moradores", async (req, res) => {
    try {
        const data = await relatorios.gerarRelatorioMoradores();
        if (data.length < 1) return res.status(204).end();
        return res.status(200).send({ message: data });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao listar moradores", error: error.message });
    }
});

router.get("/visitantes", async (req, res) => {
    try {
        const data = await relatorios.gerarRelatorioVisitantes();
        if (data.length < 1) return res.status(204).end();
        return res.status(200).send({ message: data });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao listar visitantes", error: error.message });
    }
});

router.get("/eventos", async (req, res) => {
    try {
        const data = await relatorios.gerarRelatorioEventos();
        if (data.length < 1) return res.status(204).end();
        return res.status(200).send({ message: data });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao listar eventos", error: error.message });
    }
});

router.get("/veiculos", async (req, res) => {
    try {
        const data = await relatorios.gerarRelatorioVeiculos();
        if (data.length < 1) return res.status(204).end();
        return res.status(200).send({ message: data });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao listar veículos", error: error.message });
    }
});

export default router;
