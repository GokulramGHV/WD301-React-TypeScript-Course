import { Link } from 'raviger';
import React, { useEffect, useState } from 'react';
import { Submission } from '../types/common';
import { getFormResponses } from '../utils/apiUtils';

const fetchResponses = async (
  setResponsesCB: React.Dispatch<React.SetStateAction<Submission[]>>,
  formID: number
) => {
  try {
    const data = await getFormResponses(formID);
    setResponsesCB(data.results as Submission[]);
  } catch (error) {
    console.log(error);
  }
};

export default function FormResponses(props: { formID: number }) {
  const [responses, setResponses] = useState<Submission[]>([]);
  useEffect(() => {
    fetchResponses(setResponses, props.formID);
  }, [props.formID]);
  return (
    <>
      <h1 className="text-2xl font-semibold text-center">
        {responses.length > 0 ? responses[0].form.title : ''} Responses
      </h1>
      {responses.map((response, index) => {
        return (
          <div
            key={index}
            className="py-2 border-2 border-gray-200 pr-4 rounded-lg bg-white shadow-md mt-4 mb-3"
          >
            <div className="flex">
              <div className="flex justify-center items-center pl-3 pr-1 pb-1">
                <div className="text-4xl">📃</div>
              </div>
              <div className="ml-3 text-lg items-center flex-1 justify-center">
                <div>Response {response.id}</div>
                <div className="text-base text-gray-600">
                  <span className="font-semibold">Date:</span>{' '}
                  {response.created_date?.slice(0, 10)}{' '}
                  <span className="font-semibold">Time:</span>{' '}
                  {response.created_date?.slice(11, 19)}
                </div>
              </div>
              <Link
                // onClick={() => props.openFormsCB(props.id)}
                href={`/forms/${props.formID}/submissions/${response.id}`}
                className=" ml-3 w-10 bg-indigo-500 font-medium font-worksans rounded-lg text-center py-2 my-2 text-white hover:bg-indigo-700 smooth-effect"
              >
                <i className="fa-solid fa-eye"></i>
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
}
