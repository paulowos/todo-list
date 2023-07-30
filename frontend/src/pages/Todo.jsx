import localForage from 'localforage';
import { useEffect } from 'react';
import { themeChange } from 'theme-change';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';
import useSWRImmutable from 'swr';
import TaskCard from '../components/TaskCard';
import urls from '../utils/urls';
import Drawer from '../components/Drawer';
import NewTaskInput from '../components/inputs/NewTaskInput';

export default function Todo() {
  const navigate = useNavigate();
  useEffect(() => {
    themeChange(false);
    localForage.getItem('id').then((id) => {
      if (!id) navigate('/login');
    });
  }, [navigate]);

  const { data, error, isLoading } = useSWRImmutable(
    urls.tasksURL,
    async (url) => {
      const headers = {
        Authorization: await localForage.getItem('id'),
      };
      const { data } = await axios.get(url, { headers });
      return data;
    }
  );

  return (
    <div className="drawer drawer-end bg-base-300 ">
      <input type="checkbox" id="my_drawer" className="drawer-toggle" />
      <div className="drawer-content">
        <Header />
        <main className="flex justify-center w-screen max-w-5xl min-h-screen pt-20 pb-5 m-auto overflow-scroll bg-base-200">
          {isLoading || error ? (
            <div className="loading" />
          ) : (
            <div className="flex flex-col items-center w-full gap-2">
              <NewTaskInput />
              {data?.map((task) => (
                <TaskCard data={task} key={task.id} />
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
