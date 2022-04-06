// import { totalmem } from 'os';
import { Link, navigate } from 'raviger';
import React, { useState, useEffect, useRef } from 'react';
import Header from '../Header';
import UserInput from './UserInput';
import {
  formData,
  formField,
  textField,
  textFieldTypes,
} from '../types/formTypes';
import { InputOptionsEditor, OptionsEditor } from './OptionsEditor';
import TextAreaInput from './TextAreaInput';

// export interface formData {
//     id: number;
//     title: string;
//     formFields: formField[];
// }
// export interface formField {
//     id: number;
//     label: string;
//     type: string;
//     value: string;
// }

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

// export interface fieldType {
//     id: number;
//     name: string;
// }

// export const fieldTypes: fieldType[] = [
//     { id: 1, name: 'text' },
//     { id: 2, name: 'date' },
//     { id: 3, name: 'number' },
//     { id: 4, name: 'email' },
//     { id: 5, name: 'time' },
// ];

export function Form(props: { formID: number }) {
  const [newField, setNewField] = useState('');
  const [newFieldType, setnewFieldType] = useState<textFieldTypes>('text');
  const [state, setState] = useState(() => initialState(props.formID));
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

  // useEffect(()=>{
  //   titleRef.current?.focus();
  // }, [state])

  useEffect(() => {
    let timeout = setTimeout(() => {
      saveFormData(state);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [state]);

  const addField = () => {
    if (newField !== '') {
      if (newFieldType === 'text') {
        setState({
          ...state,
          formFields: [
            ...state.formFields,
            {
              id: Number(new Date()),
              label: newField,
              kind: 'text',
              type: 'text',
              value: '',
            },
          ],
        });
      } else if (newFieldType === 'dropdown') {
        setState({
          ...state,
          formFields: [
            ...state.formFields,
            {
              id: Number(new Date()),
              label: newField,
              kind: 'dropdown',
              options: [],
              type: 'text',
              value: '',
            },
          ],
        });
      } else if (newFieldType === 'textArea') {
        setState({
          ...state,
          formFields: [
            ...state.formFields,
            {
              id: Number(new Date()),
              label: newField,
              kind: 'textArea',
              type: 'text',
              value: '',
            },
          ],
        });
      } else if (newFieldType === 'radioInput') {
        setState({
          ...state,
          formFields: [
            ...state.formFields,
            {
              id: Number(new Date()),
              label: newField,
              kind: 'radioInput',
              options: [],
              type: 'text',
              value: '',
            },
          ],
        });
      } else if (newFieldType === 'multipleSelect') {
        setState({
          ...state,
          formFields: [
            ...state.formFields,
            {
              id: Number(new Date()),
              label: newField,
              kind: 'multipleSelect',
              options: [],
              type: 'text',
              value: '',
            },
          ],
        });
      }

      setNewField('');
    }
  };

  const removeField = (id: number) => {
    setState((state) => {
      return {
        ...state,
        formFields: state.formFields.filter((field) => field.id !== id),
      };
    });
  };

  const resetFields = () => {
    setState((state) => {
      return {
        ...state,
        formFields: state.formFields.map((s) => {
          return { ...s, label: '' };
        }),
      };
    });
  };

  const onChangeField = (val: string, id: number) => {
    setState((state) => {
      return {
        ...state,
        formFields: state.formFields.map((s) => {
          if (s.id === id) return { ...s, label: val }; // changed from value to label
          return s;
        }),
      };
    });
  };

  const changeFieldType = (val: string, id: number) => {
    setState((state) => {
      return {
        ...state,
        formFields: state.formFields.map((s) => {
          if (s.id === id)
            return { ...s, kind: 'text', type: val } as textField;
          return s;
        }),
      };
    });
  };

  const changeOptions = (opts: string[], fieldId: number) => {
    setState((state) => {
      return {
        ...state,
        formFields: state.formFields.map((s) => {
          if (
            s.kind === 'dropdown' ||
            s.kind === 'radioInput' ||
            s.kind === 'multipleSelect'
          ) {
            if (s.id === fieldId) return { ...s, options: [...opts] };
          }
          // console.log(s);
          return s;
        }),
      };
    });
  };

  return (
    <>
      <Header />
      <div className="grid grid-cols-1 divide-y-2">
        <input
          onChange={(e) => {
            setState((state) => {
              return { ...state, title: e.target.value };
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
                    removeFieldCB={removeField}
                    onChangeCB={onChangeField}
                    changeTypeCB={changeFieldType} // u need to change this
                  />
                );

              case 'dropdown':
                return (
                  <InputOptionsEditor
                    field={field}
                    onChangeFieldCB={onChangeField}
                    changeOptionsCB={changeOptions}
                    removeFieldCB={removeField}
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
                    removeFieldCB={removeField}
                    onChangeCB={onChangeField}
                  />
                );

              case 'radioInput':
                return (
                  <InputOptionsEditor
                    field={field}
                    onChangeFieldCB={onChangeField}
                    changeOptionsCB={changeOptions}
                    removeFieldCB={removeField}
                  />
                );

              case 'multipleSelect':
                return (
                  <InputOptionsEditor
                    field={field}
                    onChangeFieldCB={onChangeField}
                    changeOptionsCB={changeOptions}
                    removeFieldCB={removeField}
                  />
                );
            }
          })}
        </div>

        <div>
          <div className="flex w-full mt-2">
            <input
              onChange={(e) => {
                setNewField(e.target.value);
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
              onClick={addField}
            >
              Add Field
            </button>
          </div>

          <button
            className="mr-3 w-28 bg-blue-500 font-medium font-worksans rounded-lg px-4 py-2 my-2 text-white hover:bg-blue-700 smooth-effect"
            onClick={resetFields}
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
