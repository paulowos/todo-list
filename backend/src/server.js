const app = require('./app');
const client = require('./db/connection');

const { PORT } = process.env;

app.listen(Number(PORT), async () => {
  console.log(`Server is running on port ${PORT}`);
  const { rowCount } = await client.query('SELECT 1');
  if (rowCount) console.log('Connected to the database');
});
