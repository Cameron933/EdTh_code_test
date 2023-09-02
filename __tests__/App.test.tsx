import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../src/App";

describe("App", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("should renders page title message", () => {
    const title = screen.getByText("Welcome to the Education Horizons");
    expect(title).toBeInTheDocument();
  });

  //   it("should renders StudentTable component with mockData in success", () => {

  //   });
});
