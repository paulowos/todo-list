const express = require('express');
const { createTask, completeTask, getTasks, deleteTask, editTask } = require('../db/tasksDB');
const { idValidation, taskValidation } = require('../middlewares/tasksMiddlewares');


const tasks = express.Router();
tasks.use(idValidation);

tasks.get('/', async (req, res) => {
  const { authorization } = req.headers;
  try {
    const rows = await getTasks(authorization);
    res.status(200).json(rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Erro ao listar tarefas' });
  }
});

tasks.post('/', taskValidation, async (req, res) => {
  try {
    const { authorization } = req.headers;
    const { task } = req.body;
    const id = await createTask(task, authorization);
    res.status(200).json({ id, task });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
});

tasks.patch('/:taskID', async (req, res) => {
  try {
    const { taskID } = req.params;
    const { authorization } = req.headers;
    const affectedRows = await completeTask(taskID, authorization);
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    res.status(200).json({ affectedRows });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Erro ao completar tarefa' });
  }
});

tasks.put('/:taskID', taskValidation, async (req, res) => {
  try {
    const { taskID } = req.params;
    const { authorization } = req.headers;
    const { task } = req.body;
    const affectedRows = await editTask(task, taskID, authorization);
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    res.status(200).json({ affectedRows });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Erro ao editar tarefa' });
  }
});

tasks.delete('/:taskID', async (req, res) => {
  try {
    const { taskID } = req.params;
    const { authorization } = req.headers;
    const affectedRows = await deleteTask(taskID, authorization);
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    res.status(200).json({ affectedRows });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Erro ao deletar tarefa' });
  }
});

module.exports = tasks;