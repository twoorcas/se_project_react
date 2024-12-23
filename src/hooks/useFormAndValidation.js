import {useState, useCallback} from 'react';

export function useFormAndValidation(initialFieldNames=[]) {
    const initializeFields = (fields) => fields.reduce((acc, fieldName) => {
        acc[fieldName] = ''; 
        return acc;
      }, {}); 
      const initialFieldState = initializeFields(initialFieldNames);
    const [values, setValues] = useState(initialFieldState);
  const [ errors, setErrors ] = useState(initialFieldState);
  const [ isValid, setIsValid ] = useState(true);
  const handleValueChange = (e)=>{
    const {name, value} = e.target
    setValues({...values, [ name]: value });
    setErrors({...errors, [ name]: e.target.validationMessage});
    setIsValid(e.target.closest('form').checkValidity());
}
  const resetForm = useCallback((newValues = initialFieldState, newErrors = initialFieldState, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid]);
  return {values,setValues, handleValueChange, errors, isValid, resetForm, setIsValid };
}
