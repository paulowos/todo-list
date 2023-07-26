process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

chai.use(chaiHttp);
const connection = require('../src/db/connection');

const app = require('../src/app');

const { expect } = chai;

const { test, routes } = require('./helpers/consts');

describe('Testando método PATCH "/tasks/:id"', function () {
  beforeEach(function () {
    sinon.stub(console, 'log').resolves();
  });

  afterEach(function () {
    sinon.restore();
  });

  it('Deve conseguir completar uma tarefa', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const response = await chai.request(app)
      .patch(routes.tasksID)
      .set('Authorization', test.authorization);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('affectedRows');
    expect(response.body.affectedRows).to.equal(1);
  });

  it('Não deve conseguir completar uma tarefa já completada ou que não existe', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 0 }]);
    const response = await chai.request(app)
      .patch(routes.tasksID)
      .set('Authorization', test.authorization);

    expect(response.status).to.equal(404);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.equal('Tarefa não encontrada/Já completada');
  });

  it('Não deve conseguir completar uma tarefa quando ocorrer um erro', async function () {
    sinon.stub(connection, 'execute').rejects();
    const response = await chai.request(app)
      .patch(routes.tasksID)
      .set('Authorization', test.authorization);

    expect(response.status).to.equal(500);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.equal('Erro ao completar tarefa');
  });
});