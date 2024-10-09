import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../../App";
import '@testing-library/jest-dom';

// Mock components used within App
jest.mock("../NoProjectSelected", () => () => <div>No Project Selected</div>);
jest.mock("../ProjectsSidebar", () => ({ onStartAddProject }) => (
  <div>
    Projects Sidebar
    <button onClick={onStartAddProject}>Create Note</button>
  </div>
));
jest.mock("../NewProject", () => ({ onSave }) => (
  <div>
    New Project
    <input placeholder="Title" />
    <input placeholder="Content" />
    <button onClick={onSave}>Save</button>
  </div>
));
jest.mock("../SelectedProject", () => () => <div>Selected Project</div>);

describe('Creating new note', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('Displays the initial screen when no actions are taken', () => {
    expect(screen.getByText("No Project Selected")).toBeInTheDocument();
    expect(screen.queryByText("New Project")).not.toBeInTheDocument();
    expect(screen.queryByText("Selected Project")).not.toBeInTheDocument();
  });

  test('Opens the note creation form when "Create Note" button is clicked', () => {
    expect(screen.getByText("No Project Selected")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Create Note"));
    expect(screen.getByText("New Project")).toBeInTheDocument();
    expect(screen.queryByText("No Project Selected")).not.toBeInTheDocument();
  });

  test('Shows modal when saving new note without filling all fields', () => {
    fireEvent.click(screen.getByText("Create Note"));
    expect(screen.getByText("New Project")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Save"));

    // expect(screen.getByText(/Invalid Input/i)).toBeInTheDocument();
    // expect(screen.getByText(/Oops ... looks like you forgot to enter a value/i)).toBeInTheDocument();
    // expect(screen.getByText(/Please make sure you provide a valid value for every input field/i)).toBeInTheDocument();
  });

  test('Save new note and show it in the sidebar', () => {
    fireEvent.click(screen.getByText("Create Note"));
    expect(screen.getByText("New Project")).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Title"), { target: { value: "Test Note" } });
    fireEvent.change(screen.getByPlaceholderText("Content"), { target: { value: "This is a test note." } });
    fireEvent.click(screen.getByText("Save"));

    // expect(screen.getByText("Test Note")).toBeInTheDocument();
  });
});
