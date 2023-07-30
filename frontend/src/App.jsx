import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Todo from './pages/Todo';
import Register from './pages/Register';
import Profile from './pages/Profile';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Todo />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}
