import { navigate } from 'raviger';
import React, { useState } from 'react';
import { json } from 'stream/consumers';
import { Errors, Form, validateForm } from '../types/formTypes';
import { createForm } from '../utils/apiUtils';

export default function CreateForm() {
  const [form, setForm] = useState<Form>({
    title: '',
    description: '',
    is_public: false,
  });

  const [errors, setErrors] = useState<Errors<Form>>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateForm(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {

      try {
        const data = await createForm(form);
        navigate(`/forms/${data.id}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-full divide-y divide-gray-200">
      <h1 className="text-xl text-slate-700 my-2 font-semibold">Create Form</h1>
      <form className="py-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className={`${errors.title ? 'text-red-500' : ''}`}
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={form.title}
            onChange={(e) => {
              setForm({ ...form, title: e.target.value });
            }}
            className="flex-1 border-2 w-full border-gray-300 rounded-lg p-2 mt-1 smooth-effect hover:border-blue-400 hover:ring-blue-400 focus:ring-blue-400 focus:border-blue-400"
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className={`${errors.description ? 'text-red-500' : ''}`}
          >
            Description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            value={form.description}
            onChange={(e) => {
              setForm({ ...form, description: e.target.value });
            }}
            className="flex-1 border-2 w-full border-gray-300 rounded-lg p-2 mt-1 smooth-effect hover:border-blue-400 hover:ring-blue-400 focus:ring-blue-400 focus:border-blue-400"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </div>

        <div className="flex mb-4 w-fit">
          <label
            htmlFor="is_public"
            className={`${errors.is_public ? 'text-red-500' : ''}`}
          >
            Is Public
          </label>
          <input
            type="checkbox"
            name="is_public"
            id="is_public"
            value={form.is_public ? 'true' : 'false'}
            onChange={(e) => {
              setForm({ ...form, is_public: e.target.checked });
            }}
            className="ml-3 flex-1 border-2 border-gray-300 rounded-lg p-2 mt-1 smooth-effect hover:border-blue-400 hover:ring-blue-400 focus:ring-blue-400 focus:border-blue-400"
          />
          {errors.is_public && (
            <p className="text-red-500">{errors.is_public}</p>
          )}
        </div>

        <button
          className="w-full bg-blue-500 font-medium font-worksans rounded-lg px-4 py-2 text-white hover:bg-blue-700 smooth-effect"
          type="submit"
        >
          Add Form
        </button>
      </form>
    </div>
  );
}
