import { lazy } from 'react';
import { Route, Navigate } from 'react-router-dom';

// Lazy load components
const Home = lazy(() => import('./components/Home'));
const Admin = lazy(() => import('./components/Admin'));
const Collection = lazy(() => import('./components/Collection'));

export const routes = [
  <Route key="home" path="/" element={<Home />} />,
  <Route key="admin" path="/admin" element={<Admin />} />,
  <Route key="ladies" path="/ladies/:id" element={<Collection />} />,
  <Route 
    key="redirect" 
    path="/collection/:id" 
    element={
      <Navigate 
        to={location => `/ladies/${location.pathname.split('/').pop()}`} 
        replace 
      />
    } 
  />
]; 