import { useEffect } from 'react';
import { themeChange } from 'theme-change';

export default function App() {
  useEffect(() => {
    themeChange(false);
  }, []);
  return (
    <button data-toggle-theme="dark,light" className="btn btn-primary">
      App
    </button>
  );
}
