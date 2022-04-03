import { Link } from 'raviger';
import React, { useState } from 'react';
import { getLocalForms } from './Form';
import PreviewInput from './PreviewInput';
import { formResponse, fieldResponse, formData } from '../types/formTypes';
const getLocalResponses: () => formData[] = () => {
    const savedFormsJSON = localStorage.getItem('savedFormResponses');
    return savedFormsJSON ? JSON.parse(savedFormsJSON) : [];
};

const initialState: (id: number) => formData = (id: number) => {
    const localForms = getLocalForms();
    for (let i = 0; i < localForms.length; i++) {
        if (localForms[i].id === id) return localForms[i];
    }
    const newForm = {
        id: Number(new Date()),
        title: 'Untitled Form',
        formFields: [],
    };
    return newForm;
};

const saveLocalResponses = (localForm: formData[]) => {
    localStorage.setItem('savedFormResponses', JSON.stringify(localForm));
};

const saveFormResponse = (currentState: formData) => {
    const localResponses = getLocalResponses();
    const Response = {
        id: Number(new Date()),
        title: currentState.title,
        formFields: currentState.formFields,
    };
    saveLocalResponses([...localResponses, Response]);
};

// interface fieldResponse {
//     id: number;
//     question: string;
//     answer: string;
// }

// interface formResponse {
//     id: number;
//     formName: string;
//     responses: fieldResponse[];
// }

export default function Preview(props: { formID: number }) {
    const [state, setState] = useState(() => initialState(props.formID));
    const [quesNo, setQuesNo] = useState(0);
    const [answers, setAnswers] = useState<formResponse>({
        id: Number(new Date()),
        formName: state.title,
        responses: [],
    });

    const nextQues = () => {
        setQuesNo((quesNo) =>
            state.formFields[quesNo + 1] ? quesNo + 1 : quesNo
        );
    };
    const prevQues = () => {
        setQuesNo((quesNo) =>
            state.formFields[quesNo - 1] ? quesNo - 1 : quesNo
        );
    };

    const onChangeField = (val: string, id: number) => {
        setState((state) => {
            return {
                ...state,
                formFields: state.formFields.map((s) => {
                    if (s.id === id) return { ...s, value: val };
                    return s;
                }),
            };
        });
    };

    let currentField = state.formFields[quesNo];

    if (state.formFields.length > 0) {
        return (
            <div className="p-2">
                <Link
                    href="/"
                    className="float-right text-2xl text-gray-600 hover:text-gray-700 smooth-effect"
                >
                    <i className="fa-solid fa-circle-xmark"></i>
                </Link>
                <div className="text-3xl font-semibold mb-2">{state.title}</div>
                <div className="text-gray-400 mb-4">
                    Question {quesNo + 1} of {state.formFields.length}{' '}
                </div>

                {
                    <PreviewInput
                        id={currentField.id}
                        label={currentField.label}
                        type={currentField.type}
                        value={currentField.value}
                        onChangeCB={onChangeField}
                    />
                }

                <div className="mt-3">
                    {state.formFields[quesNo - 1] && (
                        <button
                            onClick={prevQues}
                            className="mr-3 shadow-lg w-10 bg-blue-500 font-medium font-worksans rounded-full px-2 py-2 my-2 text-white hover:bg-blue-700 smooth-effect"
                        >
                            <i className="fas fa-arrow-left"></i>
                        </button>
                    )}

                    {state.formFields[quesNo + 1] && (
                        <button
                            onClick={nextQues}
                            className="mr-3 shadow-lg w-10 bg-blue-500 font-medium font-worksans rounded-full px-2 py-2 my-2 text-white hover:bg-blue-700 smooth-effect"
                        >
                            <i className="fas fa-arrow-right"></i>
                        </button>
                    )}

                    {!state.formFields[quesNo + 1] && (
                        <button
                            onClick={(_) => {
                                let alertText = '';
                                let FormRespones: fieldResponse[] = [];
                                state.formFields.forEach((field, i) => {
                                    FormRespones.push({
                                        id: field.id,
                                        question: field.label,
                                        answer: field.value,
                                    });

                                    alertText =
                                        alertText +
                                        `${i + 1}. ${field.label}\n` +
                                        `Ans: ${field.value}\n\n`;
                                });

                                setAnswers((ans) => {
                                    return { ...ans, responses: FormRespones };
                                });

                                console.log(answers);
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
