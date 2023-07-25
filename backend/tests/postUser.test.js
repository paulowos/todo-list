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

describe('Testando método POST "/"', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Deve conseguir logar', async function () {
    sinon.stub(connection, 'execute').resolves([[{ id: 1, password: test.password }]]);
    sinon.stub(argon2, 'verify').resolves(true);

    const response = await chai.request(app)
      .post(routes.user)
      .send({
        email: test.email,
        password: test.password,
      });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('id');
    expect(response.body.id).to.equal(1);
  });

  it('Não deve conseguir logar ao errar a senha', async function () {
    sinon.stub(connection, 'execute').resolves([[{ id: 1, password: test.password }]]);
    sinon.stub(argon2, 'verify').resolves(false);

    const response = await chai.request(app)
      .post(routes.user)
      .send({
        email: test.email,
        password: test.password,
      });

    expect(response.status).to.equal(401);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.equal('Senha inválida');
  });

  it('Não deve conseguir logar ao errar a email', async function () {
    sinon.stub(connection, 'execute').resolves([[undefined]]);

    const response = await chai.request(app)
      .post(routes.user)
      .send({
        email: test.email,
        password: test.password,
      });

    expect(response.status).to.equal(401);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.equal('Email inválido/Não cadastrado');
  });

  it('Não deve conseguir logar quando ocorrer um erro no banco', async function () {
    sinon.stub(connection, 'execute').rejects();

    const response = await chai.request(app)
      .post(routes.user)
      .send({
        email: test.email,
        password: test.password,
      });

    expect(response.status).to.equal(500);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.equal('Erro ao autenticar');
  });
});
