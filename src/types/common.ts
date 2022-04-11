import { Form } from "./formTypes";

export type Pagination<T> = {
  count: number;
  next: string;
  previous: string;
  results: T[];
};

export type PaginationParams = {
  offset: number;
  limit: number;
}


export type FormFieldTypes_api = "TEXT" | "DROPDOWN" | "RADIO" | "GENERIC";

export type FormField_api = {
  id?: number;
  label: string;
  kind: FormFieldTypes_api;
  options?: string[];
  value?: string;
  meta?: any[];
  // updated_label?: boolean;
  // updated_options?: boolean;
}


export type Answer = {
  form_field: number;
  value: string;
}

export type Submission = {
  id?: number;
  answers: Answer[];
  form: Form;
  created_date?: string;
}
