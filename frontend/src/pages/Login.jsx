import { useEffect, useState } from 'react';
import { themeChange } from 'theme-change';
import Input from '../components/Input';
import { loginSchema } from '../schemas/login';
import axios from 'axios';
import localForage from 'localforage';

import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    themeChange(false);
    localForage.getItem('id').then((id) => {
      if (id) navigate('/');
    });
  }, [navigate]);

  const [error, setError] = useState({
    path: '',
    message: '',
  });

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const formValidation = () => {
    try {
      loginSchema.parse(form);
      setError({
        path: '',
        message: '',
      });
      return true;
    } catch (error) {
      setError({
        path: error.issues[0].path[0],
        message: error.issues[0].message,
      });
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = formValidation();
    if (!isValid) return;

    try {
      setIsLoading(true);
      const { data } = await axios.post('http://localhost:3000/user', form);
      await localForage.setItem('id', data.id);
      navigate('/');
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError({
        path: 'form',
        message: err.response.data.error,
      });
    }
  };

  const { email, password } = form;
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-10">
      <div className="w-56 text-secondary">
        <h1 className="text-5xl font-bold text-left">Simple</h1>
        <h2 className="text-3xl font-bold text-right">Note</h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center w-screen form-control">
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

        <span className="font-bold label-text text-error">
          {error.path === 'form' && error.message}
        </span>

        <button type="submit" className="mt-3 btn btn-wide btn-primary">
          <span className={isLoading ? 'loading' : ''}>Entrar</span>
        </button>

        <button
          className="mt-1 btn btn-wide btn-link text-neutral"
          type="button"
          onClick={() => navigate('/register')}>
          Cadastrar
        </button>
      </form>
    </div>
  );
}
