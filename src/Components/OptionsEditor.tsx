import React, { useState, useEffect, useRef } from 'react';
import {
  dropDownField,
  multipleSelectField,
  radioInputField,
} from '../types/formTypes';

export function OptionsEditor(props: {
  fieldID: number;
  fieldLabel: string;
  fieldKind: string;
  fieldOptions: string[];
  changeOptionsCB: (options: string[], fieldId: number) => void;
}) {
  const propsVal = (() => props.fieldOptions)();
  let initialState: { opId: number; opName: string }[] = [];
  for (let i = 0; i < propsVal.length; i++) {
    initialState.push({ opId: i + 1, opName: propsVal[i] });
  }
  const [optionName, setOptionName] = useState('');
  const [optionsState, setOptionsState] = useState(() => initialState);

  const addField = () => {
    if (optionName !== '') {
      let temp: { opId: number; opName: string }[] = [];
      for (let i = 0; i < optionsState.length; i++) {
        temp.push({ opId: i + 1, opName: optionsState[i].opName });
      }
      temp.push({ opId: temp.length + 1, opName: optionName });
      console.log(temp);
      setOptionsState((state) => temp);
    }
    setOptionName('');
  };

  useEffect(() => {
    let timeout = setTimeout(() => {
      let temp: string[] = [];
      for (let i = 0; i < optionsState.length; i++) {
        temp.push(optionsState[i].opName);
      }
      props.changeOptionsCB(temp, props.fieldID);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [optionsState]);

  const removeField = (id: number) => {
    setOptionsState((state) => state.filter((field) => field.opId !== id));
  };

  const onChangeField = (val: string, id: number) => {
    setOptionsState((state) =>
      state.map((s) => {
        if (s.opId === id) return { ...s, opName: val };
        return s;
      })
    );
  };

  return (
    <>
      {/* <p>Question:</p>
      <p>{props.fieldLabel}</p> */}

      <div className="p-4 bg-gray-100 drop-shadow-md rounded-lg mt-1 mb-2">
        <h1 className="text-lg font-medium mb-3">
          {props.fieldKind.toLocaleLowerCase()} Editor
        </h1>

        {optionsState?.map((option) => {
          return (
            <div className="flex" key={option.opId}>
              <input
                type="text"
                value={option.opName}
                onChange={(e) => {
                  let value = e.target.value;
                  onChangeField(value, option.opId);
                }}
                className="flex-1 border-2 border-gray-300 rounded-lg p-2 mt-1 mb-2 smooth-effect hover:border-blue-400 hover:ring-blue-400 focus:ring-blue-400 focus:border-blue-400"
              />
              {/* <div className="flex justify-center items-center">
                <h4 className="">{option.opName}</h4>
              </div> */}

              <button
                className="ml-3 bg-blue-500 font-medium font-worksans rounded-lg px-4 py-2 my-2 text-white hover:bg-blue-700 smooth-effect"
                onClick={(_) => removeField(option.opId)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </div>
          );
        })}

        <div className="flex w-full mt-2">
          <input
            onChange={(e) => {
              setOptionName(e.target.value);
            }}
            value={optionName}
            placeholder="Enter option name"
            type="text"
            className=" flex-1 border-2 border-gray-300 rounded-lg p-2 mt-1 mb-2 smooth-effect hover:border-blue-400 hover:ring-blue-400 focus:ring-blue-400 focus:border-blue-400"
          />

          <button
            className="ml-3 bg-blue-500 font-medium font-worksans rounded-lg px-4 py-2 my-2 text-white hover:bg-blue-700 smooth-effect"
            onClick={addField}
          >
            Add Option
          </button>
        </div>
      </div>
    </>
  );
}

export function InputOptionsEditor(props: {
  field: dropDownField | radioInputField | multipleSelectField;
  onChangeFieldCB: (val: string, id: number) => void;
  removeFieldCB: (id: number) => void;
  changeOptionsCB: (options: string[], fieldId: number) => void;
}) {
  return (
    <div key={props.field.id}>
      <div className="flex">
        <input
          type="text"
          value={props.field.label}
          title={props.field.kind}
          onChange={(e) => {
            let value = e.target.value;
            props.onChangeFieldCB(value, props.field.id);
          }}
          className="flex-1 border-2 border-gray-300 rounded-lg p-2 mt-1 mb-2 smooth-effect hover:border-blue-400 hover:ring-blue-400 focus:ring-blue-400 focus:border-blue-400"
        />
        <button
          className="ml-3 w-28 bg-blue-500 font-medium font-worksans rounded-lg px-2 py-2 my-2 text-white hover:bg-blue-700 smooth-effect"
          type="button"
          data-bs-toggle="collapse" // {`collapse`}
          data-bs-target={`#collapse${props.field.id}`}
          aria-expanded="false"
          aria-controls={`collapse${props.field.id}`}
          data-mdb-ripple="true"
        >
          Edit
        </button>
        <button
          className="ml-3 w-28 bg-blue-500 font-medium font-worksans rounded-lg px-2 py-2 my-2 text-white hover:bg-blue-700 smooth-effect"
          onClick={(_) => props.removeFieldCB(props.field.id)}
        >
          Remove
        </button>
      </div>
      <div className={`collapse`} id={`collapse${props.field.id}`}>
        <OptionsEditor
          fieldID={props.field.id}
          fieldKind={props.field.kind}
          key={props.field.id}
          fieldLabel={props.field.label}
          fieldOptions={props.field.options}
          changeOptionsCB={props.changeOptionsCB}
        />
      </div>
    </div>
  );
}
