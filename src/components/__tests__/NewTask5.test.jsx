import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import NewTask from "../NewTask";

describe("NewTask Component", () => {
  const mockOnAdd = jest.fn();

  beforeEach(() => {
    HTMLDialogElement.prototype.showModal = jest.fn();
    mockOnAdd.mockClear();
  });

  beforeEach(() => {
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(modalRoot);
  });

  afterEach(() => {
    const modalRoot = document.getElementById("modal-root");
    if (modalRoot) {
      document.body.removeChild(modalRoot);
    }
  });

  test("Displays error modal when input is empty", () => {
    render(<NewTask onAdd={mockOnAdd} />);

    fireEvent.click(screen.getByText(/add task/i));


    expect(screen.getByText(/invalid input/i)).toBeInTheDocument();
    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  test("Adds task when input is valid and contains a short text", () => {
    render(<NewTask onAdd={mockOnAdd} />);

    fireEvent.change(screen.getByRole("textbox"), { target: { value: "Task 1" } });
    fireEvent.click(screen.getByText(/add task/i));

    expect(mockOnAdd).toHaveBeenCalledWith("Task 1");

    expect(screen.getByRole("textbox")).toHaveValue("");
  });

  test("Adds task when input contains special characters", () => {
    render(<NewTask onAdd={mockOnAdd} />);

    fireEvent.change(screen.getByRole("textbox"), { target: { value: "Task #1!" } });
    fireEvent.click(screen.getByText(/add task/i));

    expect(mockOnAdd).toHaveBeenCalledWith("Task #1!");

    expect(screen.getByRole("textbox")).toHaveValue("");
  });
});
