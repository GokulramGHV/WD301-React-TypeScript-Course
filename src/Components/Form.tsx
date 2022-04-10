// import { totalmem } from 'os';
import { Link, navigate } from 'raviger';
import React, { useState, useEffect, useRef, useReducer } from 'react';

import { FormFieldTypes_api, FormField_api } from '../types/common';
import UserInput from './UserInput';
import { InputOptionsEditor } from './OptionsEditor';
// import TextAreaInput from './TextAreaInput';
import {
  addNewFormField,
  getFormDetails,
  listFormFields,
  removeFormField,
  updateForm,
  updateFormField,
} from '../utils/apiUtils';

type AddAction = {
  type: 'add_field';
  kind: FormFieldTypes_api;
  label: string;
  callback: () => void;
};

type RemoveAction = {
  type: 'remove_field';
  id: number;
};

type UpdateTitleAction = {
  type: 'update_title';
  title: string;
};

// type ChangeOptionAction = {
//   type: 'change_option';
//   options: string[];
//   fieldID: number;
// };

type ResetFieldsAction = {
  type: 'reset_fields';
};

type OnChangeFieldAction = {
  type: 'on_change_field';
  value: string;
  fieldID: number;
};

type ChangeOptionsAction = {
  type: 'on_change_options';
  options: string[];
  fieldID: number;
};

type SetFieldsAction = {
  type: 'set_fields';
  fields: FormField_api[];
};

type FormActions =
  | AddAction
  | RemoveAction
  // | UpdateTitleAction
  // | ChangeOptionAction
  // | ResetFieldsAction
  | OnChangeFieldAction
  | SetFieldsAction
  | ChangeOptionsAction;
// | ChangeTextFieldTypeAction;

// Action Reducer
const reducer = (state: FormField_api[], action: FormActions) => {
  switch (action.type) {
    case 'add_field': {
      if (action.label !== '') {
        action.callback();
        if (action.kind === 'TEXT') {
          return [
            ...state,
            {
              id: Number(new Date()),
              kind: action.kind,
              label: action.label,
              options: ['text'],
              value: '',
            },
          ];
        } else if (
          action.kind === 'DROPDOWN' ||
          action.kind === 'RADIO' ||
          action.kind === 'GENERIC'
        ) {
          return [
            ...state,
            {
              id: Number(new Date()),
              kind: action.kind,
              label: action.label,
              options: [],
              value: '',
            },
          ];
        } else {
          return state;
        }
      } else {
        return state;
      }
    }

    case 'remove_field': {
      return state.filter((f) => f.id !== action.id);
    }

    case 'on_change_field': {
      return state.map((f) => {
        if (f.id === action.fieldID) return { ...f, label: action.value };
        else return f;
      });
    }

    case 'on_change_options': {
      return state.map((f) => {
        if (f.id === action.fieldID) return { ...f, options: action.options };
        else return f;
      });
    }

    case 'set_fields': {
      return action.fields;
    }
  }
};

type ChangeText = {
  type: 'change_text';
  value: string;
};

type ClearText = {
  type: 'clear_text';
};

type newFieldActions = ChangeText | ClearText;
const newFieldReducer = (state: string, action: newFieldActions) => {
  switch (action.type) {
    case 'change_text': {
      return action.value;
    }
    case 'clear_text':
      return '';
  }
};

//API
const fetchFormFields = async (
  dispatchCB: React.Dispatch<FormActions>,
  formID: number
) => {
  try {
    const data: any = await listFormFields(formID); // maybe here
    dispatchCB({ type: 'set_fields', fields: data.results });
  } catch (error) {
    console.log(error);
  }
};

// const addFormField = async (
//   formID: number,
//   fieldName: string,
//   fieldType: FormFieldTypes_api = 'TEXT'
// ) => {
//   try {
//     const data = await addNewFormField(formID, {
//       kind: fieldType,
//       label: fieldName,
//       value: '',
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// const removeField = async (
//   setNewStateCB: any,
//   formID: number,
//   fieldID: number
// ) => {
//   try {
//     setNewStateCB((state: FormField_api[]) =>
//       state.filter((f) => f.id !== fieldID)
//     );
//     const data = await removeFormField(formID, fieldID);
//   } catch (error) {
//     console.log(error);
//   }
// };

const onChangeFormTitle = async (
  setFormTitleCB: any,
  formID: number,
  title: string
) => {
  try {
    setFormTitleCB(title);
    const formDetail = await getFormDetails(formID);
    const data = await updateForm(formID, { ...formDetail, title: title });
  } catch (error) {
    console.log(error);
  }
};

function arrayCompare(_arr1: string[], _arr2: string[]) {
  if (
    !Array.isArray(_arr1) ||
    !Array.isArray(_arr2) ||
    _arr1.length !== _arr2.length
  ) {
    return false;
  }
  // .concat() to not mutate arguments
  const arr1 = _arr1.concat().sort();
  const arr2 = _arr2.concat().sort();

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

const SaveFormData = async (
  dispatchCB: React.Dispatch<FormActions>,
  state: FormField_api[],
  formTitle: string,
  formID: number
) => {
  const data = await listFormFields(formID);
  const initForm = data.results;
  let idArray: number[] = initForm.map((val: FormField_api) => {
    return val.id as number;
  });

  const formDetail = await getFormDetails(formID);
  if (formDetail.title !== formTitle) {
    try {
      const data = await updateForm(formID, {
        ...formDetail,
        title: formTitle,
      });
    } catch (error) {
      console.log(error);
    }
  }

  // console.log(initForm);
  // console.log(idArray);
  let stateIdArray: number[] = state.map((val: FormField_api) => {
    return val.id as number;
  });

  for (let j = 0; j < initForm.length; j++) {
    if (!stateIdArray.includes(initForm[j].id)) {
      // Remove Field Request
      try {
        const data = await removeFormField(formID, initForm[j].id);
        console.log('Removed Field %d', initForm[j].id);
      } catch (error) {
        console.log(error);
      }
      // Remove Field Request End
    }
  }

  for (let i = 0; i < state.length; i++) {
    if (!idArray.includes(state[i].id as number)) {
      // Add Field Request
      try {
        const data = await addNewFormField(formID, {
          kind: state[i].kind,
          label: state[i].label,
          options: state[i].options,
          value: '',
        });
        console.log('Added to server!');
      } catch (error) {
        console.log(error);
      }
      // Add Field Request End
    } else {
      let fieldToCheck = initForm.filter(
        (f: FormField_api) => state[i].id === f.id
      );
      console.log('Field to Check: ', fieldToCheck);
      if (fieldToCheck[0].label !== state[i].label) {
        // Change Field Label Request
        try {
          const data = await updateFormField(formID, state[i].id as number, {
            ...state[i],
            label: state[i].label,
          });
          console.log('field label updated!');
        } catch (error) {
          console.log(error);
        }
        // Change Field Label Request End
      }

      // arrayCompare(fieldToCheck[0].options, state[i].options as string[]);

      if (
        !arrayCompare(fieldToCheck[0].options, state[i].options as string[])
      ) {
        // Change Field Options Request
        try {
          const data = await updateFormField(formID, state[i].id as number, {
            ...state[i],
            options: state[i].options,
          });
          console.log('field options updated!');
        } catch (error) {
          console.log(error);
        }
        // Change Field Options Request End
      }
    }
  }
  fetchFormFields(dispatchCB, formID); // You might not need this line of code
  alert('Form Saved!');
};

const getFormTitle = async (
  setFormTitleCB: React.Dispatch<React.SetStateAction<string>>,
  formID: number
) => {
  try {
    const data: any = await getFormDetails(formID); // maybe here
    setFormTitleCB(data.title);
  } catch (error) {
    console.log(error);
  }
};

export function Form(props: { formID: number }) {
  const [formTitle, setFormTitle] = useState('');
  const [newField, setNewField] = useReducer(newFieldReducer, '');
  const [newFieldType, setnewFieldType] = useState<FormFieldTypes_api>('TEXT');
  const [state, dispatch] = useReducer(reducer, []);
  const titleRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   state.id !== props.formID && navigate(`/forms/${state.id}`);
  // }, [state.id, props.formID]);

  useEffect(() => {
    fetchFormFields(dispatch, props.formID);
    getFormTitle(setFormTitle, props.formID);
  }, []);

  useEffect(() => {
    document.title = 'Form Editor';
    return () => {
      document.title = 'React App';
    };
  }, []);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  // useEffect(() => {
  //   let timeout = setTimeout(() => {
  //     saveFormData(state);
  //   }, 1000);
  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, [state]);

  // const data_of_form: any = await
  return (
    <>
      <div className="grid grid-cols-1 divide-y-2">
        <input
          onChange={(e) => {
            setFormTitle(e.target.value);
          }}
          value={formTitle}
          placeholder="Enter Form Title"
          type="text"
          className=" flex-1 border-2 border-gray-300 rounded-lg p-2 mt-1 mb-3 smooth-effect hover:border-blue-400 hover:ring-blue-400 focus:ring-blue-400 focus:border-blue-400"
          ref={titleRef}
        />

        <div className="mb-2">
          <div className="mt-3"></div>
          {state.map((field) => {
            if (field.kind === 'TEXT') {
              return (
                <UserInput
                  id={field.id as number}
                  key={field.id}
                  label={field.label}
                  type={field.options ? field.options[0] : 'text'}
                  value={field.label} // changed from field.value to field.label
                  removeFieldCB={(_) => {
                    // removeField(
                    //   setNewState,
                    //   props.formID,
                    //   field.id as number
                    // );
                    // setNewState((state: FormField_api[]) =>
                    //   state.filter((f) => f.id !== field.id)
                    // );
                    dispatch({
                      type: 'remove_field',
                      id: field.id as number,
                    });
                  }}
                  onChangeCB={(val, id) => {
                    dispatch({
                      type: 'on_change_field',
                      value: val,
                      fieldID: id,
                    });
                  }}
                  changeTypeCB={(fieldtype, id) => {
                    dispatch({
                      type: 'on_change_options',
                      options: [fieldtype],
                      fieldID: id,
                    });
                  }}
                />
              );
            } else if (
              field.kind === 'DROPDOWN' ||
              field.kind === 'RADIO' ||
              field.kind === 'GENERIC'
            ) {
              return (
                <InputOptionsEditor
                  key={field.id}
                  field={field}
                  onChangeFieldCB={
                    (val, id) => {
                      dispatch({
                        type: 'on_change_field',
                        value: val,
                        fieldID: id,
                      });
                    }
                    // console.log(`changed: ${id}`)
                  }
                  changeOptionsCB={
                    (opts, id) => {
                      dispatch({
                        type: 'on_change_options',
                        options: opts,
                        fieldID: id,
                      });
                    }

                    // console.log(`changed: ${id}`)
                  }
                  removeFieldCB={
                    (_) => {
                      dispatch({
                        type: 'remove_field',
                        id: field.id as number,
                      });
                    }
                    // console.log(`removed:`)
                  }
                />
              );
            }

            // case 'textArea':
            //   return (
            //     <TextAreaInput
            //       id={field.id}
            //       key={field.id}
            //       label={field.label}
            //       type={field.type}
            //       value={field.label}
            //       removeFieldCB={(_) =>
            //         dispatch({
            //           type: 'remove_field',
            //           id: field.id,
            //         })
            //       }
            //       onChangeCB={(val, id) =>
            //         dispatch({
            //           type: 'on_change_field',
            //           value: val,
            //           fieldID: id,
            //         })
            //       }
            //     />
            //   );
          })}
        </div>

        <div>
          <div className="flex w-full mt-2">
            <input
              onChange={(e) => {
                setNewField({ type: 'change_text', value: e.target.value });
              }}
              value={newField}
              placeholder="Enter field name"
              type="text"
              className=" flex-1 border-2 border-gray-300 rounded-lg p-2 mt-1 mb-2 smooth-effect hover:border-blue-400 hover:ring-blue-400 focus:ring-blue-400 focus:border-blue-400"
            />

            <select
              name="types"
              id="types"
              onChange={(e) => {
                let fieldType = e.target.value;
                setnewFieldType(fieldType as FormFieldTypes_api);
              }}
              className=" border-2 border-gray-300 rounded-lg p-2 mt-1 mb-2 ml-3 w-28 smooth-effect hover:border-blue-400 hover:ring-blue-400 focus:ring-blue-400 focus:border-blue-400"
            >
              <option value="TEXT">TextField</option>
              <option value="DROPDOWN">Dropdown</option>
              {/* <option value="textArea">TextArea</option> */}
              <option value="RADIO">RadioInput</option>
              <option value="GENERIC">MultipeSelect</option>
            </select>

            <button
              className="ml-3 w-28 bg-blue-500 font-medium font-worksans rounded-lg px-4 py-2 my-2 text-white hover:bg-blue-700 smooth-effect"
              onClick={(_) => {
                dispatch({
                  type: 'add_field',
                  label: newField,
                  kind: newFieldType,
                  callback: () => setNewField({ type: 'clear_text' }),
                });
              }}
            >
              Add Field
            </button>
          </div>

          <button
            className="mr-3 w-28 bg-blue-500 font-medium font-worksans rounded-lg px-4 py-2 my-2 text-white hover:bg-blue-700 smooth-effect"
            onClick={(_) => {
              fetchFormFields(dispatch, props.formID);
            }}
          >
            Refresh
          </button>

          <button
            onClick={(_) =>
              SaveFormData(dispatch, state, formTitle, props.formID)
            }
            className="w-28 bg-blue-500 font-medium font-worksans rounded-lg px-4 py-2 my-2 text-white hover:bg-blue-700 smooth-effect"
            type="submit"
          >
            Save
          </button>
          <Link
            href="/"
            className="ml-3 w-32 bg-blue-500 font-medium font-worksans rounded-lg px-4 py-2.5 my-2 text-white hover:bg-blue-700 smooth-effect"
          >
            Close Form
          </Link>
        </div>
      </div>
    </>
  );
}
