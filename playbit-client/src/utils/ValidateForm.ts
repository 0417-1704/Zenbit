/* eslint-disable no-plusplus */
import { FormValues } from "interfaces/tournament";

export const validateForm = (formValues: FormValues) => {
    const errors: {message: string} = {message: ''};
    let hasError = false;

    Object.keys(formValues).forEach((key) => {
        switch (key){
            case 'tournamentTitle':
                if(!formValues.tournamentTitle){
                    errors.message = 'Es requerido un titulo de torneo';
                    hasError = true;
                }
                break;

            case 'tournamentRules':
                if(!formValues.tournamentRules){
                    errors.message = 'Las reglas del torneo son obligatorias';
                    hasError = true;
                }
                break;
            
            case 'tournamentConsole':
                if(!formValues.tournamentConsole){
                    errors.message = 'La consola del torneo es obligatoria';
                    hasError = true;
                }
                break;
            
            case 'gameTitle':
                if(!formValues.gameTitle){
                    errors.message = 'El nombre del juego es obligatorio';
                    hasError = true;
                } 
                break;
            
            case 'participantsNumber':
                if(!formValues.participantsNumber){
                    errors.message = 'Price is required';
                    hasError = true;
                }
                break;
            
            default:
                hasError = false;
        }
    });

    return {hasError, errors};
};

export const hasChanged = (initialValues: FormValues, currentValues:
    FormValues) => {
        const initialValuesArray = Object.values(initialValues);
        const currentValuesArray = Object.values(currentValues);
        for(let i = 0; i < initialValuesArray.length; i++){
            if(initialValuesArray[i] !== currentValuesArray[i]){
                return true;
            }
        }
        return false;
    };




