export type Pagination<T> = {
  count: number;
  next: string;
  previous: string;
  results: T[];
};

export type FieldsPagination_api<T> = {
  count: number;
  next: string;
  previous: string;
  results: T[];
};


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
