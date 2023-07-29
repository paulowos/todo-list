import PropTypes from 'prop-types';
import { useState } from 'react';
import ConfirmSVG from '../assets/ConfirmSVG';
import localForage from 'localforage';
import urls from '../utils/urls';
import axios from 'axios';
import { useSWRConfig } from 'swr';
import taskSchema from '../schemas/task';

export default function EditInput({ task, id, setIsEditing }) {
  const [value, setValue] = useState(task);
  const [error, setError] = useState({ bool: false, message: '' });

  const { mutate } = useSWRConfig();

  const handleChange = ({ target }) => {
    if (target.value.length > 255) return;
    setValue(target.value);
    setError({ ...error, bool: false });
  };

  const taskValidation = () => {
    try {
      taskSchema.parse({ task: value });
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

    const url = `${urls.tasksURL}/${id}`;
    await axios.put(url, { task: value }, { headers });
    mutate(urls.tasksURL);
    setIsEditing(false);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex-row items-center justify-end w-full gap-3 form-control">
      <label className="flex flex-col justify-center w-full gap-2 ">
        <input
          type="text"
          className={`w-full input input-bordered input-sm ${
            error.bool && 'input-error'
          }`}
          autoFocus
          value={value}
          onChange={handleChange}
        />
        {error.bool && (
          <span className="pl-1 label-text-alt text-error">
            {error.message}
          </span>
        )}
      </label>
      <span className="label-text-alt">{`${value.length}/255`}</span>
      <button type="submit" className="btn-sm btn btn-ghost btn-circle">
        <ConfirmSVG />
      </button>
    </form>
  );
}

EditInput.propTypes = {
  id: PropTypes.string.isRequired,
  setIsEditing: PropTypes.func.isRequired,
  task: PropTypes.string.isRequired,
};
