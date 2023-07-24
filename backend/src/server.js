const app = require('./app');

const { API_PORT } = process.env;

const PORT = API_PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});