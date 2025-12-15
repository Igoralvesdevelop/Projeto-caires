import mongoose from 'mongoose';

const ComunicadoSchema = new mongoose.Schema({
  usuario: { type: String, required: true },
  titulo: { type: String, required: true },
  conteudo: { type: String, required: true },
  imagemUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Comunicado = mongoose.model('Comunicado', ComunicadoSchema);
export default Comunicado;