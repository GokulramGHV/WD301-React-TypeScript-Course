import React from 'react';
import Header from './Header';

export default function AppContainer(props: { children: React.ReactNode }) {
  return (
    <div
      className="flex w-full bg-gray-100 items-center p-5"
      style={{ height: '100vh' }}
    >
      <div
        className="px-4 py-2 mx-auto bg-white shadow-lg rounded-xl"
        style={{ width: '75vh' }}
      >
        {props.children}
      </div>
    </div>
  );
}
