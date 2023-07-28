import localForage from 'localforage';
import { useEffect } from 'react';
import { themeChange } from 'theme-change';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';
import useSWR from 'swr';
import TaskCard from '../components/TaskCard';
import urls from '../utils/urls';
import Drawer from '../components/Drawer';

export default function Todo() {
  const navigate = useNavigate();
  useEffect(() => {
    themeChange(false);
    localForage.getItem('id').then((id) => {
      if (!id) navigate('/login');
    });
  }, [navigate]);

  const { data, error, isLoading } = useSWR(urls.tasksURL, async (url) => {
    const headers = {
      Authorization: await localForage.getItem('id'),
    };
    const { data } = await axios.get(url, { headers });
    return data;
  });

  return (
    <div className="drawer drawer-end bg-base-300 2xl:drawer-open">
      <input type="checkbox" id="my_drawer" className="drawer-toggle" />
      <div className="drawer-content">
        <Header />
        <main className="flex justify-center max-w-5xl min-h-screen pt-20 pb-5 m-auto overflow-scroll bg-base-200">
          {isLoading || error ? (
            <div className="loading" />
          ) : (
            <div className="flex flex-col items-center w-full gap-2">
              {data?.map((task) => (
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
      <div className="drawer-side">
        <Drawer />
      </div>
    </div>
  );
}
