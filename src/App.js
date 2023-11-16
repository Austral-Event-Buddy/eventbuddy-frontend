import { BrowserRouter as Router, Navigate, Route, useLocation } from 'react-router-dom';

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
import { UserContext } from './utils/user';
import { getMe } from './api/api';
import ResetPasswordEmail from "./pages/resetPassword/resetPasswordEmail";
import ResetPassword from "./pages/resetPassword/resetPassword";
import { useEffect, useState } from 'react';

function App() {

   const [user, setUser] = useState(undefined);

  useEffect(() => {
    if (!user) {
      getMe().then(user => {
        setUser(user);
      }).catch(err => {})
    }
  }, [])

  return (
   <UserContext.Provider value={{...user, setUser}} >
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
   </UserContext.Provider>
  );
}

export default App;
