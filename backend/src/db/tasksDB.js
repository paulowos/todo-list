const crypto = require('crypto');
const connection = require('./connection');

const getTasks = async (userID) => {
  const { rows } = connection.query(
    `SELECT id, task, completed FROM tasks 
     WHERE userid = $1 AND deleted = false ORDER BY creation_date DESC`,
    [userID],
  );
  return rows;
};

const createTask = async (task, userID) => {
  const id = crypto.randomBytes(4).toString('hex');
  await connection.query(
    'INSERT INTO tasks (id, task, userid) VALUES ($1, $2, $3)',
    [id, task, userID],
  );
  return id;
};

const completeTask = async (id, userID) => {
  const { rowCount } = await connection.query(
    'UPDATE tasks SET completed = !completed WHERE id = $1 AND userid = $2',
    [id, userID],
  );
  return rowCount;
};

const editTask = async (task, id, userID) => {
  const { rowCount } = await connection.query(
    'UPDATE tasks SET task = $1, completed = false WHERE id = $2 AND userid = $3',
    [task, id, userID],
  );
  return rowCount;
};

const deleteTask = async (id, userID) => {
  const { rowCount } = await connection.query(
    `UPDATE tasks SET deleted = true 
     WHERE id = $1 AND userid = $2 AND deleted = false`,
    [id, userID],
  );
  return rowCount;
};

module.exports = {
  createTask,
  completeTask,
  deleteTask,
  editTask,
  getTasks,
};
