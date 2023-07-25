const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

chai.use(chaiHttp);
const argon2 = require('argon2');
const crypto = require('crypto');
const connection = require('../src/db/connection');

const app = require('../src/app');

const { expect } = chai;

const { test, routes } = require('./helpers/consts');

describe('Testando método POST "/create"', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Deve conseguir criar um usuário', async function () {
    sinon.stub(crypto, 'randomUUID').returns('xxx-xxx-xxx');
    sinon.stub(argon2, 'hash').resolves('teste');
    sinon.stub(connection, 'execute').resolves();

    const response = await chai.request(app)
      .post(routes.userCreate)
      .send({
        name: test.name,
        email: test.email,
        password: test.password,
      });

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('id');
    expect(response.body.id).to.equal('xxx-xxx-xxx');
  });

  it('Não deve conseguir criar um usuário com email já cadastrado', async function () {
    sinon.stub(crypto, 'randomUUID').returns('teste');
    sinon.stub(argon2, 'hash').resolves('teste');
    sinon.stub(connection, 'execute').rejects();
    sinon.stub(console, 'log').resolves();

    const response = await chai.request(app)
      .post(routes.userCreate)
      .send({
        name: test.name,
        email: test.email,
        password: test.password,
      });

    expect(response.status).to.equal(500);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.equal('Usuário já cadastrado');
  });

  it('Não deve conseguir criar um usuário com email inválido', async function () {
    const response = await chai.request(app)
      .post(routes.userCreate)
      .send({
        name: test.name,
        email: 'invalid',
        password: test.password,
      });

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.equal('"email" deve ser um email válido');
  });

  it('Não deve conseguir criar um usuário com email que não seja uma string', async function () {
    const response = await chai.request(app)
      .post(routes.userCreate)
      .send({
        name: test.name,
        email: 1234,
        password: test.password,
      });

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.equal('"email" deve ser uma string');
  });

  it(
    'Não deve conseguir criar um usuário com email com mais de 255 caracteres',
    async function () {
      const response = await chai.request(app)
        .post(routes.userCreate)
        .send({
          name: test.name,
          email: test.email256,
          password: test.password,
        });

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error');
      expect(response.body.error).to.equal('"email" deve ter no máximo 255 caracteres');
    },
  );

  it('Não deve conseguir criar um usuário sem email', async function () {
    const response = await chai.request(app)
      .post(routes.userCreate)
      .send({
        name: test.name,
        password: test.password,
      });

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.equal('"email" é obrigatório');
  });

  it('Não deve conseguir criar um usuário com senha menor que 8 caracteres', async function () {
    const response = await chai.request(app)
      .post(routes.userCreate)
      .send({
        name: test.name,
        email: test.email,
        password: '1234567',
      });

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.equal('"password" deve ter no mínimo 8 caracteres');
  });

  it('Não deve conseguir criar um usuário com senha que não seja uma string', async function () {
    const response = await chai.request(app)
      .post(routes.userCreate)
      .send({
        name: test.name,
        email: test.email,
        password: 1234567,
      });

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.equal('"password" deve ser uma string');
  });

  it('Não deve conseguir criar um usuário com senha com mais de 255 caracteres', async function () {
    const response = await chai.request(app)
      .post(routes.userCreate)
      .send({
        name: test.name,
        email: test.email,
        password: test.email256,
      });

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.equal('"password" deve ter no máximo 255 caracteres');
  });

  it('Não deve conseguir criar um usuário sem senha', async function () {
    const response = await chai.request(app)
      .post(routes.userCreate)
      .send({
        name: test.name,
        email: test.email,
      });

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.equal('"password" é obrigatório');
  });

  it('Não deve conseguir criar um usuário sem nome', async function () {
    const response = await chai.request(app)
      .post(routes.userCreate)
      .send({
        email: test.email,
        password: test.password,
      });

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.equal('"name" é obrigatório');
  });

  it('Não deve conseguir criar um usuário com nome que não seja uma string', async function () {
    const response = await chai.request(app)
      .post(routes.userCreate)
      .send({
        name: 1234,
        email: test.email,
        password: test.password,
      });

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.equal('"name" deve ser uma string');
  });

  it('Não deve conseguir criar um usuário com nome com mais de 255 caracteres', async function () {
    const response = await chai.request(app)
      .post(routes.userCreate)
      .send({
        name: test.email256,
        email: test.email,
        password: test.password,
      });

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.equal('"name" deve ter no máximo 255 caracteres');
  });

  it('Não deve conseguir criar um usuário com nome com menos de 3 caracteres', async function () {
    const response = await chai.request(app)
      .post(routes.userCreate)
      .send({
        name: 'te',
        email: test.email,
        password: test.password,
      });

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.equal('"name" deve ter no mínimo 3 caracteres');
  });
});