import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';
import urls from '../utils/urls';
import localForage from 'localforage';
import DeleteBtn from './DeleteBtn';
import EditBtn from './EditBtn';
import EditInput from './EditInput';
import { useSWRConfig } from 'swr';

export default function TaskCard({ id, task, completed }) {
  const [isEditing, setIsEditing] = useState(false);
  const { mutate } = useSWRConfig();

  const completedTaskHandler = async () => {
    const headers = {
      Authorization: await localForage.getItem('id'),
    };
    const url = `${urls.tasksURL}/${id}`;
    await axios.patch(url, null, { headers });
    mutate(urls.tasksURL);
  };

  return (
    <div className="flex-row items-center w-11/12 shadow bg-base-100 card-compact card">
      {isEditing ? (
        <div className="w-4/5 card-body">
          <EditInput task={task} id={id} setIsEditing={setIsEditing} />
        </div>
      ) : (
        <div className="w-4/5 card-body" onClick={completedTaskHandler}>
          <p
            className={`text-lg overflow-hidden w-full ${
              completed ? 'line-through text-neutral' : 'text-secondary'
            }`}>
            {task}
          </p>
        </div>
      )}
      <div>
        <EditBtn isEditing={isEditing} setIsEditing={setIsEditing} />
        <DeleteBtn id={id} />
      </div>
    </div>
  );
}

TaskCard.propTypes = {
  completed: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  task: PropTypes.string.isRequired,
};
