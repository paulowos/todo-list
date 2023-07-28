import ProfileSVG from '../assets/ProfileSVG';

export default function Header() {
  return (
    <header className="fixed top-0 z-20 h-10 shadow bg-base-100 navbar">
      <div className="flex items-end flex-1 gap-1 ml-1 text-primary">
        <h1 className="text-4xl ">Simple</h1>
        <h2 className="text-xl ">note</h2>
      </div>

      <div className="mr-1 dropdown dropdown-end">
        <label
          htmlFor="my_drawer"
          className="btn btn-ghost btn-circle avatar 2xl:hidden">
          <ProfileSVG />
        </label>
      </div>
    </header>
  );
}
