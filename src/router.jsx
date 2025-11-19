import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from './layout/Layout.jsx';
import News from './pages/News.jsx';
import AddNews from './pages/AddNews.jsx';
import EditNews from './pages/EditNews.jsx';
import ProtectedRoute from './context/ProtectedRoute';
import Login from './pages/Login.jsx';


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <News />
          </ProtectedRoute>
        ),
      },
      {
        path: 'news',
        element: (
          <ProtectedRoute>
            <News />
          </ProtectedRoute>
        ),
      },
      {
        path: 'news/add',
        element: (
          <ProtectedRoute>
            <AddNews />
          </ProtectedRoute>
        ),
      },
      {
        path: 'news/edit/:id',
        element: (
          <ProtectedRoute>
            <EditNews />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },

]);

export default appRouter;
