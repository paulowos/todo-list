import { screen } from "@testing-library/react";
import renderApp from "./helpers/renderApp";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import constants from "./helpers/constants";
import sinon from "sinon";
import localForage from "localforage";
import userEvent from '@testing-library/user-event';


describe('Profile', () => {
  beforeEach(async () => {
    const stubLF = sinon.stub(localForage, 'getItem');
    stubLF.withArgs('id').resolves(constants.id);
    stubLF.withArgs('name').resolves(constants.name);
  });
  afterEach(() => {
    sinon.restore();
  });

  it('Deve renderizar corretamente', async () => {
    renderApp('/profile');
    const name = await screen.findByText(constants.name);
    const changePasswordBtn = await screen.findByText('Mudar Senha');
    const deleteAccountBtn = await screen.findByText('Excluir Conta');
    expect(name).toBeInTheDocument();
    expect(changePasswordBtn).toBeInTheDocument();
    expect(deleteAccountBtn).toBeInTheDocument();
  });

  it('Deve redirecionar pro login quando não estiver logado', async () => {
    sinon.restore();
    sinon.stub(localForage, 'getItem').resolves();
    renderApp('/profile');
    const entrarBtn = await screen.findByText('Entrar');
    expect(entrarBtn).toBeInTheDocument();
  });

  it('Deve exibir o formulário de mudar senha', async () => {
    renderApp('/profile');
    const changePasswordBtn = await screen.findByText('Mudar Senha');
    expect(changePasswordBtn).toBeInTheDocument();
    await userEvent.click(changePasswordBtn);
    const emailInput = await screen.findByPlaceholderText('Email');
    const oldPasswordInput = await screen.findByPlaceholderText('Senha Atual');
    const newPasswordInput = await screen.findByPlaceholderText('Nova Senha');
    const confirmBtn = await screen.findByText('Confirmar');
    expect(emailInput).toBeInTheDocument();
    expect(oldPasswordInput).toBeInTheDocument();
    expect(newPasswordInput).toBeInTheDocument();
    expect(confirmBtn).toBeInTheDocument();
  });

  it('Deve exibir o formulário de excluir conta', async () => {
    renderApp('/profile');
    const deleteAccountBtn = await screen.findByText('Excluir Conta');
    expect(deleteAccountBtn).toBeInTheDocument();
    await userEvent.click(deleteAccountBtn);
    const emailInput = await screen.findByPlaceholderText('Email');
    const passwordInput = await screen.findByPlaceholderText('Senha');
    const excluirBtn = await screen.findAllByText('Excluir');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(excluirBtn[0]).toBeInTheDocument();
  });
});