const express = require('express');
const router = express.Router();
const User = require('../models/User');
const multer = require('multer');
const path = require('path');

// Configuração do Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Criar um novo usuário
router.post('/', upload.single('arquivo'), async (req, res) => {
  try {
    const { nome, cpf, dataNascimento, estadoCivil, telefone } = req.body;
    const arquivo = req.file ? req.file.filename : null;

    const newUser = new User({
      nome,
      cpf,
      dataNascimento,
      estadoCivil,
      telefone,
      arquivo
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obter todos os usuários
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obter um usuário pelo ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Atualizar um usuário pelo ID
router.put('/:id', upload.single('arquivo'), async (req, res) => {
  try {
    const { nome, cpf, dataNascimento, estadoCivil, telefone } = req.body;
    const arquivo = req.file ? req.file.filename : null;

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    user.nome = nome;
    user.cpf = cpf;
    user.dataNascimento = dataNascimento;
    user.estadoCivil = estadoCivil;
    user.telefone = telefone;
    if (arquivo) user.arquivo = arquivo;

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Excluir um usuário pelo ID
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.json({ message: 'Usuário excluído' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
