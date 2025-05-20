import express, {request, response} from 'express';
import Acesso from "../services/NivelAcesso.js";
const route = express.Router();


route.get("/", async (request, response) => {
    const NivelAcesso = await Acesso.listAcesso();
    if (NivelAcesso.length < 1) {
        return response.status(204).end();
    }
    return response.status(200).send({ "message": "Lista de Níveis de Acesso", "data": NivelAcesso });
});
export default route;