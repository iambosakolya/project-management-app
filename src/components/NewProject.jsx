import React from 'react';
import Input from './Input';
import Modal from './Modal';

function NewProject({ onAdd, onCancel }) {
  const modal = React.useRef();

  const title = React.useRef();
  const description = React.useRef();
  const dueDate = React.useRef();

  const [modalMessage, setModalMessage] = React.useState(
    'Oops ... looks like you forgot to enter a value.'
  );

  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    // Check for empty fields
    if (
      enteredTitle.trim() === '' ||
      enteredDescription.trim() === '' ||
      enteredDueDate.trim() === ''
    ) {
      setModalMessage(
        'Please make sure you provide a valid value for every input field.'
      );
      modal.current.open();
      return;
    }

    // Validate description length
    if (enteredTitle.length < 2 || enteredTitle.length > 30) {
      setModalMessage('Title must be between 2 and 30 characters.');
      modal.current.open();
      return;
    }

    // Validate description length
    if (enteredDescription.length < 2 || enteredDescription.length > 255) {
      setModalMessage('Description must be between 2 and 255 characters.');
      modal.current.open();
      return;
    }

    // Check for past date
    const today = new Date();
    const dueDateValue = new Date(enteredDueDate);
    if (dueDateValue < today.setHours(0, 0, 0, 0)) {
      // Sets time to start of today for comparison
      setModalMessage(
        'Due Date cannot be in the past. Please select a future date.'
      );
      modal.current.open();
      return;
    }

    // If all validations pass, call onAdd
    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    });
  }

  return (
    <>
      <Modal ref={modal} buttonCaption="Okay">
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
        <p className="text-stone-600 mb-4">{modalMessage}</p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              className="text-stone-800 hover:text-stone-950"
              onClick={onCancel}
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
              onClick={handleSave}
            >
              Save
            </button>
          </li>
        </menu>
        <Input type="text" ref={title} label="Title" />
        <Input ref={description} label="Description" textarea />
        <Input type="date" ref={dueDate} label="Due Date" />
      </div>
    </>
  );
}

export default NewProject;
