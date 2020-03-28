/**
 * @file Router config
 */

import React from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';

import Home from './components/home';
import Footer from './components';
import Login from './components/login';
import Register from './components/register';
import Profile from './components/profile';
import Timeline from './components/home/Timeline';

class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Footer>
            <Home>
              <Route exact path='/' component={Timeline} />
              {/* <Route exact path='/'>
                  <Redirect to='/register' />
                </Route> */}
              <Route exact path='/profile' component={Profile} />
              <Route exact path='/profile/:id' component={Profile} />
            </Home>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
          </Footer>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
