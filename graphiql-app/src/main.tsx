import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { AuthProvider, ThemeMode } from './contexts';
import { setupStore } from './redux/store';
import './i18n';
import App from './App';

import './index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeMode>
      <Provider store={setupStore()}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Provider>
    </ThemeMode>
  </React.StrictMode>
);
