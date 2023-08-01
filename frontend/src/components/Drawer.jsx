import { Link } from 'react-router-dom';
import ThemeSelector from './inputs/ThemeSelector';
import useExit from '../hooks/useExit';

export default function Drawer() {
  const handleExit = useExit();
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
