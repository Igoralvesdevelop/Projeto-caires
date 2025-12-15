import express, {request, response} from 'express';
import Areas from '../services/Areas-S.js'
const route = express.Router();


route.get("/", async (request, response) => {
    const Area = await Areas.listAreas();
    if (Area.length < 1) {
        return response.status(204).end();
    }
    return response.status(200).send({ "message": "Lista de Níveis de Áreas", "data": Area });
});
export default route;