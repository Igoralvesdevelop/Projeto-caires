import express from 'express';
import Comunicado from '../services/Comunicados.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Para usar __dirname em ES modules:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads/'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Rota para criar comunicado com imagem
router.post('/', upload.single('imagem'), async (req, res) => {
  try {
    const { usuario, titulo, conteudo } = req.body;
    // Salva apenas o caminho relativo
    const imagemUrl = req.file ? `uploads/${req.file.filename}` : null;

    const novo = new Comunicado({ usuario, titulo, conteudo, imagemUrl });
    const salvo = await novo.save();
    res.status(201).json(salvo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const comunicados = await Comunicado.find();
    res.status(200).json(comunicados);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;