import { Link, useNavigate } from 'react-router-dom';
import ThemeSelector from './ThemeSelector';
import localForage from 'localforage';

export default function Drawer() {
  const navigate = useNavigate();

  const handleExit = async () => {
    await localForage.clear();
    navigate('/login');
  };
  return (
    <>
      <label htmlFor="my_drawer" className="drawer-overlay"></label>
      <ul className="h-full pt-20 menu bg-base-100 rounded-box w-60">
        <li>
          <Link to="/profile" className="font-bold">
            Perfil
          </Link>
        </li>
        <li>
          <ThemeSelector />
        </li>
        <li>
          <a onClick={handleExit} className=" btn btn-error btn-sm">
            Sair
          </a>
        </li>
      </ul>
    </>
  );
}
