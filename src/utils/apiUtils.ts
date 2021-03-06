import { FormField_api, PaginationParams, Submission } from '../types/common';
import { Form } from '../types/formTypes';

const API_BASE_URL = 'https://tsapi.coronasafe.live/api/';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';

export const request = async (
  endpoint: string,
  method: RequestMethod = 'GET',
  data: any = {}
) => {
  let url: string;
  let payload: string;
  if (method === 'GET') {
    const requestParams = data
      ? `?${Object.keys(data)
          .map((key) => `${key}=${data[key]}`)
          .join('&')}`
      : '';
    url = `${API_BASE_URL}${endpoint}${requestParams}`;
    payload = '';
  } else {
    url = `${API_BASE_URL}${endpoint}`;
    payload = data ? JSON.stringify(data) : '';
  }

  // Basic Authentication
  // const auth = 'Basic ' + window.btoa('GokulGHV:abcd@123');

  // Token Authentication
  const token = localStorage.getItem('token');
  const auth = token ? 'Token ' + localStorage.getItem('token') : '';

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: auth,
    },
    body: method !== 'GET' ? payload : null,
  });

  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    const errorJson = await response.json();
    throw Error(errorJson);
  }
};

export const createForm = (form: Form) => {
  return request('forms/', 'POST', form);
};

export const login = (username: string, password: string) => {
  return request('auth-token/', 'POST', { username, password });
};

export const me = () => {
  return request('users/me/', 'GET');
};

export const register = (
  username: string,
  email: string,
  password1: string,
  password2: string
) => {
  return request('auth/registration/', 'POST', {
    username,
    email,
    password1,
    password2,
  });
};

export const listForms = () => {
  return request('forms/', 'GET');
};

export const listFormsWithParams = (pageParams: PaginationParams) => {
  return request('forms/', 'GET', pageParams);
};

export const listFormFields = (formId: number) => {
  return request(`forms/${formId}/fields/`, 'GET');
};

export const getFormDetails = (formId: number) => {
  return request(`forms/${formId}/`, 'GET');
};

export const updateForm = (formId: number, data: any) => {
  return request(`forms/${formId}/`, 'PUT', data);
};

export const deleteForm = (formId: number) => {
  return request(`forms/${formId}/`, 'DELETE');
};

export const submitForm = (formId: number, data: Submission) => {
  return request(`forms/${formId}/submission/`, 'POST', data);
};

export const getFormResponses = (formId: number) => {
  return request(`forms/${formId}/submission/`, 'GET');
};

export const getFormResponse = (formId: number, responseId: number) => {
  return request(`forms/${formId}/submission/${responseId}/`, 'GET');
};

export const addNewFormField = (formId: number, field: FormField_api) => {
  return request(`forms/${formId}/fields/`, 'POST', field);
};

export const removeFormField = (formId: number, fieldId: number) => {
  return request(`forms/${formId}/fields/${fieldId}`, 'DELETE');
};

export const updateFormField = (
  formId: number,
  fieldId: number,
  field: FormField_api
) => {
  return request(`forms/${formId}/fields/${fieldId}`, 'PUT', field);
};
