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

describe('Edit Input', () => {
  beforeEach(async () => {
    sinon.stub(localForage, 'getItem').resolves(constants.id);
    sinon.stub(axios, 'get').resolves({ data: constants.data });
  });
  afterEach(() => {
    sinon.restore();
  });
});