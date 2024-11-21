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

  // Add modal container before each test
  beforeEach(() => {
    mockOnAdd.mockClear();
    mockOnCancel.mockClear();

    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(modalRoot);
  });

  // Remove modal container after each test
  afterEach(() => {
    const modalRoot = document.getElementById("modal-root");
    if (modalRoot) {
      document.body.removeChild(modalRoot);
    }
  });

    test("Displays error when title is 1 character long", () => {
      render(<NewProject onAdd={mockOnAdd} onCancel={mockOnCancel} />);
      fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "A" } });
      fireEvent.change(screen.getByLabelText(/description/i), { target: { value: "Valid Description" } });
      fireEvent.change(screen.getByLabelText(/due date/i), { target: { value: "2024-12-31" } });
      fireEvent.click(screen.getByText(/save/i));
      expect(screen.getByText(/title must be between 2 and 30 characters/i)).toBeInTheDocument();
      expect(mockOnAdd).not.toHaveBeenCalled();
    });

    test("Saves successfully when title is 2 characters long", () => {
      render(<NewProject onAdd={mockOnAdd} onCancel={mockOnCancel} />);
      fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "AB" } });
      fireEvent.change(screen.getByLabelText(/description/i), { target: { value: "Valid Description" } });
      fireEvent.change(screen.getByLabelText(/due date/i), { target: { value: "2024-12-31" } });
      fireEvent.click(screen.getByText(/save/i));
      expect(mockOnAdd).toHaveBeenCalledWith({
        title: "AB",
        description: "Valid Description",
        dueDate: "2024-12-31",
      });
    });

    test("Saves successfully when title is 3 characters long", () => {
      render(<NewProject onAdd={mockOnAdd} onCancel={mockOnCancel} />);
      fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "ABС" } });
      fireEvent.change(screen.getByLabelText(/description/i), { target: { value: "Valid Description" } });
      fireEvent.change(screen.getByLabelText(/due date/i), { target: { value: "2024-12-31" } });
      fireEvent.click(screen.getByText(/save/i));
      expect(mockOnAdd).toHaveBeenCalledWith({
        title: "ABС",
        description: "Valid Description",
        dueDate: "2024-12-31",
      });
    });

    test("Saves successfully when title is 29 characters long", () => {
      render(<NewProject onAdd={mockOnAdd} onCancel={mockOnCancel} />);
      fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "A".repeat(29) } });
      fireEvent.change(screen.getByLabelText(/description/i), { target: { value: "Valid Description" } });
      fireEvent.change(screen.getByLabelText(/due date/i), { target: { value: "2024-12-31" } });
      fireEvent.click(screen.getByText(/save/i));
      expect(mockOnAdd).toHaveBeenCalledWith({
        title: "A".repeat(29),
        description: "Valid Description",
        dueDate: "2024-12-31",
      });
    });

    test("Saves successfully when title is 30 characters long", () => {
      render(<NewProject onAdd={mockOnAdd} onCancel={mockOnCancel} />);
      fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "A".repeat(30) } });
      fireEvent.change(screen.getByLabelText(/description/i), { target: { value: "Valid Description" } });
      fireEvent.change(screen.getByLabelText(/due date/i), { target: { value: "2024-12-31" } });
      fireEvent.click(screen.getByText(/save/i));
      expect(mockOnAdd).toHaveBeenCalledWith({
        title: "A".repeat(30),
        description: "Valid Description",
        dueDate: "2024-12-31",
      });
    });

    test("Displays error when title is 31 characters long", () => {
      render(<NewProject onAdd={mockOnAdd} onCancel={mockOnCancel} />);
      fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "A".repeat(31) } });
      fireEvent.change(screen.getByLabelText(/description/i), { target: { value: "Valid Description" } });
      fireEvent.change(screen.getByLabelText(/due date/i), { target: { value: "2024-12-31" } });
      fireEvent.click(screen.getByText(/save/i));
      expect(screen.getByText(/title must be between 2 and 30 characters/i)).toBeInTheDocument();
      expect(mockOnAdd).not.toHaveBeenCalled();
    });

    // description

    test("Displays error when description is 1 character long", () => {
      render(<NewProject onAdd={mockOnAdd} onCancel={mockOnCancel} />);

      fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "Project Title" } });
      fireEvent.change(screen.getByLabelText(/description/i), { target: { value: "A" } });
      fireEvent.change(screen.getByLabelText(/due date/i), { target: { value: "2024-12-31" } });

      fireEvent.click(screen.getByText(/save/i));
      expect(screen.getByText(/description must be between 2 and 255 characters./i)).toBeInTheDocument();
      expect(mockOnAdd).not.toHaveBeenCalled();
    });

    test("Saves successfully when description is 2 characters long", () => {
      render(<NewProject onAdd={mockOnAdd} onCancel={mockOnCancel} />);

      fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "Project Title" } });
      fireEvent.change(screen.getByLabelText(/description/i), { target: { value: "AB" } });
      fireEvent.change(screen.getByLabelText(/due date/i), { target: { value: "2024-12-31" } });

      fireEvent.click(screen.getByText(/save/i));
      expect(mockOnAdd).toHaveBeenCalledWith({
        title: "Project Title",
        description: "AB",
        dueDate: "2024-12-31",
      });
      expect(mockOnAdd).toHaveBeenCalledTimes(1);
    });

    test("Saves successfully when description is 3 characters long", () => {
      render(<NewProject onAdd={mockOnAdd} onCancel={mockOnCancel} />);

      fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "Project Title" } });
      fireEvent.change(screen.getByLabelText(/description/i), { target: { value: "ABC" } });
      fireEvent.change(screen.getByLabelText(/due date/i), { target: { value: "2024-12-31" } });

      fireEvent.click(screen.getByText(/save/i));
      expect(mockOnAdd).toHaveBeenCalledWith({
        title: "Project Title",
        description: "ABC",
        dueDate: "2024-12-31",
      });
      expect(mockOnAdd).toHaveBeenCalledTimes(1);
    });

    test("Saves successfully when description is 254 characters long", () => {
      render(<NewProject onAdd={mockOnAdd} onCancel={mockOnCancel} />);

      const longDescription = "A".repeat(254);
      fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "Project Title" } });
      fireEvent.change(screen.getByLabelText(/description/i), { target: { value: longDescription } });
      fireEvent.change(screen.getByLabelText(/due date/i), { target: { value: "2024-12-31" } });

      fireEvent.click(screen.getByText(/save/i));
      expect(mockOnAdd).toHaveBeenCalledWith({
        title: "Project Title",
        description: longDescription,
        dueDate: "2024-12-31",
      });
      expect(mockOnAdd).toHaveBeenCalledTimes(1);
    });


    test("Saves successfully when description is 255 characters long", () => {
      render(<NewProject onAdd={mockOnAdd} onCancel={mockOnCancel} />);

      const longDescription = "A".repeat(255);
      fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "Project Title" } });
      fireEvent.change(screen.getByLabelText(/description/i), { target: { value: longDescription } });
      fireEvent.change(screen.getByLabelText(/due date/i), { target: { value: "2024-12-31" } });

      fireEvent.click(screen.getByText(/save/i));
      expect(mockOnAdd).toHaveBeenCalledWith({
        title: "Project Title",
        description: longDescription,
        dueDate: "2024-12-31",
      });
      expect(mockOnAdd).toHaveBeenCalledTimes(1);
    });

  test("Displays error when description is 256 characters long", () => {
    render(<NewProject onAdd={mockOnAdd} onCancel={mockOnCancel} />);

    const longDescription = "A".repeat(256);
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "Project Title" } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: longDescription } });
    fireEvent.change(screen.getByLabelText(/due date/i), { target: { value: "2024-12-31" } });

    fireEvent.click(screen.getByText(/save/i));
    expect(screen.getByText(/description must be between 2 and 255 characters./i)).toBeInTheDocument();
    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  // DUE DATE
  test("Displays error when the date is yesterday", () => {
    render(<NewProject onAdd={mockOnAdd} onCancel={mockOnCancel} />);
  
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const formattedYesterday = yesterday.toISOString().split("T")[0];    
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "Project Title" } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: "Description" } });
    fireEvent.change(screen.getByLabelText(/due date/i), { target: { value: formattedYesterday } });

    fireEvent.click(screen.getByText(/save/i));
    expect(screen.getByText(/due date cannot be in the past. please select a future date./i)).toBeInTheDocument();
    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  test("Accepts today's date as valid", () => {
    render(<NewProject onAdd={mockOnAdd} onCancel={mockOnCancel} />);
  
    const today = new Date().toISOString().split("T")[0];
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "Project Title" } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: "Description" } });
    fireEvent.change(screen.getByLabelText(/due date/i), { target: { value: today } });
  
    fireEvent.click(screen.getByText(/save/i));
    expect(mockOnAdd).toHaveBeenCalledWith({
      title: "Project Title",
      description: "Description",
      dueDate: today,
    });
    expect(mockOnAdd).toHaveBeenCalledTimes(1);
  });

  test("Displays error when the date is tomorrow", () => {
    render(<NewProject onAdd={mockOnAdd} onCancel={mockOnCancel} />);
  
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const formattedTomorrow = tomorrow.toISOString().split("T")[0];
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "Project Title" } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: "Description" } });
    fireEvent.change(screen.getByLabelText(/due date/i), { target: { value: formattedTomorrow } });
  
    fireEvent.click(screen.getByText(/save/i));
    expect(mockOnAdd).toHaveBeenCalledWith({
      title: "Project Title",
      description: "Description",
      dueDate: formattedTomorrow,
    });
    expect(mockOnAdd).toHaveBeenCalledTimes(1);
  });

  test("Accepts when the date is any future date", () => {
    render(<NewProject onAdd={mockOnAdd} onCancel={mockOnCancel} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "Project Title" } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: "Description" } });
    fireEvent.change(screen.getByLabelText(/due date/i), { target: { value: "2026-12-01" } });

    fireEvent.click(screen.getByText(/save/i));
    expect(mockOnAdd).toHaveBeenCalledWith({
      title: "Project Title",
      description: "Description",
      dueDate: "2026-12-01",
    });
    expect(mockOnAdd).toHaveBeenCalledTimes(1);
  });

  test("Displays error when the date is past", () => {
    render(<NewProject onAdd={mockOnAdd} onCancel={mockOnCancel} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "Project Title" } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: "Description" } });
    fireEvent.change(screen.getByLabelText(/due date/i), { target: { value: "2020-01-01" } });

    fireEvent.click(screen.getByText(/save/i));
    expect(screen.getByText(/due date cannot be in the past. please select a future date./i)).toBeInTheDocument();
    expect(mockOnAdd).not.toHaveBeenCalled();
  });
  
});
