process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

chai.use(chaiHttp);
const crypto = require('crypto');
const connection = require('../src/db/connection');

const app = require('../src/app');

const { expect } = chai;

const { test, routes } = require('./helpers/consts');

describe('Testando método POST "/tasks"', function () {
  beforeEach(function () {
    sinon.stub(console, 'log').resolves();
  });

  afterEach(function () {
    sinon.restore();
  });

  it('Deve conseguir criar uma tarefa', async function () {
    sinon.stub(crypto, 'randomBytes').returns('xxx-xxx');
    sinon.stub(connection, 'execute').resolves();

    const response = await chai.request(app)
      .post(routes.tasks)
      .set('Authorization', test.authorization)
      .send({
        task: test.task,
      });

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('id');
    expect(response.body).to.have.property('task');
    expect(response.body.id).to.equal('xxx-xxx');
    expect(response.body.task).to.equal(test.task);
  });

  it('Não deve conseguir criar uma tarefa ao ocorrer algum erro', async function () {
    sinon.stub(crypto, 'randomBytes').returns('xxx-xxx');
    sinon.stub(connection, 'execute').rejects();

    const response = await chai.request(app)
      .post(routes.tasks)
      .set('Authorization', test.authorization)
      .send({
        task: test.task,
      });

    expect(response.status).to.equal(500);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.equal('Erro ao criar tarefa');
  });

  it('Não deve conseguir criar uma tarefa sem task', async function () {
    const response = await chai.request(app)
      .post(routes.tasks)
      .set('Authorization', test.authorization);

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.equal('"task" é obrigatório');
  });

  it('Não deve conseguir criar uma tarefa quando task não for uma string', async function () {
    const response = await chai.request(app)
      .post(routes.tasks)
      .set('Authorization', test.authorization)
      .send({
        task: 123,
      });

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.equal('"task" deve ser uma string');
  });

  it('Não deve conseguir criar uma tarefa com mais de 255 caracteres', async function () {
    const response = await chai.request(app)
      .post(routes.tasks)
      .set('Authorization', test.authorization)
      .send({
        task: test.email256,
      });

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.equal('"task" deve ter no máximo 255 caracteres');
  });

  it('Não deve conseguir criar uma tarefa com menos de 3 caracteres', async function () {
    const response = await chai.request(app)
      .post(routes.tasks)
      .set('Authorization', test.authorization)
      .send({
        task: '12',
      });

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.equal('"task" deve ter no mínimo 3 caracteres');
  });
});