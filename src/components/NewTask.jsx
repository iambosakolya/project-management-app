import React from 'react';
import Modal from './Modal';

function NewTask({ onAdd }) {
  const modal = React.useRef();
  const [enteredTask, setEnteredTask] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  function handleChange(event) {
    setEnteredTask(event.target.value);
  }

  function handleClick() {
    const trimmedTask = enteredTask.trim();

    // Валідація на порожній текст
    if (trimmedTask === '') {
      setErrorMessage('Oops ... looks like you forgot to enter a value.');
      modal.current.open();
      return;
    }

    // Валідація на мінімальну довжину
    if (trimmedTask.length < 2) {
      setErrorMessage('Task must be at least 2 characters long.');
      modal.current.open();
      return;
    }

    // Валідація на максимальну довжину
    if (trimmedTask.length > 60) {
      setErrorMessage('Task cannot exceed 60 characters.');
      modal.current.open();
      return;
    }

    // Додавання завдання
    onAdd(trimmedTask);
    setEnteredTask('');
  }

  return (
    <>
      <Modal ref={modal} buttonCaption="Okay">
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
        <p className="text-stone-600 mb-4">{errorMessage}</p>
      </Modal>
      <div className="flex items-center gap-4">
        <input
          type="text"
          className="w-64 px-2 py-1 rounded-sm bg-stone-200"
          onChange={handleChange}
          value={enteredTask}
          placeholder="Enter task (2-60 chars)"
        />
        <button
          className="text-stone-700 hover:text-stone-950"
          onClick={handleClick}
        >
          Add Task
        </button>
      </div>
    </>
  );
}

export default NewTask;
