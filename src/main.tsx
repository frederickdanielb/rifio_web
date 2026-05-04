import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { store } from './app/store';
import { router } from './app/router';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID ?? ''}>
      <Provider store={store}>
        <RouterProvider router={router} />
        <Toaster theme="dark" richColors position="top-right" />
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
