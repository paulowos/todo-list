process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

chai.use(chaiHttp);
const connection = require('../src/db/connection');

const app = require('../src/app');

const { expect } = chai;

const { test, routes, expected } = require('./helpers/consts');

describe('Testando método GET "/tasks"', function () {
  beforeEach(function () {
    sinon.stub(console, 'log').resolves();
  });

  afterEach(function () {
    sinon.restore();
  });

  it('Deve conseguir listar as tarefas', async function () {
    sinon.stub(connection, 'execute').resolves([expected.tasksList]);

    const response = await chai.request(app)
      .get(routes.tasks)
      .set('Authorization', test.authorization);

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
    expect(response.body.length).to.equal(3);
    expect(response.body).to.deep.equal(expected.tasksList);
  });

  it('Não deve conseguir listar as tarefas quando ocorrer algum erro', async function () {
    sinon.stub(connection, 'execute').rejects();

    const response = await chai.request(app)
      .get(routes.tasks)
      .set('Authorization', test.authorization);

    expect(response.status).to.equal(500);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.equal('Erro ao listar tarefas');
  });

  it('Não deve conseguir listar sem autorização', async function () {
    const response = await chai.request(app)
      .get(routes.tasks);

    expect(response.status).to.equal(401);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.equal('"header authorization" é obrigatório');
  });

  it('Não deve conseguir listar quando autorização for inválida', async function () {
    const response = await chai.request(app)
      .get(routes.tasks)
      .set('Authorization', 123);

    expect(response.status).to.equal(401);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.equal('"header authorization" deve ser um UUID válido');
  });
});