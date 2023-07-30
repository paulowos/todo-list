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
    setError({
      path: '',
      message: '',
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
    } catch (err) {
      console.log(err);
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

    try {
      setIsLoading(true);
      await axios.put(urls.userURL, form);
      await localForage.clear();
      window.change_password_modal.showModal();
    } catch (err) {
      setIsLoading(false);
      setError({
        path: 'form',
        message: err.response.data.error || 'Error',
      });
    }
  };

  const handleOk = async () => {
    setError({
      path: '',
      message: '',
    });

    navigate('/login');
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
          type="email"
          placeholder="Email"
        />
        <Input
          error={error}
          onChange={handleChange}
          value={form.password}
          name="password"
          type="password"
          placeholder="Senha Atual"
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
      <dialog id={`change_password_modal`} className="modal modal-middle">
        <form method="dialog" className="modal-box">
          <p className="py-4 text-center text-success">
            Senha alterada com sucesso
          </p>
          <div className="justify-center modal-action">
            <button className="btn btn-success" onClick={handleOk}>
              Fazer Login
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
