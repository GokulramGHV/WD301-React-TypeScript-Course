import React, { useState, useEffect, useRef } from 'react';
import PreviewInput from './PreviewInput';

export interface formData {
  id: number;
  title: string;
  formFields: formField[];
}
export interface formField {
  id: number;
  label: string;
  type: string;
  value: string;
}
export const initialFormFields: formField[] = [
  { id: 1, label: 'First Name', type: 'text', value: '' },
  { id: 2, label: 'Last Name', type: 'text', value: '' },
  { id: 3, label: 'Email', type: 'email', value: '' },
  { id: 4, label: 'Date of Birth', type: 'date', value: '' },
  { id: 5, label: 'Phone Number', type: 'number', value: '' },
];

export const getLocalForms: () => formData[] = () => {
  const savedFormsJSON = localStorage.getItem('savedForms');
  return savedFormsJSON ? JSON.parse(savedFormsJSON) : [];
};

export const getLocalResponses: () => formData[] = () => {
  const savedFormsJSON = localStorage.getItem('savedFormResponses');
  return savedFormsJSON ? JSON.parse(savedFormsJSON) : [];
};

const initialState: (id: number) => formData = (id: number) => {
  const localForms = getLocalForms();
  for (let i = 0; i < localForms.length; i++) {
    if (localForms[i].id === id) return localForms[i];
  }
  const newForm = {
    id: Number(new Date()),
    title: 'Untitled Form',
    formFields: initialFormFields,
  };
  // saveLocalForms([...localForms, newForm]);
  return newForm;
};

export const saveLocalForms = (localForm: formData[]) => {
  localStorage.setItem('savedFormResponses', JSON.stringify(localForm));
};

const saveFormResponse = (currentState: formData) => {
  const localResponses = getLocalResponses();
  // const updatedLocalForms = localForms.map((form) =>
  //   form.id === currentState.id ? currentState : form
  // );
  const Response = {
    id: Number(new Date()),
    title: currentState.title,
    formFields: currentState.formFields,
  };
  saveLocalForms([...localResponses, Response]);
};

export default function Preview(props: { formID: number }) {
  const [state, setState] = useState(() => initialState(props.formID));
  const [quesNo, setQuesNo] = useState(0);
  const nextQues = () => {
    setQuesNo((quesNo) => (state.formFields[quesNo + 1] ? quesNo + 1 : quesNo));
  };
  const prevQues = () => {
    setQuesNo((quesNo) => (state.formFields[quesNo - 1] ? quesNo - 1 : quesNo));
  };

  const onChangeField = (val: string, id: number) => {
    setState((state) => {
      return {
        ...state,
        formFields: state.formFields.map((s) => {
          if (s.id === id) return { ...s, value: val };
          return s;
        }),
      };
    });
  };

  let currentField = state.formFields[quesNo];

  return (
    <div className="p-2">
      <div className="text-3xl font-semibold mb-2">{state.title}</div>
      <div className="text-gray-400 mb-4">
        Question {quesNo + 1} of {state.formFields.length}{' '}
      </div>

      {
        <PreviewInput
          id={currentField.id}
          label={currentField.label}
          type={currentField.type}
          value={currentField.value}
          onChangeCB={onChangeField}
        />
      }

      <div className="mt-3">
        {state.formFields[quesNo - 1] && (
          <button
            onClick={prevQues}
            className="mr-3 shadow-lg w-10 bg-blue-500 font-medium font-worksans rounded-full px-2 py-2 my-2 text-white hover:bg-blue-700 smooth-effect"
          >
            <i className="fas fa-arrow-left"></i>
          </button>
        )}

        {state.formFields[quesNo + 1] && (
          <button
            onClick={nextQues}
            className="mr-3 shadow-lg w-10 bg-blue-500 font-medium font-worksans rounded-full px-2 py-2 my-2 text-white hover:bg-blue-700 smooth-effect"
          >
            <i className="fas fa-arrow-right"></i>
          </button>
        )}

        {!state.formFields[quesNo + 1] && (
          <button
            onClick={(_) => {
              saveFormResponse(state);
            }}
            className="float-right w-28 shadow-md bg-blue-500 font-medium font-worksans rounded-lg px-2 py-2 my-2 text-white hover:bg-blue-700 smooth-effect"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
