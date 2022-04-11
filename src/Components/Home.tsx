import React, { useEffect, useState } from 'react';
import ListELem from './ListElem';
// import { initialFormFields, getLocalForms, saveLocalForms } from './Form';
import { navigate, useQueryParams } from 'raviger';
import Header from '../Header';
import { Form, formData } from '../types/formTypes';
import Modal from './common/Modal';
import CreateForm from './CreateForm';
import { deleteForm, listForms } from '../utils/apiUtils';
import { Pagination } from '../types/common';

const removeForm = async (
  setFormStateCB: React.Dispatch<React.SetStateAction<Form[]>>,
  formID: number
) => {
  try {
    setFormStateCB((state) => state.filter((f) => f.id !== formID));
    const data = await deleteForm(formID);
  } catch (error) {
    console.log(error);
  }
};
const fetchForms = async (setFormStateCB: (value: Form[]) => void) => {
  // fetch('https://tsapi.coronasafe.live/api/mock_test/').then((response) =>
  //   response.json().then((data) => setFormStateCB(data))
  // );
  try {
    const data: Pagination<Form> = await listForms();
    setFormStateCB(data.results);
  } catch (error) {
    console.log(error);
  }
};

export function Home() {
  const [{ search }, setQuery] = useQueryParams();
  const [searchString, setSearchString] = useState('');
  const [formsState, setFormsState] = useState<Form[]>([]);
  const [newForm, setNewForm] = useState(false);

  useEffect(() => {
    navigate(`/?search=${searchString}`);
  }, [searchString]);

  useEffect(() => {
    fetchForms(setFormsState);
  }, []);

  return (
    <>
      <p className="font-medium font-worksans text-center mb-5">
        Welcome to the Home Page!
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setQuery({ search: searchString });
        }}
      >
        <input
          type="search"
          value={searchString}
          onChange={(e) => {
            setSearchString(e.target.value);
          }}
          name="search"
          placeholder=" 🔎 Search "
          className="flex-1 border-2 w-full border-gray-300 rounded-lg p-2 mt-1 mb-5 smooth-effect hover:border-blue-400 hover:ring-blue-400 focus:ring-blue-400 focus:border-blue-400"
        />
      </form>

      <div>
        {formsState
          .filter((form) =>
            form.title.toLowerCase().includes(search?.toLowerCase())
          )
          .map((form) => (
            <ListELem
              formName={form.title}
              key={form.id}
              id={form.id as number}
              removeFormsCB={(id) => {
                removeForm(setFormsState, form.id as number);
              }}
            />
          ))}
      </div>

      {formsState.length === 0 ? (
        <>
          <div className="text-gray-400  text-center">
            There are no forms to display!
          </div>
          <div className="text-gray-400  text-center mb-3">
            Click the button below to add a new form...
          </div>
        </>
      ) : (
        ''
      )}

      <button
        className="w-full bg-blue-500 font-medium font-worksans rounded-lg px-4 py-2 my-2 text-white hover:bg-blue-700 smooth-effect"
        type="submit"
        onClick={(_) => {
          setNewForm(true);
        }}
      >
        New Form
      </button>
      <Modal open={newForm} closeCB={() => setNewForm(false)}>
        <CreateForm />
      </Modal>
    </>
  );
}
