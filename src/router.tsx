/**
 * @file Router config
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Footer from './components';
import Login from './components/login/Login';
import Profile from './components/profile/Profile';
import Thread from './components/home/thread/Detail';
import Timeline from './components/home/Timeline';

import { AuthContext, AuthenticatedUserType } from './context';
import { authentication } from './configs/firebase';

function Router() {
  const persistedCurrentUser = localStorage.getItem('CURRENT_USER');
  const initialCurrentUser = persistedCurrentUser
    ? JSON.parse(persistedCurrentUser)
    : null;

  const [
    authenticatedUser,
    setAuthenticatedUser
  ] = useState<AuthenticatedUserType | null>(initialCurrentUser);

  useEffect(() => {
    authentication.onAuthStateChanged(user => {
      if (user) {
        setAuthenticatedUser({
          uid: user.uid,
          displayName: user.displayName || '',
          email: user.email || '',
          photoURL: user.photoURL || ''
        });

        // persist
        localStorage.setItem(
          'CURRENT_USER',
          JSON.stringify(persistedCurrentUser)
        );
      } else {
        setAuthenticatedUser(null);
        localStorage.removeItem('CURRENT_USER');
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider value={authenticatedUser}>
      <BrowserRouter>
        <Switch>
          <Footer>
            <Route exact path='/login' component={Login} />
            <Route exact path='/' component={Timeline} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/thread/:id' component={Thread} />
          </Footer>
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default Router;
