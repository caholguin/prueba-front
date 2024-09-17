import { useState, ChangeEvent } from 'react';

interface FormState {
    username: string;
    password: string;
}


export const useForm = (initialForm: FormState = { username: '', password: '' }) => {

    const [formState, setFormState] = useState(initialForm);

    //const onInputChange = ({ target }) => {
    const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
    }
}