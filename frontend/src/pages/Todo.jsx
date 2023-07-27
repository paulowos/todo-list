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
    <>
      <Header />
      <main className="h-screen pt-20 bg-base-200">
        <button data-toggle-theme="dark,light">Todo</button>
      </main>
    </>
  );
}
