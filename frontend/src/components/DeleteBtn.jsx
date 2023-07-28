import PropTypes from 'prop-types';
import localForage from 'localforage';
import DeleteSVG from '../assets/DeleteSVG';
import urls from '../utils/urls';
import axios from 'axios';
import { useSWRConfig } from 'swr';

export default function DeleteBtn({ id }) {
  const { mutate } = useSWRConfig();

  const deleteTaskHandler = async () => {
    const headers = {
      Authorization: await localForage.getItem('id'),
    };
    const url = `${urls.tasksURL}/${id}`;
    await axios.delete(url, { headers });
    mutate(urls.tasksURL);
  };
  return (
    <button
      onClick={deleteTaskHandler}
      className="btn-sm btn btn-ghost btn-circle">
      <DeleteSVG />
    </button>
  );
}

DeleteBtn.propTypes = {
  id: PropTypes.string.isRequired,
};
