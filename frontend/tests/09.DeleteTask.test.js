import { screen, waitFor } from "@testing-library/react";
import renderApp from "./helpers/renderApp";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import constants from "./helpers/constants";
import userEvent from '@testing-library/user-event';
import sinon from "sinon";
import axios from "axios";
import localForage from "localforage";
import urls from "../src/utils/urls";

describe('Delete Task', () => {
  beforeEach(async () => {
    sinon.stub(localForage, 'getItem').resolves(constants.id);
    sinon.stub(axios, 'get').resolves({ data: constants.data });
  });
  afterEach(() => {
    sinon.restore();
  });

  it('Ao clicar no botão de deletar, deve ser exibido uma mensagem', async () => {
    const { container } = renderApp('/');
    let deleteBtn = undefined;
    await waitFor(async () => {
      deleteBtn = container.getElementsByClassName('delete-svg');
    });
    expect(deleteBtn[0]).toBeInTheDocument();
    await userEvent.click(deleteBtn[0].parentElement);
    const message = await screen.findAllByText('Tem certeza que deseja excluir essa tarefa?');
    expect(message[0]).toBeInTheDocument();
    const excluirBtn = await screen.findAllByText('Excluir');
    expect(excluirBtn[0]).toBeInTheDocument();
    const cancelarBtn = await screen.findAllByText('Cancelar');
    expect(cancelarBtn[0]).toBeInTheDocument();

  });

  it('Deve ser possível deletar uma tarefa', async () => {
    sinon.stub(axios, 'delete').resolves();
    const { container } = renderApp('/');
    let deleteBtn = undefined;
    await waitFor(async () => {
      deleteBtn = container.getElementsByClassName('delete-svg');
    });
    expect(deleteBtn[0]).toBeInTheDocument();
    await userEvent.click(deleteBtn[0].parentElement);
    const excluirBtn = await screen.findAllByText('Excluir');
    expect(excluirBtn[0]).toBeInTheDocument();
    await userEvent.click(excluirBtn[0]);
    expect(axios.delete.calledWith(`${urls.tasksURL}/${constants.data[0].id}`)).toBe(true);
  });

  it('Deve ser possível cancelar a operação', async () => {
    const spy = sinon.spy(axios, 'delete');
    const { container } = renderApp('/');
    let deleteBtn = undefined;
    await waitFor(async () => {
      deleteBtn = container.getElementsByClassName('delete-svg');
    });
    expect(deleteBtn[0]).toBeInTheDocument();
    await userEvent.click(deleteBtn[0].parentElement);
    const cancelarBtn = await screen.findAllByText('Cancelar');
    expect(cancelarBtn[0]).toBeInTheDocument();
    await userEvent.click(cancelarBtn[0]);
    expect(spy.notCalled).toBe(true);
  });

  it('Não deve ser possível excluir uma tarefa quando ocorrer um erro', async () => {
    sinon.stub(axios, 'delete').rejects({ response: { data: { error: 'Erro' } } });
    const { container } = renderApp('/');
    let deleteBtn = undefined;
    await waitFor(async () => {
      deleteBtn = container.getElementsByClassName('delete-svg');
    });
    expect(deleteBtn[0]).toBeInTheDocument();
    await userEvent.click(deleteBtn[0].parentElement);
    const excluirBtn = await screen.findAllByText('Excluir');
    expect(excluirBtn[0]).toBeInTheDocument();
    await userEvent.click(excluirBtn[0]);
    const erro = await screen.findByText('Erro');
    expect(erro).toBeInTheDocument();

  });




});