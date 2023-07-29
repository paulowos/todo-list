import { useState } from 'react';
import localForage from 'localforage';
import axios from 'axios';
import urls from '../utils/urls';
import { useSWRConfig } from 'swr';
import taskSchema from '../schemas/task';

export default function NewTaskInput() {
  const [task, setTask] = useState('');
  const [error, setError] = useState({ bool: false, message: '' });
  const { mutate } = useSWRConfig();

  const handleChange = ({ target }) => {
    setTask(target.value);
    setError({ ...error, bool: false });
  };

  const taskValidation = () => {
    try {
      taskSchema.parse({ task });
      setError({ ...error, bool: false });
      return true;
    } catch (err) {
      setError({ bool: true, message: err.issues[0].message });
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = taskValidation();
    if (!validation) return;
    const headers = {
      Authorization: await localForage.getItem('id'),
    };
    await axios.post(urls.tasksURL, { task }, { headers });
    setTask('');
    mutate(urls.tasksURL);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="items-end w-11/12 gap-2 form-control">
      <textarea
        onChange={handleChange}
        className={`w-full h-30 textarea textarea-bordered ${
          error.bool && 'textarea-error'
        }`}
        placeholder="Digite a sua tarefa..."
        value={task}
        maxLength={255}
      />
      <div className="flex justify-between w-full pl-2">
        <span className={`label-text-alt ${error.bool && 'text-error'}`}>
          {error.bool ? error.message : `${task.length}/255`}
        </span>

        <button type="submit" className=" btn btn-xs btn-success">
          Adicionar
        </button>
      </div>
    </form>
  );
}
