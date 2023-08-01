const { hostname } = window.location;
const port = import.meta.env.VITE_API_PORT;

const userURL = `http://${hostname}:${port}/user`;
const userCreateUrl = `http://${hostname}:${port}/user/create`;
const tasksURL = `http://${hostname}:${port}/tasks`;

export default {
  userURL,
  userCreateUrl,
  tasksURL,
};
