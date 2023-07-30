import { useState } from 'react';
import Input from './Input';
import changePasswordSchema from '../../schemas/changePassword';
import axios from 'axios';
import urls from '../../utils/urls';
import localForage from 'localforage';
import { useNavigate } from 'react-router-dom';

export default function EditPasswordForm() {
  const navigate = useNavigate();
  const [error, setError] = useState({
    path: '',
    message: '',
  });

  const [form, setForm] = useState({
    email: '',
    password: '',
    newPassword: '',
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
      changePasswordSchema.parse(form);
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
      const { data } = await axios.put(urls.userURL, form);
      await localForage.clear();
      navigate('/login');
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError({
        path: 'form',
        message: err.response.data.error || 'Error',
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="items-center w-full gap-2 form-control">
      <Input
        error={error}
        onChange={handleChange}
        value={form.email}
        name="email"
        type="email"
        placeholder="Email"
      />
      <Input
        error={error}
        onChange={handleChange}
        value={form.password}
        name="password"
        type="password"
        placeholder="Senha"
      />
      <Input
        error={error}
        onChange={handleChange}
        value={form.newPassword}
        name="newPassword"
        type="password"
        placeholder="Nova Senha"
      />

      <span className="font-bold label-text text-error">
        {error.path === 'form' && error.message}
      </span>
      <button type="submit" className="btn btn-success">
        <span className={isLoading ? 'loading' : ''}>Confirmar</span>
      </button>
    </form>
  );
}
