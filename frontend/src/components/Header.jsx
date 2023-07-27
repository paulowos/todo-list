import ProfileSVG from '../assets/ProfileSVG';
import localForage from 'localforage';
import { useNavigate, Link } from 'react-router-dom';
import ThemeSelector from './ThemeSelector';
export default function Header() {
  const navigate = useNavigate();

  const handleExit = async () => {
    await localForage.clear();
    navigate('/login');
  };

  return (
    <header className="absolute top-0 h-10 bg-base-100 navbar">
      <div className="flex items-end flex-1 gap-1 ml-1 text-primary">
        <h1 className="text-4xl ">Simple</h1>
        <h2 className="text-xl ">note</h2>
      </div>

      <div className="mr-1 dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <ProfileSVG />
        </label>
        <ul
          tabIndex={0}
          className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-60 gap-1">
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
      </div>
    </header>
  );
}
