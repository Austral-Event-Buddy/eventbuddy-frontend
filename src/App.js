import { BrowserRouter as Router, Navigate, Route } from 'react-router-dom';

import RoutesWithNotFound from './guards/RoutesWithNotFound';
import AuthGuard from './guards/AuthGuard';
import { isAuthenticated } from './guards/isAuthenticated';

import { Routes } from './utils/routes';

import SideBarWrapper from './wrappers/SideBarWrapper';

import Login from './pages/login/login';
import Register from './pages/register/register';
import Home from "./pages/home/home";
import EventPage from './pages/event/event';

import 'mapbox-gl/dist/mapbox-gl.css';

import Profile from "./pages/profile/profile";
import { useEffect } from 'react';
import { getUser, saveUser } from './utils/user';
import { getMe } from './api/api';
import ResetPasswordEmail from "./pages/resetPassword/resetPasswordEmail";
import ResetPassword from "./pages/resetPassword/resetPassword";


function App() {

  useEffect(() => {
    if (!getUser()) {
      getMe().then(user => saveUser(user.id))
    }
  }, [])

  return (
    <Router>
      <RoutesWithNotFound>
        {
          // Public routes go here
          // Usage: <Route exact path={Routes.(path)} element={<Page />} />
        }
        <Route
          exact
          path={Routes.Login}
          element={
            isAuthenticated() ? <Navigate to={Routes.Home} replace /> : <Login />
          }
        />
        <Route 
          exact 
          path={Routes.Register} 
          element={
            isAuthenticated() ? <Navigate to={Routes.Home} replace /> : <Register />
          }
        />
        <Route
            exact
            path={Routes.EmailPasswordReset}
            element={
              isAuthenticated() ? <Navigate to={Routes.Home} replace /> : <ResetPasswordEmail />
            }
        />
        <Route
            exact
            path={Routes.PasswordReset}
            element={
              isAuthenticated() ? <Navigate to={Routes.Home} replace /> : <ResetPassword />
            }
        />

        <Route element={<AuthGuard />}>
          {
            // Private routes go here
            // Usage: <Route exact path={Routes.(path)} element={<Page />} />
          }
          <Route element={<SideBarWrapper/>}>
            {
              //Routes with SideBar goes here
            }
            <Route exact path={Routes.Home} element={<Home />} />
            <Route exact path={Routes.Event + '/:id'} element={<EventPage />} />
              <Route exact path={Routes.Profile} element={<Profile/>} />
          </Route>
          
          <Route element={<SideBarWrapper/>}>
            {
              //Routes with SideBar goes here
            }
            <Route exact path={Routes.Home} element={<Home />} />

          </Route>
          
        </Route>
      </RoutesWithNotFound>
    </Router>
  );
}

export default App;
