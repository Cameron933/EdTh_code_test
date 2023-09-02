import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../src/App";

describe("App", () => {
  it("should renders page title message", () => {
    render(<App />);
    const title = screen.getByText("Welcome to the Education Horizons");
    expect(title).toBeInTheDocument();
  });

  // it("should renders StudentTable component with mockData in success", () => {});
  // it("should open StudentDetailsModal with mockData in success", () => {});
  // it("should update Student first & last name in success", () => {});
});
