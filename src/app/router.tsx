import { createBrowserRouter } from 'react-router-dom';
import { LoginScreen } from '../features/auth/screens/LoginScreen';
import { DashboardScreen } from '../features/rifas/screens/DashboardScreen';
import { ProtectedRoute } from '../shared/components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginScreen />,
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <DashboardScreen />,
      },
    ],
  },
]);
