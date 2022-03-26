import React, { useState } from 'react';
import ListELem from './ListElem';
import {
  formData,
  initialFormFields,
  getLocalForms,
  saveLocalForms,
} from './Form';

export function Home(props: { openFormCB: (id: number) => void }) {
  const [formsState, setFormsState] = useState(() => getLocalForms());

  const addNewForm = () => {
    const newForm: formData = {
      id: Number(new Date()),
      title: 'Untitled Form',
      formFields: initialFormFields,
    };

    saveLocalForms([...formsState, newForm]);
    setFormsState(getLocalForms());
  };
  const removeForm = (id: number) => {
    saveLocalForms(formsState.filter((form) => form.id !== id));
    setFormsState(getLocalForms());
  };

  return (
    <>
      <p className="font-medium font-worksans text-center mb-5">
        Welcome to the Home Page!
      </p>
      <div>
        {formsState.map((form) => (
          <ListELem
            formName={form.title}
            key={form.id}
            id={form.id}
            openFormsCB={props.openFormCB}
            removeFormsCB={removeForm}
          />
        ))}
      </div>

      {formsState.length === 0 ? (
        <>
          <div className="text-gray-400  text-center">
            There are no forms to display!
          </div>
          <div className="text-gray-400  text-center mb-3">
            Click the button below to add a new form...
          </div>
        </>
      ) : (
        ''
      )}

      <button
        className="w-full bg-blue-500 font-medium font-worksans rounded-lg px-4 py-2 my-2 text-white hover:bg-blue-700 smooth-effect"
        type="submit"
        onClick={addNewForm}
      >
        New Form
      </button>
    </>
  );
}
