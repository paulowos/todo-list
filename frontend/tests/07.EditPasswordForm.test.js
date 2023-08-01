import { screen } from "@testing-library/react";
import renderApp from "./helpers/renderApp";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import constants from "./helpers/constants";
import sinon from "sinon";
import localForage from "localforage";
import userEvent from '@testing-library/user-event';
import changePasswordSchema from "../src/schemas/changePassword";
import axios from "axios";
import loginSchema from "../src/schemas/login";
import urls from "../src/utils/urls";


describe('Edit Password Form', () => {
  beforeEach(async () => {
    const stubLF = sinon.stub(localForage, 'getItem');
    stubLF.withArgs('id').resolves(constants.id);
    stubLF.withArgs('name').resolves(constants.name);
  });
  afterEach(() => {
    sinon.restore();
  });

  it('Deve ser possível digitar nos inputs', async () => {
    renderApp('/profile');
    const editBtn = screen.getByText('Mudar Senha');
    await userEvent.click(editBtn);
    const emailInput = screen.getByPlaceholderText('Email');
    const oldPasswordInput = screen.getByPlaceholderText('Senha Atual');
    const newPasswordInput = screen.getByPlaceholderText('Nova Senha');
    expect(emailInput).toHaveValue('');
    expect(oldPasswordInput).toHaveValue('');
    expect(newPasswordInput).toHaveValue('');
    await userEvent.type(emailInput, constants.email);
    await userEvent.type(oldPasswordInput, constants.password);
    await userEvent.type(newPasswordInput, constants.password);
    expect(emailInput).toHaveValue(constants.email);
    expect(oldPasswordInput).toHaveValue(constants.password);
    expect(newPasswordInput).toHaveValue(constants.password);
  });

  it('Não deve ser possível mudar senha quando os campos forem iguais', async () => {
    sinon.stub(loginSchema, 'refine').returns(false);
    renderApp('/profile');
    const editBtn = screen.getByText('Mudar Senha');
    await userEvent.click(editBtn);
    const emailInput = screen.getByPlaceholderText('Email');
    const oldPasswordInput = screen.getByPlaceholderText('Senha Atual');
    const newPasswordInput = screen.getByPlaceholderText('Nova Senha');
    const confirmBtn = screen.getByText('Confirmar');
    await userEvent.type(emailInput, constants.email);
    await userEvent.type(oldPasswordInput, constants.password);
    await userEvent.type(newPasswordInput, constants.password);
    expect(emailInput).toHaveValue(constants.email);
    expect(oldPasswordInput).toHaveValue(constants.password);
    expect(newPasswordInput).toHaveValue(constants.password);
    await userEvent.click(confirmBtn);
    const error = await screen.findByText('Senhas não podem ser iguais');
    expect(error).toBeInTheDocument();
  });

  it('Deve ser possível mudar senha', async () => {
    sinon.stub(changePasswordSchema, 'parse').returns();
    sinon.stub(axios, 'put').resolves();
    const spy = sinon.spy(localForage, 'clear');
    renderApp('/profile');
    const editBtn = screen.getByText('Mudar Senha');
    await userEvent.click(editBtn);
    const emailInput = screen.getByPlaceholderText('Email');
    const oldPasswordInput = screen.getByPlaceholderText('Senha Atual');
    const newPasswordInput = screen.getByPlaceholderText('Nova Senha');
    const confirmBtn = screen.getByText('Confirmar');
    await userEvent.type(emailInput, constants.email);
    await userEvent.type(oldPasswordInput, constants.password);
    await userEvent.type(newPasswordInput, constants.password);
    expect(emailInput).toHaveValue(constants.email);
    expect(oldPasswordInput).toHaveValue(constants.password);
    expect(newPasswordInput).toHaveValue(constants.password);
    await userEvent.click(confirmBtn);
    expect(spy.called).toBe(true);
    expect(axios.put.calledWith(urls.userURL, { email: constants.email, password: constants.password, newPassword: constants.password })).toBe(true);
    const loginBtn = await screen.findByText('Fazer Login');
    expect(loginBtn).toBeInTheDocument();
    await userEvent.click(loginBtn);
    const entrarBtn = await screen.findByText('Entrar');
    expect(entrarBtn).toBeInTheDocument();
  });

  it('Não deve ser possível mudar senha quando ocorrer algum erro', async () => {
    sinon.stub(changePasswordSchema, 'parse').returns();
    sinon.stub(axios, 'put').rejects({ response: { data: { error: 'Senha incorreta' } } });
    const spy = sinon.spy(localForage, 'clear');
    renderApp('/profile');
    const editBtn = screen.getByText('Mudar Senha');
    await userEvent.click(editBtn);
    const confirmBtn = screen.getByText('Confirmar');
    await userEvent.click(confirmBtn);
    const error = await screen.findByText('Senha incorreta');
    expect(error).toBeInTheDocument();
    expect(spy.notCalled).toBe(true);
  });
});