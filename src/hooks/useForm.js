import { useState } from "react";

export const useForm = (initialForm = {}) => {
  const [form, setForm] = useState(initialForm);
  const serialize = (formulario) => {
    const formData = new FormData(formulario);
    const newObject = {};
    for (const [name, value] of formData) {
      newObject[name] = value;
    }
    return newObject;
  };
  const send = (e) => {
    e.preventDefault();
    setForm(serialize(e.target));
  };
  const changed = ({ target }) => {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  };
  return { state: form, send, changed };
};
