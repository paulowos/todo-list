const { hostname } = window.location;

const userURL = `http://${hostname}:3000/user`;
const userCreateUrl = `http://${hostname}:3000/user/create`;
const tasksURL = `http://${hostname}:3000/tasks`;

export default {
  userURL,
  userCreateUrl,
  tasksURL,
};
