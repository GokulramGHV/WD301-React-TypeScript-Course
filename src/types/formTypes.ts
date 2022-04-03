export interface formData {
    id: number;
    title: string;
    formFields: formField[];
}
export interface formField {
    id: number;
    label: string;
    type: string;
    value: string;
}

export interface fieldResponse {
    id: number;
    question: string;
    answer: string;
}

export interface formResponse {
    id: number;
    formName: string;
    responses: fieldResponse[];
}