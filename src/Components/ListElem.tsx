import { Link } from 'raviger';
import React from 'react';

export default function ListElem(props: {
  id: number;
  formName: string;
  // openFormsCB: (id: number) => void;
  removeFormsCB: (id: number) => void;
}) {
  return (
    <div className='py-2 border-2 border-gray-200 pr-10 rounded-lg bg-white shadow-md mb-3'>
      <div className="flex">
        <div className="text-xl flex items-center flex-1 justify-center">
          {' '}
          <div>{props.formName}</div>{' '}
        </div>
        <Link
          // onClick={() => props.openFormsCB(props.id)}
          href={`forms/${props.id}`}
          className=" ml-3 w-24 bg-emerald-500 font-medium font-worksans rounded-lg text-center py-2 my-2 text-white hover:bg-emerald-700 smooth-effect"
        >
          Edit
        </Link>
        <button
          onClick={() => props.removeFormsCB(props.id)}
          className="ml-3 w-24 bg-red-500 font-medium font-worksans rounded-lg px-2 py-2 my-2 text-white hover:bg-red-700 smooth-effect"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
