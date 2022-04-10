import { Link } from 'raviger';
import React, { useEffect, useState } from 'react';
import { FormField_api, Submission } from '../types/common';
import { getFormResponse, listFormFields } from '../utils/apiUtils';

const getResponse = async (
  setResponseCB: React.Dispatch<React.SetStateAction<Submission>>,
  formID: number,
  responseID: number
) => {
  try {
    const data = await getFormResponse(formID, responseID);
    setResponseCB(data);
  } catch (error) {
    console.log(error);
  }
};

const fetchFormFields = async (
  setFieldsCB: React.Dispatch<React.SetStateAction<FormField_api[]>>,
  formID: number
) => {
  try {
    const data = await listFormFields(formID);
    setFieldsCB(data.results);
  } catch (error) {
    console.log(error);
  }
};

const getFieldLabel = (fields: FormField_api[], fieldID: number) => {
  for (let i = 0; i<fields.length; i++) {
    if (fieldID === fields[i].id) {
      return fields[i].label
    }
  }
  return fieldID
};

export default function ResponseView(props: {
  formID: number;
  responseID: number;
}) {
  const [response, setResponse] = useState<Submission>({
    id: 0,
    answers: [],
    form: { title: '' },
  });

  const [fields, setFields] = useState<FormField_api[]>([]);

  useEffect(() => {
    getResponse(setResponse, props.formID, props.responseID);
    fetchFormFields(setFields, props.formID);
  }, []);

  return (
    <>
      <h1 className="text-2xl font-semibold text-center mb-5">
        Response {props.responseID}
      </h1>
      <div>
        {response.answers.map((ans, index) => {
          return (
            <div className="mb-4" key={index}>
              <div className="text-xl font-semibold">
                {getFieldLabel(fields, ans.form_field)}
              </div>
              <div className="text-lg mt-2">{ans.value}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
