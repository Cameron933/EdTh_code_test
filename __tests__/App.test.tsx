import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import "@testing-library/jest-dom";
import App from "../src/App";
import { mockData } from "./mockData/mockTestingData";
import StudentDetailsModal from "../src/components/StudentDetailsModal";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.get.mockResolvedValue({ data: mockData });

describe("App", () => {
  it("should renders page title message", () => {
    render(<App />);
    const title = screen.getByText("Welcome to the Education Horizons");
    expect(title).toBeInTheDocument();
  });

  // it("should renders StudentTable component with mockData in success", async () => {
  //   render(<App />);
  //   await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));
  //   mockData.forEach((student: any) => {
  //     expect(screen.getByText(`${student.first_name} ${student.last_name}`)).toBeInTheDocument();
  //     expect(screen.getByText(student.date_of_birth)).toBeInTheDocument();
  //   });
  // });

  // it("should open StudentDetailsModal with mockData in success", async () => {
  //   render(<App />);
  //   mockedAxios.get.mockResolvedValueOnce({ data: mockData[0] });
  //   await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));

  //   const nameCell = screen.getByRole("cell", { name: /john doe/i });

  //   fireEvent.click(nameCell);
  //   expect(<StudentDetailsModal isOpen={true} onClose={jest.fn()} />);

  //   expect(
  //     screen.getByText(`${mockData[0].first_name} ${mockData[0].last_name}'s profile`)
  //   ).toBeInTheDocument();
  //   expect(screen.getByText(mockData[0].date_of_birth)).toBeInTheDocument();
  //   expect(
  //     screen.getByText(`Street line 1: ${mockData[0].address.street_line1}`)
  //   ).toBeInTheDocument();
  // });

  // it("should update Student first & last name in success", () => {});
});
