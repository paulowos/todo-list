import localForage from 'localforage';
import { useEffect } from 'react';
import { themeChange } from 'theme-change';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export default function Todo() {
  const navigate = useNavigate();
  useEffect(() => {
    themeChange(false);
    localForage.getItem('id').then((id) => {
      if (!id) navigate('/login');
    });
  }, [navigate]);
  return (
    <div>
      <Header />
      <button data-toggle-theme="dark,light">Todo</button>
    </div>
  );
}
