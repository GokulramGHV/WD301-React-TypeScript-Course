import React, { useState } from 'react';
import UserInput from './UserInput';

const formFields = [
  { id: 1, label: 'First Name', type: 'text', value: '' },
  { id: 2, label: 'Last Name', type: 'text', value: '' },
  { id: 3, label: 'Email', type: 'email', value: '' },
  { id: 4, label: 'Date of Birth', type: 'date', value: '' },
  { id: 5, label: 'Phone Number', type: 'number', value: '' },
];

export function Form(props: { closeFormCB: () => void }) {
  const [newField, setNewField] = useState('');
  const [state, setState] = useState(formFields);
  const addField = () => {
    if (newField != '') {
      setState([
        ...state,
        {
          id: Number(new Date()),
          label: newField,
          type: 'text',
          value: '',
        },
      ]);
      setNewField('');
    }
  };

  const removeField = (id: number) => {
    setState(state.filter((field) => field.id !== id));
  };

  const resetFields = () => {
    let arr: any = [];
    state.forEach((s) => {
      let obj = {
        ...s,
        value: '',
      };
      arr.push(obj);
    });
    setState(arr);
  };

  const onChangeField = (val: string, id: number) => {
    let arr: any = [];
    state.forEach((s) => {
      if (s.id == id) {
        let obj = {
          ...s,
          value: val,
        };
        arr.push(obj);
      } else {
        arr.push(s);
      }
    });
    setState(arr);
  };

  return (
    <div className="grid grid-cols-1 divide-y-2">
      <div className="mb-2">
        {state.map((field) => (
          <UserInput
            id={field.id}
            key={field.id}
            label={field.label}
            type={field.type}
            value={field.value}
            removeFieldCB={removeField}
            onChangeCB={onChangeField}
          />
        ))}
      </div>

      <div>
        <div className="flex w-full mt-2">
          <input
            onChange={(e) => {
              setNewField(e.target.value);
            }}
            value={newField}
            placeholder="Enter field name"
            type="text"
            className=" flex-1 border-2 border-gray-300 rounded-lg p-2 mt-1 mb-2 smooth-effect hover:border-blue-400 hover:ring-blue-400 focus:ring-blue-400 focus:border-blue-400"
          />

          <button
            className="ml-3 w-32 bg-blue-500 font-medium font-worksans rounded-lg px-4 py-2 my-2 text-white hover:bg-blue-700 smooth-effect"
            onClick={addField}
          >
            Add Field
          </button>
        </div>

        <button
          className="mr-3 w-28 bg-blue-500 font-medium font-worksans rounded-lg px-4 py-2 my-2 text-white hover:bg-blue-700 smooth-effect"
          onClick={resetFields}
        >
          Reset
        </button>

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
      </div>
    </div>
  );
}
