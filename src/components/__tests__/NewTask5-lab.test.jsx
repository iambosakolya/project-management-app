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

  // Додаємо контейнер для модального вікна перед кожним тестом
  beforeEach(() => {
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(modalRoot);
  });

  // Видаляємо контейнер для модального вікна після кожного тесту
  afterEach(() => {
    const modalRoot = document.getElementById("modal-root");
    if (modalRoot) {
      document.body.removeChild(modalRoot);
    }
  });

  // Test 1: Empty value
  test("Displays error modal when input is empty", () => {
    render(<NewTask onAdd={mockOnAdd} />);

    // Натискаємо кнопку "Add Task" з порожнім значенням
    fireEvent.click(screen.getByText(/add task/i));

    // Перевірка, що модальне вікно з помилкою відкрите
    expect(screen.getByText(/invalid input/i)).toBeInTheDocument();
    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  // Test 2: Valid short text input
  test("Adds task when input is valid and contains a short text", () => {
    render(<NewTask onAdd={mockOnAdd} />);

    // Вводимо короткий текст, наприклад, "Task 1"
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "Task 1" } });
    fireEvent.click(screen.getByText(/add task/i));

    // Перевірка, що викликалася функція onAdd із правильним значенням
    expect(mockOnAdd).toHaveBeenCalledWith("Task 1");

    // Перевірка, що поле введення очищується після додавання завдання
    expect(screen.getByRole("textbox")).toHaveValue("");
  });

  // Test 3: Text input with special characters
  test("Adds task when input contains special characters", () => {
    render(<NewTask onAdd={mockOnAdd} />);

    // Вводимо значення з символами, наприклад, "Task #1!"
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "Task #1!" } });
    fireEvent.click(screen.getByText(/add task/i));

    // Перевірка, що викликалася функція onAdd із правильним значенням
    expect(mockOnAdd).toHaveBeenCalledWith("Task #1!");

    // Перевірка, що поле введення очищується після додавання завдання
    expect(screen.getByRole("textbox")).toHaveValue("");
  });
});
