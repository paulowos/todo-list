const hostname = import.meta.env.VITE_API_HOSTNAME;

const userURL = `https://${hostname}/user`;
const userCreateUrl = `https://${hostname}/user/create`;
const tasksURL = `https://${hostname}/tasks`;

export default {
  userURL,
  userCreateUrl,
  tasksURL,
};
