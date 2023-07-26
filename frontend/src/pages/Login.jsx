import React, { useEffect, useState } from 'react';
import { themeChange } from 'theme-change';
import Input from '../components/Input';
import { loginSchema } from '../schemas/login';

export default function login() {
  useEffect(() => {
    themeChange(false);
  });

  const [error, setError] = useState({
    path: '',
    message: '',
  });

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const formValidation = () => {
    try {
      loginSchema.parse(form);
    } catch (error) {
      setError({
        path: error.issues[0].path[0],
        message: error.issues[0].message,
      });
    }
  };

  const handleSubmit = () => {
    formValidation();
  };

  const { email, password } = form;
  return (
    <form className="form-control w-screen h-screen flex items-center justify-center">
      <Input
        placeholder={'Email'}
        name={'email'}
        type={'email'}
        value={email}
        onChange={handleChange}
        error={error}
      />
      <Input
        placeholder={'Senha'}
        name={'password'}
        type={'password'}
        value={password}
        onChange={handleChange}
        error={error}
      />

      <button
        onClick={handleSubmit}
        type="button"
        className="btn btn-wide btn-primary btn-outline">
        Entrar
      </button>
    </form>
  );
}
