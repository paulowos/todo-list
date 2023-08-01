import { useState } from 'react';
import Input from './Input';
import axios from 'axios';
import urls from '../../utils/urls';
import loginSchema from '../../schemas/login';
import useExit from '../../hooks/useExit';

export default function DeleteAccountForm() {
  const handleExit = useExit();
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
    setError({
      path: '',
      message: '',
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
    } catch (err) {
      setError({
        path: err.issues[0].path[0],
        message: err.issues[0].message,
      });
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = formValidation();
    if (!isValid) return;
    setIsLoading(true);
    try {
      window.delete_account_modal.showModal();
    } catch (err) {
      return;
    }
  };

  const handleOk = async (e) => {
    e.preventDefault();
    try {
      setError({
        path: '',
        message: '',
      });
      await axios.delete(urls.userURL, { data: form });
      await handleExit();
    } catch (err) {
      setIsLoading(false);
      setError({
        path: 'form',
        message: err?.response?.data?.error,
      });
    }
  };

  const handleCancel = () => {
    try {
      setIsLoading(false);
      setForm({
        email: '',
        password: '',
      });
      window.delete_account_modal.closeModal();
    } catch (err) {
      return;
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="items-center w-full gap-2 form-control">
        <Input
          error={error}
          onChange={handleChange}
          value={form.email}
          name="email"
          type="text"
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

        <span className="font-bold label-text text-error">
          {error.path === 'form' && error.message}
        </span>
        <button type="submit" className="btn btn-error">
          <span className={isLoading ? 'loading' : ''}>Excluir</span>
        </button>
      </form>
      <dialog id={`delete_account_modal`} className="modal modal-middle">
        <form method="dialog" className="modal-box">
          <p className="py-4 text-center">
            Deseja realmente excluir sua conta?
          </p>
          <p className="text-center text-error py4">
            Todos os seus dados serão perdidos!
          </p>
          <div className=" modal-action">
            <button className="btn btn-sm btn-warning" onClick={handleCancel}>
              Cancelar
            </button>
            <button
              className="btn btn-sm btn-ghost text-error"
              onClick={handleOk}>
              Excluir
            </button>
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button onClick={handleCancel} />
        </form>
      </dialog>
    </>
  );
}
