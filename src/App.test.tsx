import { render, screen } from "@testing-library/react";

import App from "./App";

describe("<App /> Test Suite", () => {
  it("should render a cart button", () => {
    render(<App />);
    expect(screen.getByRole('toggle-cart')).toBeInTheDocument();
  });

  it("should render a brand header", () => {
    render(<App />);
    expect(screen.getByRole('brand-header')).toBeInTheDocument();
  });

  it("should break", () => {
    expect(true).toBeFalsy();
  });
});