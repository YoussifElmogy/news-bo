import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import appRouter from './router.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    < >
      <AuthProvider>
          <RouterProvider router={appRouter} />
      </AuthProvider>
    </>
  </React.StrictMode>
);
