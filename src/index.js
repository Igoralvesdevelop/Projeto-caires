// Importando framework express
import express from 'express';
import cors from 'cors';
import routes from './routes.js';
import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://IgorAlves:SvqIliDMGs1D7WUs@cluster0.im0mg.mongodb.net/'; // URL do MongoDB
const server = express();
// Conectando ao MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB conectado!'))
.catch(err => console.error('Erro ao conectar no MongoDB:', err));
server.use(cors());
server.use(express.json());

// Rotas principais
server.use('/', routes);

// Definindo porta e mensagem do servidor
server.listen(3333, () => {
  console.log('Server rodando em http://localhost:3333');
});
