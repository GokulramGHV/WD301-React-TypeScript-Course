import React from 'react';

export default function UserInput(props: { key: number, label: string, type: string }) {
  return (
    <React.Fragment key={props.key}>
      <label>{props.label}</label>
      <input
        type={props.type}
        className="border-2 border-gray-300 rounded-lg p-2 mt-1 mb-2 smooth-effect hover:border-blue-400 hover:ring-blue-400 focus:ring-blue-400 focus:border-blue-400"
        required
      />
    </React.Fragment>
  );
}
