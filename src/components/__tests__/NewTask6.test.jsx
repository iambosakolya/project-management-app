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

  test("1 character input: Displays error for minimum length", () => {
    render(<NewTask onAdd={mockOnAdd} />);

    fireEvent.change(screen.getByPlaceholderText(/enter task/i), { target: { value: "A" } });
    fireEvent.click(screen.getByText(/add task/i));

    expect(screen.getByText(/invalid input/i)).toBeInTheDocument();
    expect(screen.getByText(/task must be at least 2 characters long./i)).toBeInTheDocument();
    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  test("2 character input: Successfully adds task", () => {
    render(<NewTask onAdd={mockOnAdd} />);

    fireEvent.change(screen.getByPlaceholderText(/enter task/i), { target: { value: "AB" } });
    fireEvent.click(screen.getByText(/add task/i));

    expect(mockOnAdd).toHaveBeenCalledTimes(1);
    expect(mockOnAdd).toHaveBeenCalledWith("AB");
  });

  test("3 character input: Successfully adds task", () => {
    render(<NewTask onAdd={mockOnAdd} />);

    fireEvent.change(screen.getByPlaceholderText(/enter task/i), { target: { value: "ABC" } });
    fireEvent.click(screen.getByText(/add task/i));

    expect(mockOnAdd).toHaveBeenCalledTimes(1);
    expect(mockOnAdd).toHaveBeenCalledWith("ABC");
  });

  test("59 character input: Successfully adds task", () => {
    const validInput = "A".repeat(59);
    render(<NewTask onAdd={mockOnAdd} />);

    fireEvent.change(screen.getByPlaceholderText(/enter task/i), { target: { value: validInput } });
    fireEvent.click(screen.getByText(/add task/i));

    expect(mockOnAdd).toHaveBeenCalledTimes(1);
    expect(mockOnAdd).toHaveBeenCalledWith(validInput);
  });

  test("60 character input: Successfully adds task", () => {
    const validInput = "A".repeat(60);
    render(<NewTask onAdd={mockOnAdd} />);

    fireEvent.change(screen.getByPlaceholderText(/enter task/i), { target: { value: validInput } });
    fireEvent.click(screen.getByText(/add task/i));

    expect(mockOnAdd).toHaveBeenCalledTimes(1);
    expect(mockOnAdd).toHaveBeenCalledWith(validInput);
  });

  test("61 character input: Displays error for maximum length exceeded", () => {
    const invalidInput = "A".repeat(61);
    render(<NewTask onAdd={mockOnAdd} />);

    fireEvent.change(screen.getByPlaceholderText(/enter task/i), { target: { value: invalidInput } });
    fireEvent.click(screen.getByText(/add task/i));

    expect(screen.getByText(/invalid input/i)).toBeInTheDocument();
    expect(screen.getByText(/task cannot exceed 60 characters./i)).toBeInTheDocument();
    expect(mockOnAdd).not.toHaveBeenCalled();
  });
});
