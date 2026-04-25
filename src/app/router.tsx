import { createBrowserRouter } from 'react-router-dom';
import { LoginScreen } from '../features/auth/screens/LoginScreen';
import { ClientesScreen } from '../features/clientes/screens/ClientesScreen';
import { DashboardScreen } from '../features/rifas/screens/DashboardScreen';
import { RifaDetailScreen } from '../features/rifas/screens/RifaDetailScreen';
import { RifasListScreen } from '../features/rifas/screens/RifasListScreen';
import { ProtectedRoute } from '../shared/components/ProtectedRoute';
import { DashboardLayout } from '../shared/components/layout/DashboardLayout';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginScreen />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardScreen />,
      },
      {
        path: 'rifas',
        element: <RifasListScreen />,
      },
      {
        path: 'rifas/:id',
        element: <RifaDetailScreen />,
      },
      {
        path: 'clientes',
        element: <ClientesScreen />,
      },
    ],
  },
]);
