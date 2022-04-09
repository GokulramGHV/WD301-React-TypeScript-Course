import React from 'react';
import Header from './Header';

export default function AppContainer(props: {
  children: React.ReactNode;
  currentUser: any;
}) {
  return (
    <div
      className="flex w-full bg-gray-100 items-center p-5"
      style={{ height: '100vh' }}
    >
      <div
        className="px-4 py-2 my-5 mx-auto bg-white shadow-lg rounded-xl"
        style={{ width: '75vh' }}
      >
        <Header currentUser={props.currentUser} />
        {props.children}
      </div>
    </div>
  );
}
