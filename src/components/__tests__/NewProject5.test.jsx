import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'; 
import NewProject from "../NewProject";

describe("NewProject Component", () => {
  const mockOnAdd = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    HTMLDialogElement.prototype.showModal = jest.fn();
  });

  beforeEach(() => {
    mockOnAdd.mockClear();
    mockOnCancel.mockClear();

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

  test("Displays error when title field is empty", () => {
    render(<NewProject onAdd={mockOnAdd} onCancel={mockOnCancel} />);
    
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: "Description of the project" } });
    fireEvent.change(screen.getByLabelText(/due date/i), { target: { value: "2024-12-31" } });

    fireEvent.click(screen.getByText(/save/i));

    expect(screen.getByText(/invalid input/i)).toBeInTheDocument();
    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  test("Displays error when description field is empty", () => {
    render(<NewProject onAdd={mockOnAdd} onCancel={mockOnCancel} />);
    
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "New Project" } });
    fireEvent.change(screen.getByLabelText(/due date/i), { target: { value: "2024-12-31" } });

    fireEvent.click(screen.getByText(/save/i));

    expect(screen.getByText(/invalid input/i)).toBeInTheDocument();
    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  test("Displays error when dueDate field is empty", () => {
    render(<NewProject onAdd={mockOnAdd} onCancel={mockOnCancel} />);
    

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "New Project" } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: "Description of the project" } });

    fireEvent.click(screen.getByText(/save/i));

    expect(screen.getByText(/invalid input/i)).toBeInTheDocument();
    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  test("Successfully adds project when all fields are valid", () => {
    render(<NewProject onAdd={mockOnAdd} onCancel={mockOnCancel} />);
    
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "New Project" } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: "Description of the project" } });
    fireEvent.change(screen.getByLabelText(/due date/i), { target: { value: "2024-12-31" } });

    fireEvent.click(screen.getByText(/save/i));

    expect(mockOnAdd).toHaveBeenCalledWith({
      title: "New Project",
      description: "Description of the project",
      dueDate: "2024-12-31",
    });
  });

  test("Displays error when dueDate is in the past", () => {
    render(<NewProject onAdd={mockOnAdd} onCancel={mockOnCancel} />);
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "New Project" } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: "Description of the project" } });
    fireEvent.change(screen.getByLabelText(/due date/i), { target: { value: "2020-01-01" } }); // past date
    fireEvent.click(screen.getByText(/save/i));
    expect(screen.getByText(/Due Date cannot be in the past. Please select a future date./i)).toBeInTheDocument(); 
    expect(mockOnAdd).not.toHaveBeenCalled();
  });
});
