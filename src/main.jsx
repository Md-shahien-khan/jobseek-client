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
import SignIn from './assets/Component/SignIn.jsx';
import JobDetails from './assets/Component/JobDetails.jsx';
import PrivateRoute from './assets/Component/PrivateRoute.jsx';
// import Dashboard from './assets/Component/Dashboard.jsx';
import CreateJobForm from './assets/Component/CreateJobForm.jsx';
import JobApply from './assets/Component/JobApply.jsx';

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
      path : '/jobs/:id',
      element : <PrivateRoute><JobDetails></JobDetails></PrivateRoute>,
      loader : ({params}) => fetch(`http://localhost:3000/jobs/${params.id}`)
    },
    {
      path : '/register',
      element : <Register></Register>
    },
    {
      path : '/signIn',
      element : <SignIn></SignIn>
    },
    {
      path : '/createJob',
      element : <CreateJobForm></CreateJobForm>
    },
    {
      path : '/jobApply/:id',
      element : <PrivateRoute><JobApply></JobApply></PrivateRoute>
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
