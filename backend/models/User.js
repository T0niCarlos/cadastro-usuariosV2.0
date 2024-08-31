const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cpf: { type: String, required: true },
  dataNascimento: { type: Date, required: true },
  estadoCivil: { type: String, required: true },
  telefone: { type: String, required: true },
  arquivo: { type: String } // Armazenará o caminho do arquivo
});

module.exports = mongoose.model('User', userSchema);
