const app = require('./app');
const connection = require('./db/connection');

const { API_PORT } = process.env;

const PORT = API_PORT;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  const [rows] = await connection.query('SELECT 1');
  if (rows) console.log('Connected to the database');
});