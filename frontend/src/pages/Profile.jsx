import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { themeChange } from 'theme-change';
import localForage from 'localforage';
import { useNavigate } from 'react-router-dom';
import Drawer from '../components/Drawer';
import ChangePasswordBtn from '../components/buttons/ChangePasswordBtn';
import DeleteAccountBtn from '../components/buttons/DeleteAccountBtn';
import EditPasswordForm from '../components/inputs/EditPasswordForm';

export default function Profile() {
  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    themeChange(false);
    localForage.getItem('id').then((id) => {
      if (!id) navigate('/login');
    });
    localForage.getItem('name').then((name) => {
      setName(name);
    });
  });

  return (
    <div className="bg-base-300 drawer drawer-end">
      <input type="checkbox" id="my_drawer" className="drawer-toggle" />
      <div className="drawer-content">
        <Header />
        <main className="flex flex-col items-center justify-between w-full max-w-5xl min-h-screen pt-24 pb-5 m-auto bg-base-200">
          <div className="flex flex-col items-center justify-center w-full gap-10 ">
            <h1 className="text-4xl font-bold text-center text-secondary">
              {name}
            </h1>
            <ChangePasswordBtn
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
            {isEditing && <EditPasswordForm />}
          </div>
          <DeleteAccountBtn />
        </main>
      </div>
      <div className="drawer-side">
        <Drawer />
      </div>
    </div>
  );
}
