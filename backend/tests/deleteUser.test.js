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

describe('Testando método DELETE "/"', function () {
  beforeEach(function () {
    sinon.stub(console, 'log').resolves();
  });
  afterEach(function () {
    sinon.restore();
  });

  it('Deve conseguir deletar o usuário', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall().resolves([[{ id: 'xxx-xxx-xxx', password: test.password }]])
      .onSecondCall()
.resolves([{ affectedRows: 1 }]);
    sinon.stub(argon2, 'verify').resolves(true);
    sinon.stub(argon2, 'hash').resolves('teste');

    const response = await chai.request(app)
      .delete(routes.user)
      .send({
        email: test.email,
        password: test.password,
      });

    expect(connection.execute.callCount).to.equal(2);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('affectedRows');
    expect(response.body.affectedRows).to.equal(1);
  });

  it('Não deve conseguir deletar quando ocorrer algum erro', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall().resolves([[{ id: 'xxx-xxx-xxx', password: test.password }]])
      .onSecondCall()
.rejects();
    sinon.stub(argon2, 'verify').resolves(true);
    sinon.stub(argon2, 'hash').resolves('teste');

    const response = await chai.request(app)
      .delete(routes.user)
      .send({
        email: test.email,
        password: test.password,
      });

    expect(response.status).to.equal(500);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.equal('Erro ao deletar usuário');
  });
});