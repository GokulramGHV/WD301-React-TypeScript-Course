// import { formatDiagnostic } from "typescript";
import { Form } from "../Components/Form";

export type formData = {
    id: number;
    title: string;
    formFields: formField[];
}

export type Form = {
    id?: number;
    title: string;
    description?: string;
    is_public?: boolean;
}

export type Errors<T> = Partial<Record<keyof T, string>>

export const validateForm = (form: Form) => {
    const errors: Errors<Form> = {}
    if (form.title.length < 1) {
        errors.title = "Title is Required"
    }
    if (form.title.length > 100) {
        errors.title = "Title must be less than 100 characters"
    }
    return errors;
}

export type fieldResponse = {
    id: number;
    question: string;
    answer: string;
}

export type formResponse = {
    id: number;
    formName: string;
    responses: fieldResponse[];
}

export const listOfTypes = ['text', 'date', 'email', 'number', 'time']  as const;
export type textFieldTypes = typeof listOfTypes[number];

export type textField = {
    id: number;
    kind: "text";
    label: string;
    type: textFieldTypes;
    value: string;
}

export type textAreaField = {
    id: number;
    kind: "textArea";
    label: string;
    type: 'text';
    value: string;
}

export type dropDownField = {
    id: number;
    kind: "dropdown";
    label: string;
    type: 'text';
    options: string[];
    value: string;
}

export type radioInputField = {
    id: number;
    kind: "radioInput";
    label: string;
    type: 'text';
    options: string[];
    value: string;
}

export type multipleSelectField = {
    id: number;
    kind: "multipleSelect";
    label: string;
    type: 'text';
    options: string[];
    value: string;
}

export type formField = textField | dropDownField | textAreaField | radioInputField | multipleSelectField;