import PropTypes from 'prop-types';
import { useState } from 'react';
import ConfirmSVG from '../assets/ConfirmSVG';
import localForage from 'localforage';
import urls from '../utils/urls';
import axios from 'axios';
import { useSWRConfig } from 'swr';

export default function EditInput({ task, id, setIsEditing }) {
  const [value, setValue] = useState(task);
  const { mutate } = useSWRConfig();

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      className="z-50 flex-row items-center justify-between w-full gap-3 form-control">
      <input
        type="text"
        className="w-11/12 input input-bordered input-sm "
        autoFocus
        value={value}
        onChange={handleChange}
      />

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
