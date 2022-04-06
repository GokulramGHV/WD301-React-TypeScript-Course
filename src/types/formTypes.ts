export type formData = {
    id: number;
    title: string;
    formFields: formField[];
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

export const listOfTypes = ['text', 'date', 'email', 'number', 'time']
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
    type: textFieldTypes;
    value: string;
}

export type dropDownField = {
    id: number;
    kind: "dropdown";
    label: string;
    type: textFieldTypes;
    options: string[];
    value: string;
}

export type radioInputField = {
    id: number;
    kind: "radioInput";
    label: string;
    type: textFieldTypes;
    options: string[];
    value: string;
}

export type multipleSelectField = {
    id: number;
    kind: "radioInput";
    label: string;
    type: textFieldTypes;
    options: string[];
    value: string;
}

export type formField = textField | dropDownField | textAreaField | radioInputField | multipleSelectField;