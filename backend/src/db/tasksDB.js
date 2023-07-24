const connection = require('./connection');
const { randomBytes } = require('crypto');

const getTasks = async (userID) => {
  const [rows] = await connection.execute(`SELECT id, task, completed FROM tasks
  WHERE userid = ? AND deleted = false`, [userID]);
  return rows;
};

const createTask = async (task, userID) => {
  const id = randomBytes(4).toString('hex');
  await connection.execute(
    `INSERT INTO tasks (id, task, userid) VALUES (?,?, ?)`,
    [id, task, userID],
  );
  return id;
};

const completeTask = async (id, userID) => {
  const [rows] = await connection.execute(
    `UPDATE tasks SET completed = true WHERE id = ? AND userid = ?`,
    [id, userID],
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
  getTasks
}

