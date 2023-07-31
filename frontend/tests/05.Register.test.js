import { screen } from "@testing-library/react";
import renderApp from "./helpers/renderApp";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import constants from "./helpers/constants";
import userEvent from '@testing-library/user-event';
import sinon from "sinon";
import axios from "axios";
import localForage from "localforage";
import registerSchema from "../src/schemas/register";
import urls from "../src/utils/urls";

describe('REgister', () => {
  beforeEach(async () => {
    await localForage.clear();
  });
  afterEach(() => {
    sinon.restore();
  });

  it('deve renderizar corretamente', () => {
    renderApp('/register');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Senha');
    const nameInput = screen.getByPlaceholderText('Nome');
    const registerButton = screen.getByText('Cadastrar');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  it('Deve ser possível digitar nos inputs', async () => {
    renderApp('/register');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Senha');
    const nameInput = screen.getByPlaceholderText('Nome');
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
    expect(nameInput).toHaveValue('');
    await userEvent.type(emailInput, constants.email);
    await userEvent.type(passwordInput, constants.password);
    await userEvent.type(nameInput, constants.name);
    expect(emailInput).toHaveValue(constants.email);
    expect(passwordInput).toHaveValue(constants.password);
    expect(nameInput).toHaveValue(constants.name);
  });

  it('Deve ser possível cadastrar', async () => {
    sinon.stub(axios, 'post').resolves({ data: { id: constants.id } });
    renderApp('/register');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Senha');
    const nameInput = screen.getByPlaceholderText('Nome');
    const registerButton = screen.getByText('Cadastrar');
    await userEvent.type(emailInput, constants.email);
    await userEvent.type(passwordInput, constants.password);
    await userEvent.type(nameInput, constants.name);
    expect(emailInput).toHaveValue(constants.email);
    expect(passwordInput).toHaveValue(constants.password);
    expect(nameInput).toHaveValue(constants.name);
    await userEvent.click(registerButton);
    expect(axios.post.calledWith(urls.userCreateUrl)).toBe(true);
    const addTask = await screen.findByPlaceholderText('Digite a sua tarefa...');
    expect(addTask).toBeInTheDocument();
  });


  it('Deve redirecionar quando já esta logado', async () => {
    sinon.stub(localForage, 'getItem').resolves(constants.id);
    renderApp('/register');
    const addTask = await screen.findByPlaceholderText('Digite a sua tarefa...');
    expect(addTask).toBeInTheDocument();
  });

  it('Não deve ser possível cadastrar sem nome', async () => {
    sinon.stub(registerSchema, 'parse').throws({ issues: [{ path: ['name'], message: 'Nome deve ter no mínimo 3 caracteres' }] });
    renderApp('/register');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Senha');
    const nameInput = screen.getByPlaceholderText('Nome');
    const registerButton = screen.getByText('Cadastrar');
    await userEvent.type(emailInput, constants.email);
    await userEvent.type(passwordInput, constants.password);
    await userEvent.type(nameInput, 'xx');
    await userEvent.click(registerButton);
    const error = await screen.findByText('Nome deve ter no mínimo 3 caracteres');
    expect(error).toBeInTheDocument();
  });

  it('Não deve ser possível cadastrar quando ocorrer um erro', async () => {
    sinon.stub(axios, 'post').rejects({ response: { data: { error: 'Usuário já cadastrado/Servidor indisponível' } } });
    renderApp('/register');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Senha');
    const nameInput = screen.getByPlaceholderText('Nome');
    const registerButton = screen.getByText('Cadastrar');
    await userEvent.type(emailInput, constants.email);
    await userEvent.type(passwordInput, constants.password);
    await userEvent.type(nameInput, constants.name);

    await userEvent.click(registerButton);
    const error = await screen.findByText('Usuário já cadastrado/Servidor indisponível');
    expect(error).toBeInTheDocument();
  });


});