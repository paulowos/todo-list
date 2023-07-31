import { screen } from "@testing-library/react";
import renderApp from "./helpers/renderApp";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import constants from "./helpers/constants";
import userEvent from '@testing-library/user-event';
import sinon from "sinon";
import axios from "axios";
import loginSchema from "../src/schemas/login";
import localForage from "localforage";

describe('Login', () => {
  beforeEach(async () => {
    await localForage.clear();
  });
  afterEach(() => {
    sinon.restore();
  });

  it('deve renderizar corretamente', () => {
    renderApp('/login');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Senha');
    const entrarButton = screen.getByText('Entrar');
    const registerButton = screen.getByText('Cadastrar');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(entrarButton).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  it('Deve ser possível digitar nos inputs', async () => {
    renderApp('/login');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Senha');
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
    await userEvent.type(emailInput, constants.email);
    await userEvent.type(passwordInput, constants.password);
    expect(emailInput).toHaveValue(constants.email);
    expect(passwordInput).toHaveValue(constants.password);
  });

  it('Deve ser possível fazer login', async () => {
    sinon.stub(axios, 'post').resolves({ data: { id: constants.id } });
    renderApp('/login');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Senha');
    const entrarButton = screen.getByText('Entrar');
    await userEvent.type(emailInput, constants.email);
    await userEvent.type(passwordInput, constants.password);
    expect(emailInput).toHaveValue(constants.email);
    expect(passwordInput).toHaveValue(constants.password);
    await userEvent.click(entrarButton);
    const addTask = await screen.findByPlaceholderText('Digite a sua tarefa...');
    expect(addTask).toBeInTheDocument();
  });

  it('Não deve ser possível fazer login com email inválido', async () => {
    sinon.stub(loginSchema, 'parse').throws({ issues: [{ path: ['email'], message: 'Email inválido' }] });
    renderApp('/login');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Senha');
    const entrarButton = screen.getByText('Entrar');
    await userEvent.type(emailInput, 'invalid');
    await userEvent.type(passwordInput, constants.password);
    expect(emailInput).toHaveValue('invalid');
    expect(passwordInput).toHaveValue(constants.password);
    await userEvent.click(entrarButton);
    const error = screen.getByText('Email inválido');
    expect(error).toBeInTheDocument();
  });

  it('Não deve ser possível fazer login com email maior que 255 caracteres', async () => {
    sinon.stub(loginSchema, 'parse').throws({ issues: [{ path: ['email'], message: 'Email deve ter no máximo 255 caracteres' }] });
    renderApp('/login');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Senha');
    const entrarButton = screen.getByText('Entrar');
    await userEvent.type(emailInput, constants.email256);
    await userEvent.type(passwordInput, constants.password);
    expect(emailInput).toHaveValue(constants.email256);
    expect(passwordInput).toHaveValue(constants.password);
    await userEvent.click(entrarButton);
    const error = screen.getByText('Email deve ter no máximo 255 caracteres');
    expect(error).toBeInTheDocument();
  });

  it('Não deve ser possível fazer login com senha menor que 8 caracteres', async () => {
    sinon.stub(loginSchema, 'parse').throws({ issues: [{ path: ['password'], message: 'Senha deve ter no mínimo 8 caracteres' }] });
    renderApp('/login');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Senha');
    const entrarButton = screen.getByText('Entrar');
    await userEvent.type(emailInput, constants.email);
    await userEvent.type(passwordInput, '123');
    expect(emailInput).toHaveValue(constants.email);
    expect(passwordInput).toHaveValue('123');
    await userEvent.click(entrarButton);
    const error = screen.getByText('Senha deve ter no mínimo 8 caracteres');
    expect(error).toBeInTheDocument();
  });

  it('Não deve ser possível fazer login com senha maior que 255 caracteres', async () => {
    sinon.stub(loginSchema, 'parse').throws({ issues: [{ path: ['password'], message: 'Senha deve ter no máximo 255 caracteres' }] });
    renderApp('/login');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Senha');
    const entrarButton = screen.getByText('Entrar');
    await userEvent.type(emailInput, constants.email);
    await userEvent.type(passwordInput, constants.email256);
    await userEvent.click(entrarButton);
    const error = screen.getByText('Senha deve ter no máximo 255 caracteres');
    expect(error).toBeInTheDocument();
  });

  it('Não deve ser possível fazer login com email não cadastrado', async () => {
    sinon.stub(axios, 'post').rejects({ response: { data: { error: 'Email inválido/Não cadastrado' } } });
    renderApp('/login');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Senha');
    const entrarButton = screen.getByText('Entrar');
    await userEvent.type(emailInput, constants.email);
    await userEvent.type(passwordInput, constants.password);
    expect(emailInput).toHaveValue(constants.email);
    expect(passwordInput).toHaveValue(constants.password);
    await userEvent.click(entrarButton);
    const error = screen.getByText('Email inválido/Não cadastrado');
    expect(error).toBeInTheDocument();
  });

  it('Não deve ser possível fazer login com senha incorreta', async () => {
    sinon.stub(axios, 'post').rejects({ response: { data: { error: 'Senha incorreta' } } });
    renderApp('/login');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Senha');
    const entrarButton = screen.getByText('Entrar');
    await userEvent.type(emailInput, constants.email);
    await userEvent.type(passwordInput, constants.password);
    expect(emailInput).toHaveValue(constants.email);
    expect(passwordInput).toHaveValue(constants.password);
    await userEvent.click(entrarButton);
    const error = screen.getByText('Senha incorreta');
    expect(error).toBeInTheDocument();
  });

  it('Deve redirecionar quando já esta logado', async () => {
    sinon.stub(localForage, 'getItem').resolves(constants.id);
    renderApp('/login');
    const addTask = await screen.findByPlaceholderText('Digite a sua tarefa...');
    expect(addTask).toBeInTheDocument();
  });

  it('Deve ir para a pagina de registro', async () => {
    renderApp('/login');
    const registerButton = screen.getByText('Cadastrar');
    expect(registerButton).toBeInTheDocument();
    await userEvent.click(registerButton);
    const nameInput = screen.getByPlaceholderText('Nome');
    expect(nameInput).toBeInTheDocument();
  });
});