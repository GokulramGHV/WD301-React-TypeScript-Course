import React from 'react';
import logo from '../logo.svg';

export function Home(props: {openFormCB: () => void}) {
  return (
    <>
      <div className="flex items-center">
        <img src={logo} alt="logo" className="h-44 animate-pulse " />
        <p className="font-medium font-worksans">Welcome to the Home Page!</p>
      </div>
      <button
        className="w-full bg-blue-500 font-medium font-worksans rounded-lg px-4 py-2 my-2 text-white hover:bg-blue-700 smooth-effect"
        type="submit"
        onClick={props.openFormCB}
      >
        Open Form
      </button>
    </>
  );
}
