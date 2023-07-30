import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../src/App';

const renderApp = (path) => {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );
};

export default renderApp;
