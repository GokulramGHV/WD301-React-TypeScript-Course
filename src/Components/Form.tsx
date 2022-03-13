import React, { useState } from 'react';
import UserInput from './UserInput';

const formFields = [
  { id: 1, label: 'First Name', type: 'text' },
  { id: 2, label: 'Last Name', type: 'text' },
  { id: 3, label: 'Email', type: 'email' },
  { id: 4, label: 'Date of Birth', type: 'date' },
  { id: 5, label: 'Phone Number', type: 'number' },
];

export function Form(props: { closeFormCB: () => void }) {
  const [state, setState] = useState(formFields);
  const addField = () => {
    setState([
      ...state,
      {
        id: state.length + 2,
        label: 'New Field',
        type: 'text',
      },
    ]);
  };

  return (
    <form className="grid grid-cols-1">
      {state.map((field) => (
        <UserInput key={field.id} label={field.label} type={field.type} />
      ))}
      <div>
        <button
          className="w-28 bg-blue-500 font-medium font-worksans rounded-lg px-4 py-2 my-2 text-white hover:bg-blue-700 smooth-effect"
          type="submit"
        >
          Submit
        </button>
        <button
          className="ml-3 w-32 bg-blue-500 font-medium font-worksans rounded-lg px-4 py-2 my-2 text-white hover:bg-blue-700 smooth-effect"
          onClick={props.closeFormCB}
        >
          Close Form
        </button>

        <button
          className="ml-3 w-32 bg-blue-500 font-medium font-worksans rounded-lg px-4 py-2 my-2 text-white hover:bg-blue-700 smooth-effect"
          onClick={addField}
        >
          Add Field
        </button>
      </div>
    </form>
  );
}
