import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AuthGuard from './auth/AuthGuard';
import { authRoles } from './auth/authRoles';
import Loadable from './components/Loadable';
import MatxLayout from './components/MatxLayout/MatxLayout';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';
import moduleRoute from './modules/ModuleRoute';
import empRoute from './components/AllEmployees/EmpRoute';
import applicationAdminRoute from './components/ApplicationAdmin/ApplicationAdminRoutes';
import TaskRoute from './components/TaskSheet/TaskRoute';
// import DashBoard from './views/dashboard/Dashboard';

// session pages
const NotFound = Loadable(lazy(() => import('app/views/sessions/NotFound')));
const JwtLogin = Loadable(lazy(() => import('app/views/sessions/JwtLogin')));
const JwtRegister = Loadable(lazy(() => import('app/views/sessions/JwtRegister')));
const ForgotPassword = Loadable(lazy(() => import('app/views/sessions/ForgotPassword')));

// echart page
const AppEchart = Loadable(lazy(() => import('app/views/charts/echarts/AppEchart')));

// dashboard page
// const Analytics = Loadable(lazy(() => import('app/views/dashboard/Analytics')));
const DashBoard = Loadable(lazy(() => import('app/views/dashboard/Dashboard')));

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...materialRoutes,
      ...empRoute,
      ...moduleRoute,
      ...applicationAdminRoute,
      ...TaskRoute,
      // dashboard route
      {
        path: '/dashboard/default',
        // element: <Analytics />,
        element: <DashBoard />, // added this line and created Dashboard component
        auth: authRoles.admin
      },

      // e-chart rooute
      {
        path: '/charts/echarts',
        element: <AppEchart />,
        auth: authRoles.editor
      }
    ]
  },

  // session pages route
  { path: '/session/404', element: <NotFound /> },
  { path: '/session/signin', element: <JwtLogin /> },
  { path: '/session/signup', element: <JwtRegister /> },
  { path: '/session/forgot-password', element: <ForgotPassword /> },

  // { path: '/', element: <Navigate to="dashboard/default" /> },
  { path: '/', element: <Navigate to="/dashboard/default" /> },
  { path: '*', element: <NotFound /> }
];

export default routes;
