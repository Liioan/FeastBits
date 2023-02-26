import { BrowserRouter } from 'react-router-dom';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { IsMobileProvider } from './context/IsMobileContext';
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <IsMobileProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </IsMobileProvider>
    </BrowserRouter>
  </React.StrictMode>
);
