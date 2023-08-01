import { screen } from "@testing-library/react";
import renderApp from "./helpers/renderApp";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import constants from "./helpers/constants";
import sinon from "sinon";
import localForage from "localforage";
import userEvent from '@testing-library/user-event';
import loginSchema from "../src/schemas/login";
import axios from "axios";
import urls from "../src/utils/urls";


describe('Delete Account Form', () => {
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
    const deleteBtn = screen.getByText('Excluir Conta');
    await userEvent.click(deleteBtn);
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Senha');
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
    await userEvent.type(emailInput, constants.email);
    await userEvent.type(passwordInput, constants.password);
    expect(emailInput).toHaveValue(constants.email);
    expect(passwordInput).toHaveValue(constants.password);
  });

  it('Deve ser possível excluir a conta', async () => {
    sinon.stub(loginSchema, 'parse').returns();
    sinon.stub(axios, 'delete').resolves();
    const spy = sinon.spy(localForage, 'clear');
    renderApp('/profile');
    const deleteBtn = screen.getByText('Excluir Conta');
    await userEvent.click(deleteBtn);
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Senha');
    const excluirBtn = screen.getAllByText('Excluir');
    await userEvent.type(emailInput, constants.email);
    await userEvent.type(passwordInput, constants.password);
    await userEvent.click(excluirBtn[0]);
    expect(excluirBtn[1]).toBeInTheDocument();
    await userEvent.click(excluirBtn[1]);
    expect(axios.delete.calledWith(urls.userURL, { data: { email: constants.email, password: constants.password } })).toBe(true);
    expect(spy.called).toBe(true);
    const entrarBtn = await screen.findByText('Entrar');
    expect(entrarBtn).toBeInTheDocument();
  });

  it('Não deve ser possível excluir a conta ocorrer algum erro', async () => {
    sinon.stub(loginSchema, 'parse').returns();
    sinon.stub(axios, 'delete').rejects({ response: { data: { error: 'Senha incorreta' } } });
    const spy = sinon.spy(localForage, 'clear');
    renderApp('/profile');
    const deleteBtn = screen.getByText('Excluir Conta');
    await userEvent.click(deleteBtn);
    const excluirBtn = await screen.findAllByText('Excluir');
    await userEvent.click(excluirBtn[0]);
    expect(excluirBtn[1]).toBeInTheDocument();
    await userEvent.click(excluirBtn[1]);
    const error = await screen.findByText('Senha incorreta');
    expect(error).toBeInTheDocument();
    expect(spy.notCalled).toBe(true);
  });

  it('Não deve ser possível excluir a conta um campo for inválido', async () => {
    sinon.stub(loginSchema, 'parse').throws({ issues: [{ path: ['email'], message: 'Email inválido' }] });
    const spy = sinon.spy(axios, 'delete');
    renderApp('/profile');
    const deleteBtn = screen.getByText('Excluir Conta');
    await userEvent.click(deleteBtn);
    const emailInput = screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'invalid');
    expect(emailInput).toHaveValue('invalid');
    await userEvent.type(emailInput, '{enter}');
    const error = await screen.findByText('Email inválido');
    expect(error).toBeInTheDocument();
    expect(spy.notCalled).toBe(true);
  });

  it('Deve cancelar a exclusão da conta', async () => {
    sinon.stub(loginSchema, 'parse').returns();
    renderApp('/profile');
    const deleteBtn = screen.getByText('Excluir Conta');
    await userEvent.click(deleteBtn);
    const emailInput = screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, constants.email);
    await userEvent.type(emailInput, '{enter}');
    expect(emailInput).toHaveValue(constants.email);
    const cancelarBtn = await screen.findByText('Cancelar');
    await userEvent.click(cancelarBtn);
    expect(emailInput).toHaveValue('');

  });
});