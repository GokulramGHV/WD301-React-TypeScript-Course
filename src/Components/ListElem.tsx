import { Link } from 'raviger';
import React from 'react';

export default function ListElem(props: {
  id: number;
  formName: string;
  // openFormsCB: (id: number) => void;
  removeFormsCB: (id: number) => void;
}) {
  return (
    <div className="py-2 border-2 border-gray-200 pr-4 rounded-lg bg-white shadow-md mb-3" tabIndex={0} aria-label={props.formName}>
      <div className="flex">
        <div className="flex justify-center items-center pl-3 pr-1 pb-1">
          <div className="text-4xl">📝</div>
        </div>
        <div className="text-xl flex items-center flex-1 justify-center">
          <div>{props.formName}</div>
        </div>
        <Link
          title="Preview Form"
          aria-label="Preview Form"
          href={`preview/${props.id}`}
          className=" ml-3 w-10 bg-indigo-500 font-medium font-worksans rounded-lg text-center py-2 my-2 text-white hover:bg-indigo-700 smooth-effect"
        >
          <i className="fa-solid fa-eye"></i>
        </Link>
        <Link
          title="Edit Form"
          aria-label="Edit Form"
          href={`forms/${props.id}`}
          className=" ml-3 w-10 bg-emerald-500 font-medium font-worksans rounded-lg text-center py-2 my-2 text-white hover:bg-emerald-700 smooth-effect"
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </Link>
        <Link
          title="View Form Responses"
          aria-label="View Form Responses"
          href={`forms/${props.id}/submissions/`}
          className=" ml-3 w-10 bg-yellow-500 font-medium font-worksans rounded-lg text-center py-2 my-2 text-white hover:bg-yellow-600 smooth-effect"
        >
          <i className="fab fa-wpforms"></i>
        </Link>
        <button
          onClick={() => props.removeFormsCB(props.id)}
          aria-label="Remove Form"
          title="Remove Form"
          className="ml-3 w-10 bg-red-500 font-medium font-worksans rounded-lg px-2 py-2 my-2 text-white hover:bg-red-700 smooth-effect"
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  );
}
