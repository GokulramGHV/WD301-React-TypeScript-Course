// import { totalmem } from 'os';
import { Link, navigate } from 'raviger';
import React, { useState, useEffect, useRef, useReducer } from 'react';
import Header from '../Header';
import UserInput from './UserInput';
import {
  dropDownField,
  formData,
  formField,
  multipleSelectField,
  radioInputField,
  textAreaField,
  textField,
  textFieldTypes,
} from '../types/formTypes';
import { InputOptionsEditor } from './OptionsEditor';
import TextAreaInput from './TextAreaInput';

export const initialFormFields: formField[] = [
  { id: 1, kind: 'text', label: 'First Name', type: 'text', value: '' },
  { id: 2, kind: 'text', label: 'Last Name', type: 'text', value: '' },
  { id: 3, kind: 'text', label: 'Email', type: 'email', value: '' },
  { id: 4, kind: 'text', label: 'Date of Birth', type: 'date', value: '' },
  { id: 5, kind: 'text', label: 'Phone Number', type: 'number', value: '' },
];

export const getLocalForms: () => formData[] = () => {
  const savedFormsJSON = localStorage.getItem('savedForms');
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
    formFields: initialFormFields,
  };
  saveLocalForms([...localForms, newForm]);
  return newForm;
};

export const saveLocalForms = (localForm: formData[]) => {
  localStorage.setItem('savedForms', JSON.stringify(localForm));
};

const saveFormData = (currentState: formData) => {
  const localForms = getLocalForms();
  const updatedLocalForms = localForms.map((form) =>
    form.id === currentState.id ? currentState : form
  );
  saveLocalForms(updatedLocalForms);
};

type AddAction = {
  type: 'add_field';
  kind: string;
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

type ChangeOptionAction = {
  type: 'change_option';
  options: string[];
  fieldID: number;
};

type ResetFieldsAction = {
  type: 'reset_fields';
};

type OnChangeFieldAction = {
  type: 'on_change_field';
  value: string;
  fieldID: number;
};

type ChangeTextFieldTypeAction = {
  type: 'change_text_field_type';
  fieldType: string;
  fieldID: number;
};

type FormActions =
  | AddAction
  | RemoveAction
  | UpdateTitleAction
  | ChangeOptionAction
  | ResetFieldsAction
  | OnChangeFieldAction
  | ChangeTextFieldTypeAction;

// Action Reducer
const reducer = (state: formData, action: FormActions) => {
  switch (action.type) {
    case 'add_field': {
      if (action.label !== '') {
        action.callback();
        if (action.kind === 'text') {
          return {
            ...state,
            formFields: [
              ...state.formFields,
              {
                id: Number(new Date()),
                kind: action.kind,
                label: action.label,
                type: 'text',
                value: '',
              } as textField,
            ],
          };
        } else if (action.kind === 'textArea') {
          return {
            ...state,
            formFields: [
              ...state.formFields,
              {
                id: Number(new Date()),
                kind: action.kind,
                label: action.label,
                type: 'text',
                value: '',
              } as textAreaField,
            ],
          };
        } else if (action.kind === 'dropdown') {
          return {
            ...state,
            formFields: [
              ...state.formFields,
              {
                id: Number(new Date()),
                kind: action.kind,
                label: action.label,
                options: [],
                type: 'text',
                value: '',
              } as dropDownField,
            ],
          };
        } else if (action.kind === 'radioInput') {
          return {
            ...state,
            formFields: [
              ...state.formFields,
              {
                id: Number(new Date()),
                kind: action.kind,
                label: action.label,
                options: [],
                type: 'text',
                value: '',
              } as radioInputField,
            ],
          };
        } else if (action.kind === 'multipleSelect') {
          return {
            ...state,
            formFields: [
              ...state.formFields,
              {
                id: Number(new Date()),
                kind: action.kind,
                label: action.label,
                options: [],
                type: 'text',
                value: '',
              } as multipleSelectField,
            ],
          };
        } else {
          return state;
        }
      } else {
        return state;
      }
    }

    case 'remove_field': {
      return {
        ...state,
        formFields: state.formFields.filter((field) => field.id !== action.id),
      };
    }

    case 'update_title': {
      return {
        ...state,
        title: action.title,
      };
    }

    case 'change_option': {
      return {
        ...state,
        formFields: state.formFields.map((s) => {
          if (
            s.kind === 'dropdown' ||
            s.kind === 'radioInput' ||
            s.kind === 'multipleSelect'
          ) {
            if (s.id === action.fieldID)
              return { ...s, options: [...action.options] };
          }
          // console.log(s);
          return s;
        }),
      };
    }

    case 'reset_fields': {
      return {
        ...state,
        formFields: state.formFields.map((s) => {
          return { ...s, label: '' };
        }),
      };
    }

    case 'on_change_field': {
      return {
        ...state,
        formFields: state.formFields.map((s) => {
          if (s.id === action.fieldID) return { ...s, label: action.value }; // changed from value to label
          return s;
        }),
      };
    }

    case 'change_text_field_type': {
      return {
        ...state,
        formFields: state.formFields.map((s) => {
          if (s.id === action.fieldID)
            return { ...s, kind: 'text', type: action.fieldType } as textField;
          return s;
        }),
      };
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

export function Form(props: { formID: number }) {
  const [newField, setNewField] = useReducer(newFieldReducer, '');
  const [newFieldType, setnewFieldType] = useState<textFieldTypes>('text');
  const [state, dispatch] = useReducer(reducer, null, () =>
    initialState(props.formID)
  );
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    state.id !== props.formID && navigate(`/forms/${state.id}`);
  }, [state.id, props.formID]);

  useEffect(() => {
    document.title = 'Form Editor';
    return () => {
      document.title = 'React App';
    };
  }, []);

  useEffect(()=>{
    titleRef.current?.focus();
  }, [])

  useEffect(() => {
    let timeout = setTimeout(() => {
      saveFormData(state);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [state]);

  return (
    <>
      <Header />
      <div className="grid grid-cols-1 divide-y-2">
        <input
          onChange={(e) => {
            dispatch({
              type: 'update_title',
              title: e.target.value,
              // return { ...state, title: e.target.value };
            });
          }}
          value={state.title}
          placeholder="Enter Form Title"
          type="text"
          className=" flex-1 border-2 border-gray-300 rounded-lg p-2 mt-1 mb-3 smooth-effect hover:border-blue-400 hover:ring-blue-400 focus:ring-blue-400 focus:border-blue-400"
          ref={titleRef}
        />

        <div className="mb-2">
          <div className="mt-3"></div>
          {state.formFields.map((field) => {
            switch (field.kind) {
              case 'text':
                return (
                  <UserInput
                    id={field.id}
                    key={field.id}
                    label={field.label}
                    type={field.type}
                    value={field.label} // changed from field.value to field.label
                    removeFieldCB={(_) =>
                      dispatch({
                        type: 'remove_field',
                        id: field.id,
                      })
                    }
                    onChangeCB={(val, id) =>
                      dispatch({
                        type: 'on_change_field',
                        value: val,
                        fieldID: id,
                      })
                    }
                    changeTypeCB={(fieldtype, id) =>
                      dispatch({
                        type: 'change_text_field_type',
                        fieldType: fieldtype,
                        fieldID: id,
                      })
                    }
                  />
                );

              case 'dropdown':
                return (
                  <InputOptionsEditor
                    key={field.id}
                    field={field}
                    onChangeFieldCB={(val, id) =>
                      dispatch({
                        type: 'on_change_field',
                        value: val,
                        fieldID: id,
                      })
                    }
                    changeOptionsCB={(opts, id) =>
                      dispatch({
                        type: 'change_option',
                        options: opts,
                        fieldID: id,
                      })
                    }
                    removeFieldCB={(_) =>
                      dispatch({
                        type: 'remove_field',
                        id: field.id,
                      })
                    }
                  />
                );
              case 'textArea':
                return (
                  <TextAreaInput
                    id={field.id}
                    key={field.id}
                    label={field.label}
                    type={field.type}
                    value={field.label}
                    removeFieldCB={(_) =>
                      dispatch({
                        type: 'remove_field',
                        id: field.id,
                      })
                    }
                    onChangeCB={(val, id) =>
                      dispatch({
                        type: 'on_change_field',
                        value: val,
                        fieldID: id,
                      })
                    }
                  />
                );

              case 'radioInput':
                return (
                  <InputOptionsEditor
                    key={field.id}
                    field={field}
                    onChangeFieldCB={(val, id) =>
                      dispatch({
                        type: 'on_change_field',
                        value: val,
                        fieldID: id,
                      })
                    }
                    changeOptionsCB={(opts, id) =>
                      dispatch({
                        type: 'change_option',
                        options: opts,
                        fieldID: id,
                      })
                    }
                    removeFieldCB={(_) =>
                      dispatch({
                        type: 'remove_field',
                        id: field.id,
                      })
                    }
                  />
                );

              case 'multipleSelect':
                return (
                  <InputOptionsEditor
                    key={field.id}
                    field={field}
                    onChangeFieldCB={(val, id) =>
                      dispatch({
                        type: 'on_change_field',
                        value: val,
                        fieldID: id,
                      })
                    }
                    changeOptionsCB={(opts, id) =>
                      dispatch({
                        type: 'change_option',
                        options: opts,
                        fieldID: id,
                      })
                    }
                    removeFieldCB={(_) =>
                      dispatch({
                        type: 'remove_field',
                        id: field.id,
                      })
                    }
                  />
                );
            }
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
                setnewFieldType(fieldType as textFieldTypes);
              }}
              className=" border-2 border-gray-300 rounded-lg p-2 mt-1 mb-2 ml-3 w-28 smooth-effect hover:border-blue-400 hover:ring-blue-400 focus:ring-blue-400 focus:border-blue-400"
            >
              <option value="text">TextField</option>
              <option value="dropdown">Dropdown</option>
              <option value="textArea">TextArea</option>
              <option value="radioInput">RadioInput</option>
              <option value="multipleSelect">MultipeSelect</option>
            </select>

            <button
              className="ml-3 w-28 bg-blue-500 font-medium font-worksans rounded-lg px-4 py-2 my-2 text-white hover:bg-blue-700 smooth-effect"
              onClick={(_) =>
                dispatch({
                  type: 'add_field',
                  label: newField,
                  kind: newFieldType,
                  callback: () => setNewField({ type: 'clear_text' }),
                })
              }
            >
              Add Field
            </button>
          </div>

          <button
            className="mr-3 w-28 bg-blue-500 font-medium font-worksans rounded-lg px-4 py-2 my-2 text-white hover:bg-blue-700 smooth-effect"
            onClick={(_) =>
              dispatch({
                type: 'reset_fields',
              })
            }
          >
            Reset
          </button>

          <button
            onClick={(_) => saveFormData(state)}
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
