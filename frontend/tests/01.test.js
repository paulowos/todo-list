import { screen } from "@testing-library/react";
import renderApp from "./helpers/renderApp";
import { describe, expect, it } from "vitest";

describe('Login', () => {
  it('should render login page', () => {
    renderApp('/login');
    const title = screen.getByText('Simple');
    expect(title).toBeInTheDocument();
  });
});