import React, { useEffect, useState } from 'react';
import ListELem from './ListElem';
import { navigate, useQueryParams } from 'raviger';
import { Form } from '../types/formTypes';
import Modal from './common/Modal';
import CreateForm from './CreateForm';
import { deleteForm, listFormsWithParams } from '../utils/apiUtils';
import { Pagination, PaginationParams } from '../types/common';
import InfiniteScroll from 'react-infinite-scroller';

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
const fetchForms = async (
  sethasMoreCB: React.Dispatch<React.SetStateAction<boolean>>,
  setpageCB: React.Dispatch<React.SetStateAction<PaginationParams>>,
  setFormStateCB: (value: Form[]) => void
) => {
  // fetch('https://tsapi.coronasafe.live/api/mock_test/').then((response) =>
  //   response.json().then((data) => setFormStateCB(data))
  // );
  try {
    const data: Pagination<Form> = await listFormsWithParams({
      limit: 5,
      offset: 0,
    });
    setFormStateCB(data.results);
    setpageCB((state) => {
      return { ...state, offset: state.offset + 5 };
    });
    if (data.results.length === 0 || data.results.length < 5) {
      sethasMoreCB(false);
    }
  } catch (error) {
    console.log(error);
  }
};

export function Home() {
  const [{ search }, setQuery] = useQueryParams();
  const [searchString, setSearchString] = useState('');
  const [formsState, setFormsState] = useState<Form[]>([]);
  const [newForm, setNewForm] = useState(false);
  const [hasMore, sethasMore] = useState(true);
  const [page, setpage] = useState<PaginationParams>({ limit: 5, offset: 0 });

  useEffect(() => {
    navigate(`/?search=${searchString}`);
  }, [searchString]);

  useEffect(() => {
    fetchForms(sethasMore, setpage, setFormsState);
  }, []);

  const fetchData = async () => {
    const data = await listFormsWithParams(page);
    console.log(data);
    setFormsState([...formsState, ...data.results]);
    if (data.results.length === 0 || data.results.length < 5) {
      sethasMore(false);
    }
    setpage((state) => {
      return { ...state, offset: state.offset + 5 };
    });
  };

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
          aria-label="Search"
          placeholder=" 🔎 Search "
          className="flex-1 border-2 w-full border-gray-300 rounded-lg p-2 mt-1 mb-5 smooth-effect hover:border-blue-400 hover:ring-blue-400 focus:ring-blue-400 focus:border-blue-400"
        />
      </form>

      <div>
        <InfiniteScroll
          // pageStart={0}
          initialLoad={false}
          loadMore={fetchData}
          hasMore={hasMore}
          loader={
            <div
              className={
                !hasMore ? 'hidden ' : 'loader text-center my-3 text-gray-400'
              }
              key={0}
            >
              Scroll down to view more...
            </div>
          }
        >
          <ul>
            {formsState
              .filter((form) =>
                form.title.toLowerCase().includes(search?.toLowerCase())
              )
              .map((form) => (
                <li key={form.id}>
                  <ListELem
                    formName={form.title}
                    key={form.id}
                    id={form.id as number}
                    removeFormsCB={(id) => {
                      removeForm(setFormsState, form.id as number);
                    }}
                  />
                </li>
              ))}
          </ul>
        </InfiniteScroll>
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
