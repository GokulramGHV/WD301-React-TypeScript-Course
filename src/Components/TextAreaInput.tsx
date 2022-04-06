import React from 'react';
import { listOfTypes } from '../types/formTypes';

export default function TextAreaInput(props: {
  id: number;
  label: string;
  type: string;
  value: string;
  removeFieldCB: (id: number) => void;
  onChangeCB: (val: string, id: number) => void;
}) {
  return (
    <React.Fragment>
      <div className="flex">
        <input
          type="text"
          value={props.value}
          onChange={(e) => {
            let value = e.target.value;
            props.onChangeCB(value, props.id);
          }}
          title="TextArea"
          className="flex-1 border-2 border-gray-300 rounded-lg p-2 mt-1 mb-2 smooth-effect hover:border-blue-400 hover:ring-blue-400 focus:ring-blue-400 focus:border-blue-400"
        />
        
        <button
          className="ml-3 w-28 bg-blue-500 font-medium font-worksans rounded-lg px-2 py-2 my-2 text-white hover:bg-blue-700 smooth-effect"
          onClick={(_) => props.removeFieldCB(props.id)}
        >
          Remove
        </button>
      </div>
    </React.Fragment>
  );
}
