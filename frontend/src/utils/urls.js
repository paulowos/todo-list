const { hostname } = window.location;

const userURL = `http://${hostname}:3000/user`;
const tasksURL = `http://${hostname}:3000/tasks`;

export default {
  userURL,
  tasksURL,
};
