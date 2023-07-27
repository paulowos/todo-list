import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Todo from './pages/Todo';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Todo />} />
    </Routes>
  );
}
