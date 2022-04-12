import { Link } from 'raviger';
import React, { useEffect, useReducer, useState } from 'react';
import PreviewInput from './PreviewInput';
import { Form } from '../types/formTypes';
import PreviewDropdown from './PreviewDropdown';
import { Answer, FormField_api, Submission } from '../types/common';
import { getFormDetails, listFormFields, submitForm } from '../utils/apiUtils';

type OnChangeFieldAction = {
  // when the value of the field is changed this action is invoked
  type: 'on_change_field';
  value: string;
  fieldID: number;
};

type SetFieldsAction = {
  type: 'set_fields';
  fields: FormField_api[];
};

// Action Reducer
type FormActions = OnChangeFieldAction | SetFieldsAction;
const stateReducer = (state: FormField_api[], action: FormActions) => {
  switch (action.type) {
    case 'on_change_field': {
      return state.map((s) => {
        if (s.id === action.fieldID) return { ...s, value: action.value };
        return s;
      });
    }

    case 'set_fields': {
      return action.fields;
    }
  }
};

type NextQues = {
  type: 'next_ques';
  formFields: FormField_api[];
};

type PrevQues = {
  type: 'prev_ques';
  formFields: FormField_api[];
};

type SetQues = {
  type: 'set_ques';
  number: number;
  formFields: FormField_api[];
};

type QuesNoActions = NextQues | PrevQues | SetQues;

const quesNoReducer = (quesNo: number, action: QuesNoActions) => {
  switch (action.type) {
    case 'next_ques': {
      return action.formFields[quesNo + 1] ? quesNo + 1 : quesNo;
    }
    case 'prev_ques': {
      return action.formFields[quesNo - 1] ? quesNo - 1 : quesNo;
    }
    case 'set_ques': {
      return action.formFields[action.number] ? action.number : quesNo;
    }
  }
};

const fetchFormFields = async (
  dispatchCB: React.Dispatch<FormActions>,
  formID: number
) => {
  try {
    const data: any = await listFormFields(formID);
    // if (data.is_public)
    dispatchCB({ type: 'set_fields', fields: data.results });
  } catch (error) {
    console.log(error);
  }
};

const initialSubmission = async (
  setSubmissionCB: React.Dispatch<React.SetStateAction<Submission>>,
  formId: number
) => {
  try {
    const data: any = await listFormFields(formId);
    let idArray: number[] = data.results.map((val: FormField_api) => {
      return val.id as number;
    });
    let answers: Answer[] = idArray.map((fid) => {
      return { form_field: fid, value: '' };
    });
    const formDetail: Form = await getFormDetails(formId);

    setSubmissionCB({ answers: answers, form: formDetail });
  } catch (error) {
    console.log(error);
  }
};

const submitAnswers = async (submission: Submission, formID: number) => {
  let submit = submission.answers.length > 0;
  submission.answers.forEach((ans) => {
    if (ans.value === '') {
      submit = false;
    }
  });
  try {
    if (submit) {
      // eslint-disable-next-line
      const data = await submitForm(formID, submission);
    }
  } catch (error) {
    console.log(error);
  }
};

export default function Preview(props: { formID: number }) {
  const [state, dispatch] = useReducer(stateReducer, []);
  const [quesNo, dispatchQuesNo] = useReducer(quesNoReducer, 0);
  const [submission, setSubmission] = useState<Submission>({
    answers: [],
    form: { title: '' },
  });
  // const [onSubmit, setOnSubmit] = useState<boolean>(false);

  useEffect(() => {
    fetchFormFields(dispatch, props.formID);
    initialSubmission(setSubmission, props.formID);
  }, [props.formID]);

  useEffect(() => {
    submitAnswers(submission, props.formID);
  }, [submission, props.formID]);

  let currentField = state[quesNo];

  // useEffect(() => {
  //   currentField = state[quesNo];
  // }, [quesNo]);

  if (state.length > 0) {
    return (
      <div className="p-2">
        <Link
          href="/"
          className="float-right text-2xl text-gray-600 hover:text-gray-700 smooth-effect"
        >
          <i className="fa-solid fa-circle-xmark"></i>
        </Link>
        <div className="text-3xl font-semibold mb-2">
          {submission.form.title}
        </div>
        <div className="text-gray-500 mb-1">
          Description: {submission.form.description}
        </div>
        <div className="text-gray-400 mb-4">
          Question {quesNo + 1} of {state.length}{' '}
        </div>

        {((currentField: FormField_api) => {
          if (currentField.kind === 'TEXT')
            return (
              <PreviewInput
                id={currentField.id as number}
                label={currentField.label}
                type={currentField.options ? currentField.options[0] : 'text'}
                value={currentField.value as string}
                onChangeCB={(val, id) =>
                  dispatch({
                    type: 'on_change_field',
                    value: val,
                    fieldID: id,
                  })
                }
              />
            );
          else if (currentField.kind === 'DROPDOWN')
            return (
              <PreviewDropdown
                field={currentField}
                onChangeFieldCB={(val, id) =>
                  dispatch({
                    type: 'on_change_field',
                    value: val,
                    fieldID: id,
                  })
                }
              />
            );
          // else if (currentField.kind === 'textArea')
          //   return (
          //     <div>
          //       <div className="text-2xl mb-1">
          //         <label>{currentField.label}</label>
          //       </div>
          //       <textarea
          //         className="w-full flex-1 border-2 border-gray-300 rounded-lg p-2 mt-1 mb-2 smooth-effect hover:border-blue-400 hover:ring-blue-400 focus:ring-blue-400 focus:border-blue-400"
          //         name={currentField.label}
          //         value={currentField.value}
          //         id={String(currentField.id)}
          //         onChange={(e) => {
          //           let value = e.target.value;
          //           dispatch({
          //             type: 'on_change_field',
          //             value: value,
          //             fieldID: currentField.id,
          //           });
          //         }}
          //       ></textarea>
          //     </div>
          //   );
          else if (currentField.kind === 'RADIO')
            return (
              <div>
                <div className="text-2xl mb-4">
                  <label>{currentField.label}</label>
                </div>
                <div className="flex gap-5 flex-wrap">
                  {currentField.options?.map((opt, index) => (
                    <div key={index}>
                      <input
                        type="radio"
                        id={`${opt}${index}`}
                        name={currentField.label}
                        className="flex-1 border-2 border-gray-300 rounded-full p-2 mt-1 mb-2 smooth-effect hover:border-blue-400 hover:ring-blue-400 focus:ring-blue-400 focus:border-blue-400"
                        value={opt}
                        checked={currentField.value === opt}
                        onChange={(e) => {
                          let value = e.target.value;
                          dispatch({
                            type: 'on_change_field',
                            value: value,
                            fieldID: currentField.id as number,
                          });
                        }}
                      />
                      <label className="ml-2" htmlFor={`${opt}${index}`}>
                        {opt}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            );
          else if (currentField.kind === 'GENERIC')
            return (
              <div>
                <div className="text-2xl mb-2">
                  <label>{currentField.label}</label>
                </div>
                <button
                  data-bs-toggle="collapse" // {`collapse`}
                  data-bs-target={`#collapse${currentField.id}`}
                  aria-expanded="false"
                  aria-controls={`collapse${currentField.id}`}
                  className="w-full flex-1 border-2 border-gray-300 rounded-lg p-2 mb-2 smooth-effect hover:border-blue-400 hover:ring-blue-400 focus:ring-blue-400 focus:border-blue-400"
                >
                  <div className="float-left pl-2" id="Multi">
                    {currentField.value === ''
                      ? '--- Select options ---'
                      : currentField.value}
                  </div>
                  <div className="float-right text-gray-500 pr-2">
                    <i className="fa-solid fa-angle-down"></i>
                  </div>
                </button>
                <div
                  className="flex gap-5 flex-col collapse bg-gray-100 rounded-lg p-5"
                  id={`collapse${currentField.id}`}
                >
                  {currentField.options &&
                    currentField.options.length > 0 &&
                    currentField.options.map((opt, index) => (
                      <div key={index}>
                        <input
                          type="checkbox"
                          id={`${opt}${index}`}
                          name={currentField.label}
                          value={opt}
                          checked={currentField.value
                            ?.split(', ')
                            .includes(opt)}
                          className="flex-1 border-2 border-gray-300 rounded-lg p-2 mt-1 mb-2 smooth-effect hover:border-blue-400 hover:ring-blue-400 focus:ring-blue-400 focus:border-blue-400"
                          onChange={(e) => {
                            let value = e.target.value;
                            let elem = document.getElementById('Multi');
                            if (elem) {
                              let valArray = elem.innerHTML.split(', ');

                              if (valArray.includes(''))
                                valArray.splice(valArray.indexOf(''), 1);

                              if (valArray.includes('--- Select options ---'))
                                valArray.splice(
                                  valArray.indexOf('--- Select options ---'),
                                  1
                                );
                              if (valArray.includes(value))
                                valArray.splice(valArray.indexOf(value), 1);
                              else valArray.push(value);
                              elem.innerHTML = valArray.join(', ');
                              dispatch({
                                type: 'on_change_field',
                                value: elem.innerHTML,
                                fieldID: currentField.id as number,
                              });
                            }
                          }}
                        />
                        <label className="ml-2" htmlFor={`${opt}${index}`}>
                          {opt}
                        </label>
                      </div>
                    ))}
                </div>
              </div>
            );
        })(currentField)}

        <div className="mt-3">
          {state[quesNo - 1] && (
            <button
              onClick={(_) =>
                dispatchQuesNo({
                  type: 'prev_ques',
                  formFields: state,
                })
              }
              className="mr-3 shadow-lg w-10 bg-blue-500 font-medium font-worksans rounded-full px-2 py-2 my-2 text-white hover:bg-blue-700 smooth-effect"
            >
              <i className="fas fa-arrow-left"></i>
            </button>
          )}

          {state[quesNo + 1] && (
            <button
              onClick={(_) =>
                dispatchQuesNo({
                  type: 'next_ques',
                  formFields: state,
                })
              }
              className="mr-3 shadow-lg w-10 bg-blue-500 font-medium font-worksans rounded-full px-2 py-2 my-2 text-white hover:bg-blue-700 smooth-effect"
            >
              <i className="fas fa-arrow-right"></i>
            </button>
          )}

          {!state[quesNo + 1] && (
            <button
              onClick={(_) => {
                let alertText = '';
                let FormAnswers: Answer[] = [];
                for (let i = 0; i < state.length; i++) {
                  if (state[i].value !== '') {
                    FormAnswers.push({
                      form_field: state[i].id as number,
                      value: state[i].value as string,
                    });
                    alertText =
                      alertText +
                      `${i + 1}. ${state[i].label}\n` +
                      `Ans: ${state[i].value}\n\n`;
                  } else {
                    dispatchQuesNo({
                      type: 'set_ques',
                      number: i,
                      formFields: state,
                    });
                    alert('All the fields must be filled!');
                    return;
                  }
                }
                setSubmission((sub) => {
                  return { ...sub, answers: FormAnswers };
                });
                alert(alertText + 'Thanks for responding!');
              }}
              className="float-right w-28 shadow-md bg-blue-500 font-medium font-worksans rounded-lg px-2 py-2 my-2 text-white hover:bg-blue-700 smooth-effect"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center gap-5 p-5">
        <h1>This form doesn't have any fields!</h1>
        <Link
          href="/"
          className="m-0 text-2xl text-gray-600 hover:text-gray-700 smooth-effect"
        >
          <i className="fa-solid fa-circle-xmark"></i>
        </Link>
      </div>
    );
  }
}
