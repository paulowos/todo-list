import { screen, waitFor } from "@testing-library/react";
import renderApp from "./helpers/renderApp";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import constants from "./helpers/constants";
import userEvent from '@testing-library/user-event';
import sinon from "sinon";
import axios from "axios";
import localForage from "localforage";



describe('Todo', () => {
  beforeEach(async () => {
    sinon.stub(localForage, 'getItem').resolves(constants.id);
  });
  afterEach(() => {
    sinon.restore();
  });

  it('Deve renderizar corretamente', async () => {
    sinon.stub(axios, 'get').resolves({ data: constants.data });
    const { container } = renderApp('/');
    const addTask = await screen.findByPlaceholderText('Digite a sua tarefa...');
    const addBtn = screen.getByText('Adicionar');
    const inputCount = screen.getByText('0/255');
    const menu = container.getElementsByClassName('profile-svg')[0];
    const perfil = screen.getAllByText('Perfil');
    const temaSelect = screen.getAllByText('Tema:');
    const sairBtn = screen.getAllByText('Sair');
    constants.data.forEach(({ task }) => {
      const taskText = screen.getByText(task);
      expect(taskText).toBeInTheDocument();
    });
    expect(addTask).toBeInTheDocument();
    expect(addBtn).toBeInTheDocument();
    expect(inputCount).toBeInTheDocument();
    expect(menu).toBeInTheDocument();
    expect(perfil).toHaveLength(2);
    expect(temaSelect).toHaveLength(2);
    expect(sairBtn).toHaveLength(2);

  });

  it('Deve ser redirecionado para a pagina de login', async () => {
    sinon.restore();
    sinon.stub(localForage, 'getItem').resolves();
    renderApp('/');
    const addTask = screen.getAllByText('Perfil');
    const entrarButton = await screen.findByText('Entrar');
    expect(addTask).not.toBeNull();
    expect(entrarButton).toBeInTheDocument();
  });

  it('Deve exibir erro', async () => {
    sinon.stub(axios, 'get').rejects({ response: { data: { error: 'Erro' } } });
    renderApp('/');
    const erro = await screen.findByText('Erro');
    expect(erro).toBeInTheDocument();
  });
});