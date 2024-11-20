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

  // Додаємо елемент перед кожним тестом
  beforeEach(() => {
    mockOnAdd.mockClear();
    mockOnCancel.mockClear();

    // Створюємо контейнер 
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(modalRoot);
  });

  // Видаляємо контейнер після кожного тесту
  afterEach(() => {
    const modalRoot = document.getElementById("modal-root");
    if (modalRoot) {
      document.body.removeChild(modalRoot);
    }
  });

  // 1. Error when the dueDate field is empty
  test("Displays error when dueDate field is empty", () => {
    render(<NewProject onAdd={mockOnAdd} onCancel={mockOnCancel} />);
    
    // Заповнюємо тільки title та description
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "New Project" } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: "Description of the project" } });

    // Натискаємо кнопку збереження
    fireEvent.click(screen.getByText(/save/i));

    // модальне вікно з помилкою відкрите
    expect(screen.getByText(/invalid input/i)).toBeInTheDocument();
    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  // 2. Error for past dueDate value
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
