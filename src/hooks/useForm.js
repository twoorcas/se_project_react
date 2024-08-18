import { useState } from "react";
function useForm(formData) {
  const [values, setValues] = useState(formData);
  const handleValueChange = (target) => {
    const { name, value } = target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleValueChange, setValues };
}
export default useForm;