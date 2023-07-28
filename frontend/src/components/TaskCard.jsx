import { useState } from 'react';
import axios from 'axios';
import EditSVG from '../assets/EditSVG';
import DeleteSVG from '../assets/DeleteSVG';
export default function TaskCard({ id, task, completed, token }) {
  const [completedTask, setCompletedTask] = useState(completed);

  const completedTaskHandler = async () => {
    const headers = {
      Authorization: token,
    };
    const { hostname } = window.location;
    const url = `http://${hostname}:3000/tasks/${id}`;
    await axios.patch(url, null, { headers });
    setCompletedTask(!completedTask);
  };

  return (
    <div className="flex items-center w-11/12 rounded-lg shadow bg-base-100 card-compact">
      <div
        className="items-start w-4/5 justify-evenly card-body"
        onClick={completedTaskHandler}>
        <p
          className={`text-lg overflow-hidden w-full ${
            completedTask ? 'line-through text-neutral' : 'text-secondary'
          }`}>
          {task}
        </p>
      </div>
      <div>
        <button className=" btn btn-sm btn-ghost btn-circle">
          <EditSVG />
        </button>
        <button className="btn-sm btn btn-ghost btn-circle">
          <DeleteSVG />
        </button>
      </div>
    </div>
  );
}
