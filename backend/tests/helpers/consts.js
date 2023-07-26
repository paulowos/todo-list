module.exports = {
  test: {

    email: 'teste@teste.com',
    password: 'teste123456',
    name: 'teste',
    /* eslint-disable-next-line */
    email256: 'abcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxy@example.com',
    newPassword: 'abcdefghijkl',
    authorization: '36b8f84d-df4e-4d49-b662-bcde71a8764f',
  },

  routes: {
    user: '/user',
    userCreate: '/user/create',
    tasks: '/tasks',

  },

  expected: {
    tasksList: [
      {
        id: 1,
        task: 'Tarefa 1',
        completed: 0,
      },
      {
        id: 2,
        task: 'Tarefa 2',
        completed: 0,
      },
      {
        id: 3,
        task: 'Tarefa 3',
        completed: 1,
      },
    ],
  },
};