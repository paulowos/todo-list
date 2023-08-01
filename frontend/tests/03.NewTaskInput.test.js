import { screen } from "@testing-library/react";
import renderApp from "./helpers/renderApp";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import constants from "./helpers/constants";
import userEvent from '@testing-library/user-event';
import sinon from "sinon";
import axios from "axios";
import localForage from "localforage";
import taskSchema from "../src/schemas/task";
import urls from "../src/utils/urls";


describe('New Task Input', () => {
  beforeEach(async () => {
    sinon.stub(localForage, 'getItem').resolves(constants.id);
    sinon.stub(axios, 'get').resolves({ data: constants.data });
  });
  afterEach(() => {
    sinon.restore();
  });

  it('Deve ser possível digitar uma tarefa', async () => {
    renderApp('/');
    const addTaskInput = await screen.findByPlaceholderText('Digite a sua tarefa...');
    expect(addTaskInput).toBeInTheDocument();
    expect(addTaskInput).toHaveValue('');
    await userEvent.type(addTaskInput, 'teste task');
    expect(addTaskInput).toHaveValue('teste task');
  });

  it('Deve ser possível adicionar uma tarefa', async () => {
    sinon.stub(axios, 'post').resolves({ data: { id: constants.id } });
    renderApp('/');
    const addTaskInput = await screen.findByPlaceholderText('Digite a sua tarefa...');
    const addBtn = await screen.findByText('Adicionar');
    await userEvent.type(addTaskInput, 'teste task');
    expect(addTaskInput).toHaveValue('teste task');
    await userEvent.click(addBtn);
    expect(axios.post.calledWith(urls.tasksURL)).toBe(true);
    expect(axios.post.calledWith(urls.tasksURL, { task: 'teste task' })).toBe(true);
  });

  it('Não deve ser possível adicionar uma tarefa com valor menor que 3 caracteres', async () => {
    const spy = sinon.spy(axios, 'post');
    sinon.stub(taskSchema, 'parse').throws({ issues: [{ message: 'Tarefa deve ter no mínimo 3 caracteres' }] });
    renderApp('/');
    const addTaskInput = await screen.findByPlaceholderText('Digite a sua tarefa...');
    const addBtn = await screen.findByText('Adicionar');
    await userEvent.type(addTaskInput, 'te');
    expect(addTaskInput).toHaveValue('te');
    await userEvent.click(addBtn);
    expect(spy.notCalled).toBe(true);
    const erro = await screen.findByText('Tarefa deve ter no mínimo 3 caracteres');
    expect(erro).toBeInTheDocument();
  });

  it('Não deve ser possível digitar mais 255 caracteres', async () => {
    const spy = sinon.spy(axios, 'post');
    renderApp('/');
    const addTaskInput = await screen.findByPlaceholderText('Digite a sua tarefa...');
    await userEvent.type(addTaskInput, ('x'.repeat(256)));
    expect(addTaskInput).toHaveValue('x'.repeat(255));
    expect(spy.notCalled).toBe(true);
  });

  it('Não deve ser possível adicionar uma tarefa quando ocorrer um erro', async () => {
    sinon.stub(axios, 'post').rejects({ response: { data: { error: 'Erro ao adicionar' } } });
    renderApp('/');
    const addTaskInput = await screen.findByPlaceholderText('Digite a sua tarefa...');
    const addBtn = await screen.findByText('Adicionar');
    await userEvent.type(addTaskInput, 'teste task');
    expect(addTaskInput).toHaveValue('teste task');
    await userEvent.click(addBtn);
    const erro = await screen.findByText('Erro ao adicionar');
    expect(erro).toBeInTheDocument();
  });
});