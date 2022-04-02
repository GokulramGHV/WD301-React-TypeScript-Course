import React from 'react';
export default function PreviewInput(props: {
  id: number;
  label: string;
  type: string;
  value: string;
  onChangeCB: (val: string, id: number) => void;
}) {
  return (
    <div>
      <div className="text-2xl mb-1">
        <label>{props.label}</label>
      </div>
      <div className="flex">
        <input
          type={props.type}
          value={props.value}
          onChange={(e) => {
            let value = e.target.value;
            props.onChangeCB(value, props.id);
          }}
          className="flex-1 border-2 border-gray-300 rounded-lg p-2 mt-1 mb-2 smooth-effect hover:border-blue-400 hover:ring-blue-400 focus:ring-blue-400 focus:border-blue-400"
        />
      </div>
    </div>
  );
}
