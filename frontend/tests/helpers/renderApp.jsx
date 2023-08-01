import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../src/App';
import { SWRConfig } from 'swr';

const renderApp = (path) => {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <SWRConfig value={{ provider: () => new Map() }}>
        <App />
      </SWRConfig>
    </MemoryRouter>
  );
};

export default renderApp;
