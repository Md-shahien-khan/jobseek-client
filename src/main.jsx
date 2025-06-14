import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayOut from './assets/Component/MainLayOut.jsx';
import Home from './assets/Component/Home.jsx';
import Register from './assets/Component/Register.jsx';
import AuthProvider from './context/AuthContext/AuthProvider.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut></MainLayOut>,
    errorElement : <h2>Route not found</h2>,
    children : [
    {
      path : '/',
      element : <Home></Home>
    },
    {
      path : '/register',
      element : <Register></Register>
    }
  ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
