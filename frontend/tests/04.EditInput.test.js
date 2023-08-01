import { screen, waitFor } from "@testing-library/react";
import renderApp from "./helpers/renderApp";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import constants from "./helpers/constants";
import userEvent from '@testing-library/user-event';
import sinon from "sinon";
import axios from "axios";
import localForage from "localforage";
import taskSchema from "../src/schemas/task";
import urls from "../src/utils/urls";

describe('Edit Input', () => {
  beforeEach(async () => {
    sinon.stub(localForage, 'getItem').resolves(constants.id);
    sinon.stub(axios, 'get').resolves({ data: constants.data });
  });
  afterEach(() => {
    sinon.restore();
  });

  it('Ao clicar no botão de editar, deve ser exibido o input de edição', async () => {
    const { container } = renderApp('/');
    let editBtn = undefined;
    await waitFor(async () => {
      editBtn = container.getElementsByClassName('edit-svg');
    });
    expect(editBtn[0]).toBeInTheDocument();
    await userEvent.click(editBtn[0].parentElement);
    const editInput = await screen.findByPlaceholderText('Edite sua tarefa...');
    const confirmBtn = container.getElementsByClassName('confirm-svg');
    expect(confirmBtn[0]).toBeInTheDocument();
    expect(editInput).toBeInTheDocument();

  });

  it('Deve ser possível digitar nos input', async () => {
    const { container } = renderApp('/');
    let editBtn = undefined;
    await waitFor(async () => {
      editBtn = container.getElementsByClassName('edit-svg');
    });
    await userEvent.click(editBtn[0].parentElement);
    const editInput = await screen.findByPlaceholderText('Edite sua tarefa...');
    await userEvent.clear(editInput);
    expect(editInput).toHaveValue('');
    await userEvent.type(editInput, 'xxxxxx');
    expect(editInput).toHaveValue('xxxxxx');
  });

  it('Não deve ser possível digitar mais 255 caracteres', async () => {
    const { container } = renderApp('/');
    let editBtn = undefined;
    await waitFor(() => {
      editBtn = container.getElementsByClassName('edit-svg');
    });
    await userEvent.click(editBtn[0].parentElement);
    const editInput = await screen.findByPlaceholderText('Edite sua tarefa...');
    await userEvent.clear(editInput);
    expect(editInput).toHaveValue('');
    await userEvent.type(editInput, 'x'.repeat(256));
    expect(editInput).toHaveValue('x'.repeat(255));
  });

  it('Não deve ser possível editar com menos 3 caracteres', async () => {
    const spy = sinon.spy(axios, 'post');
    sinon.stub(taskSchema, 'parse').throws({ issues: [{ message: 'Tarefa deve ter no mínimo 3 caracteres' }] });
    const { container } = renderApp('/');
    let editBtn = undefined;
    await waitFor(() => {
      editBtn = container.getElementsByClassName('edit-svg');
    });
    await userEvent.click(editBtn[0].parentElement);
    const editInput = await screen.findByPlaceholderText('Edite sua tarefa...');
    await userEvent.clear(editInput);
    expect(editInput).toHaveValue('');
    await userEvent.type(editInput, 'te');
    expect(editInput).toHaveValue('te');
    await userEvent.type(editInput, '{enter}');
    const erro = await screen.findByText('Tarefa deve ter no mínimo 3 caracteres');
    expect(erro).toBeInTheDocument();
    expect(spy.notCalled).toBe(true);
  });

  it('Deve ser possível editar a tarefa', async () => {
    sinon.stub(axios, 'put').resolves();
    const { container } = renderApp('/');
    let editBtn = undefined;
    await waitFor(() => {
      editBtn = container.getElementsByClassName('edit-svg');
    });
    await userEvent.click(editBtn[0].parentElement);
    const editInput = await screen.findByPlaceholderText('Edite sua tarefa...');
    await userEvent.clear(editInput);
    expect(editInput).toHaveValue('');
    await userEvent.type(editInput, 'xxxxxx');
    expect(editInput).toHaveValue('xxxxxx');
    await userEvent.type(editInput, '{enter}');
    expect(axios.put.calledWith(`${urls.tasksURL}/${constants.data[0].id}`)).toBe(true);
    expect(editInput).not.toBeInTheDocument();
  });

  it('Não deve ser possível editar quando ocorrer um erro', async () => {
    sinon.stub(axios, 'put').rejects({ response: { data: { error: 'Erro ao editar' } } });
    const { container } = renderApp('/');
    let editBtn = undefined;
    await waitFor(() => {
      editBtn = container.getElementsByClassName('edit-svg');
    });
    await userEvent.click(editBtn[0].parentElement);
    const editInput = await screen.findByPlaceholderText('Edite sua tarefa...');
    userEvent.clear(editInput);
    expect(editInput).toHaveValue('');
    await userEvent.type(editInput, 'xxxxxx');
    expect(editInput).toHaveValue('xxxxxx');
    await userEvent.type(editInput, '{enter}');
    const erro = await screen.findByText('Erro ao editar');
    expect(erro).toBeInTheDocument();
  });
});