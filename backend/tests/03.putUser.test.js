process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

chai.use(chaiHttp);
const argon2 = require('argon2');
const connection = require('../src/db/connection');

const app = require('../src/app');

const { expect } = chai;

const { test, routes } = require('./helpers/consts');

describe('Testando método PUT "/user"', function () {
  beforeEach(function () {
    sinon.stub(console, 'log').resolves();
  });
  afterEach(function () {
    sinon.restore();
  });

  it('Deve conseguir editar a senha do usuário', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall().resolves([[{ id: 'xxx-xxx-xxx', password: test.password }]])
      .onSecondCall()
      .resolves([{ affectedRows: 1 }]);
    sinon.stub(argon2, 'verify').resolves(true);
    sinon.stub(argon2, 'hash').resolves('teste');

    const response = await chai.request(app)
      .put(routes.user)
      .send({
        email: test.email,
        password: test.password,
        newPassword: test.newPassword,
      });

    expect(connection.execute.callCount).to.equal(2);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('affectedRows');
    expect(response.body.affectedRows).to.equal(1);
  });

  it('Não deve conseguir editar a senha quando ocorrer algum erro', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall().resolves([[{ id: 'xxx-xxx-xxx', password: test.password }]])
      .onSecondCall()
      .rejects();
    sinon.stub(argon2, 'verify').resolves(true);
    sinon.stub(argon2, 'hash').resolves('teste');

    const response = await chai.request(app)
      .put(routes.user)
      .send({
        email: test.email,
        password: test.password,
        newPassword: test.newPassword,
      });

    expect(response.status).to.equal(500);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.equal('Erro ao editar usuário');
  });

  it('Não deve conseguir editar a senha quando "newPassword" não é uma string', async function () {
    const response = await chai.request(app)
      .put(routes.user)
      .send({
        email: test.email,
        password: test.password,
        newPassword: 123,
      });

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.equal('"newPassword" deve ser uma string');
  });

  it(
    'Não deve conseguir editar a senha quando "newPassword" é menor que 8 caracteres',
    async function () {
      const response = await chai.request(app)
        .put(routes.user)
        .send({
          email: test.email,
          password: test.password,
          newPassword: '123',
        });

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error');
      expect(response.body.error).to.equal('"newPassword" deve ter no mínimo 8 caracteres');
    },
  );

  it(
    'Não deve conseguir editar a senha quando "newPassword" é maior que 255 caracteres',
    async function () {
      const response = await chai.request(app)
        .put(routes.user)
        .send({
          email: test.email,
          password: test.password,
          newPassword: test.email256,
        });

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error');
      expect(response.body.error).to.equal('"newPassword" deve ter no máximo 255 caracteres');
    },
  );

  it('Não deve conseguir editar a senha sem uma nova senha', async function () {
    const response = await chai.request(app)
      .put(routes.user)
      .send({
        email: test.email,
        password: test.password,
      });

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.equal('"newPassword" é obrigatório');
  });
});