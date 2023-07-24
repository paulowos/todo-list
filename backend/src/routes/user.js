const express = require('express');
const { createUser } = require('../db/userDB');
const { userValidation } = require('../middlewares/userMiddleware');

const user = express.Router();

user.put('/create', userValidation, async (req, res) => {
  try {
    await createUser(req.body);
    res.status(201).json({ message: 'Usuário criado com sucesso' });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Usuário já existe' });
  }
});

module.exports = user;