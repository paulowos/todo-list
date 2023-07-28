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
    <>
      <button
        onClick={() => window.my_modal.showModal()}
        className="btn-sm btn btn-ghost btn-circle">
        <DeleteSVG />
      </button>
      <dialog id="my_modal" className="modal modal-bottom sm:modal-middle">
        <form method="dialog" className="modal-box">
          <p className="py-4">Tem certeza que deseja excluir essa tarefa?</p>
          <div className="modal-action">
            <button className="btn btn-warning">Cancelar</button>
            <button onClick={deleteTaskHandler} className="btn btn-error">
              Excluir
            </button>
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

DeleteBtn.propTypes = {
  id: PropTypes.string.isRequired,
};
