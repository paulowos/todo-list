const crypto = require('crypto');
const connection = require('./connection');

const getTasks = async (userID) => {
  const [rows] = await connection.execute(`SELECT id, task, completed FROM tasks
  WHERE userid = ? AND deleted = false ORDER BY creation_date DESC` , [userID]);
  return rows;
};

const createTask = async (task, userID) => {
  const id = crypto.randomBytes(4).toString('hex');
  await connection.execute(
    'INSERT INTO tasks (id, task, userid) VALUES (?,?, ?)',
    [id, task, userID],
  );
  return id;
};

const completeTask = async (id, userID) => {
  const [rows] = await connection.execute(
    'UPDATE tasks SET completed = !completed WHERE id = ? AND userid = ?',
    [id, userID],
  );
  return rows.affectedRows;
};

const editTask = async (task, id, userID) => {
  const [rows] = await connection.execute(
    'UPDATE tasks SET task = ?, completed = false WHERE id = ? AND userid = ?',
    [task, id, userID],
  );
  return rows.affectedRows;
};

const deleteTask = async (id, userID) => {
  const [rows] = await connection.execute(
    `UPDATE tasks SET deleted = true 
     WHERE id = ? AND userid = ? AND deleted = false`,
    [id, userID],
  );
  return rows.affectedRows;
};

module.exports = {
  createTask,
  completeTask,
  deleteTask,
  editTask,
  getTasks,
};
