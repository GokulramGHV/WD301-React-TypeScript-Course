import React from 'react';
import { FormField_api } from '../types/common';
export default function PreviewDropdown(props: {
  field: FormField_api;
  onChangeFieldCB: (val: string, id: number) => void;
}) {
  return (
    <div>
      <div className="text-2xl mb-1">
        <label>{props.field.label}</label>
      </div>
      <select
        name="dropdown"
        id="dropdown"
        onChange={(e) => {
          let value = e.target.value;
          props.onChangeFieldCB(value, props.field.id as number);
        }}
        className="w-full border-2 border-gray-300 rounded-lg p-2 mt-1 mb-2 smooth-effect hover:border-blue-400 hover:ring-blue-400 focus:ring-blue-400 focus:border-blue-400"
      >
        <option value="" hidden>
          {' '}
          --- Select an option ---{' '}
        </option>
        {props.field.options?.map((opt, index) => (
          <option value={opt} key={index} selected={props.field.value === opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
