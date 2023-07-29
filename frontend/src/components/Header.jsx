import { Link } from 'react-router-dom';
import ProfileSVG from '../assets/ProfileSVG';
import ThemeSelector from './ThemeSelector';
import localForage from 'localforage';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const handleExit = async () => {
    await localForage.clear();
    navigate('/login');
  };
  return (
    <header className="fixed top-0 z-20 h-10 shadow bg-base-100 navbar">
      <div className="flex items-end flex-1 gap-1 ml-1 text-primary">
        <h1 className="text-4xl ">Simple</h1>
        <h2 className="text-xl ">note</h2>
      </div>

      <div className="mr-1">
        <label
          htmlFor="my_drawer"
          className="btn btn-ghost btn-circle avatar sm:hidden">
          <ProfileSVG />
        </label>
      </div>

      <menu className="hidden gap-1 menu sm:menu-horizontal">
        <li>
          <Link to="/profile" className="font-bold">
            Perfil
          </Link>
        </li>
        <li>
          <ThemeSelector />
        </li>
        <li>
          <a onClick={handleExit} className="btn btn-error btn-sm">
            Sair
          </a>
        </li>
      </menu>
    </header>
  );
}
