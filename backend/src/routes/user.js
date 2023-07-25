const express = require('express');
const { createUser, editUser, deleteUser } = require('../db/userDB');
const { userValidation, loginValidation, editValidation } = require('../middlewares/userMiddlewares');

const user = express.Router();

user.post('/', loginValidation, async (req, res) => {
  const { id } = req.body;
  res.status(200).json({ id });
});

user.post('/create', userValidation, async (req, res) => {
  try {
    const id = await createUser(req.body);
    res.status(201).json({ id });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Usuário já existe' });
  }
});

user.put('/', editValidation, async (req, res) => {
  try {
    const affectedRows = await editUser(req.body);
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.status(200).json({ affectedRows });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Erro ao editar usuário' });
  }
});

user.delete('/', loginValidation, async (req, res) => {
  try {
    const affectedRows = await deleteUser(req.body);
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.status(200).json({ affectedRows });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
});

module.exports = user;