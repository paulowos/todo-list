const { hostname } = window.location;
const port = 3000;

const userURL = `http://${hostname}:${port}/user`;
const userCreateUrl = `http://${hostname}:${port}/user/create`;
const tasksURL = `http://${hostname}:${port}/tasks`;

export default {
  userURL,
  userCreateUrl,
  tasksURL,
};
