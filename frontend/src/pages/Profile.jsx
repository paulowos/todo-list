import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { themeChange } from 'theme-change';
import localForage from 'localforage';
import { useNavigate } from 'react-router-dom';
import Drawer from '../components/Drawer';
import ChangePasswordBtn from '../components/buttons/ChangePasswordBtn';
import DeleteAccountBtn from '../components/buttons/DeleteAccountBtn';
import EditPasswordForm from '../components/inputs/EditPasswordForm';
import DeleteAccountForm from '../components/inputs/DeleteAccountForm';

export default function Profile() {
  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
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
        <main className="flex flex-col items-center justify-center max-w-5xl min-h-screen gap-10 m-auto bg-base-200">
          <h1 className="text-4xl font-bold text-center text-secondary">
            {name}
          </h1>
          <ChangePasswordBtn
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            setIsDeleting={setIsDeleting}
          />
          {isEditing && <EditPasswordForm />}
          <DeleteAccountBtn
            setIsEditing={setIsEditing}
            isDeleting={isDeleting}
            setIsDeleting={setIsDeleting}
          />
          {isDeleting && <DeleteAccountForm />}
        </main>
      </div>
      <div className="drawer-side">
        <Drawer />
      </div>
    </div>
  );
}
