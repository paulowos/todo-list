import localForage from 'localforage';
import { useEffect, useState } from 'react';
import { themeChange } from 'theme-change';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';
import useSWR from 'swr';
import TaskCard from '../components/TaskCard';

export default function Todo() {
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  useEffect(() => {
    themeChange(false);
    localForage.getItem('id').then((id) => {
      if (!id) navigate('/login');
      setToken(id);
    });
  }, [navigate]);

  const headers = {
    Authorization: token,
  };
  const fetcher = (url) => axios.get(url, { headers }).then((res) => res.data);
  const { hostname } = window.location;
  const { data, error, isLoading } = useSWR(
    `http://${hostname}:3000/tasks`,
    fetcher
  );

  return (
    <div className="bg-base-300">
      <Header />

      <main className="flex justify-center max-w-6xl min-h-screen pt-20 pb-5 m-auto overflow-scroll bg-base-200">
        {isLoading || error ? (
          <div className="loading" />
        ) : (
          <div className="flex flex-col items-center w-full gap-3">
            {data &&
              data.length > 0 &&
              data.map((task) => (
                <TaskCard
                  key={task.id}
                  id={task.id}
                  task={task.task}
                  completed={task.completed}
                />
              ))}
          </div>
        )}
      </main>
    </div>
  );
}
