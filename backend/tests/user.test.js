process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

chai.use(chaiHttp);
const app = require('../src/app');

const argon2 = require('argon2');
const connection = require('../src/db/connection');
let crypto = require('crypto');

const { expect } = chai;

describe('Testando rota /user', function () {

  afterEach(function () {
    sinon.restore();
  });

  describe('Testando método POST "/"', function () {
    it('Deve conseguir logar', async function () {
      sinon.stub(connection, 'execute').resolves([[{ id: 1, password: 'teste123456' }]]);
      sinon.stub(argon2, 'verify').resolves(true);

      const response = await chai.request(app)
        .post('/user')
        .send({
          email: 'teste@teste.com',
          password: 'teste123456',
        });

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('id');
      expect(response.body.id).to.equal(1);
    });

    it('Não deve conseguir logar ao errar a senha', async function () {
      sinon.stub(connection, 'execute').resolves([[{ id: 1, password: 'teste123456' }]]);
      sinon.stub(argon2, 'verify').resolves(false);

      const response = await chai.request(app)
        .post('/user')
        .send({
          email: 'teste@teste.com',
          password: 'teste123456',
        });

      expect(response.status).to.equal(401);
      expect(response.body).to.have.property('error');
      expect(response.body.error).to.equal('Senha inválida');
    });

    it('Não deve conseguir logar ao errar a email', async function () {
      sinon.stub(connection, 'execute').resolves([[undefined]]);

      const response = await chai.request(app)
        .post('/user')
        .send({
          email: 'teste@teste.com',
          password: 'teste123456',
        });

      expect(response.status).to.equal(401);
      expect(response.body).to.have.property('error');
      expect(response.body.error).to.equal('Email inválido/Não cadastrado');
    });
  });


  describe('Testando método POST "/create"', function () {

    it('Deve conseguir criar um usuário', async function () {
      sinon.stub(crypto, 'randomUUID').returns('teste');
      sinon.stub(argon2, 'hash').resolves('teste');
      sinon.stub(connection, 'execute').resolves();

      const response = await chai.request(app)
        .post('/user/create')
        .send({
          name: 'teste',
          email: 'teste@teste.com',
          password: 'teste123456',

        });

      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('id');
      expect(response.body.id).to.equal('teste');



    });
  });
});