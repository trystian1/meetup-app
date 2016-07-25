import React from 'react';
import {Route, browserHistory, IndexRoute} from 'react-router';

// Layouts
import App from './app.jsx';

// Pages
import Login from './login/login.jsx';
import Register from './register/register.jsx';
import MeetupComponent from './meet-up-form/meetup.jsx';
import MeetupsPage from './meet-ups/meetupsPage.jsx';
import NotFoundPage from './404/404.jsx'

window.onbeforeunload = function() {
  firebaseApp.auth().signOut();
}

function isAutenticated(nextState, replace) {
  var user = firebaseApp.auth().currentUser;

  if (!user) {
    replace({
      pathname: '/login',
      state: {
        nextPathname: nextState.location.pathname
      }
    });
  }
}

export default (
  <Route component={App}>
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register}/>
      <Route path="/meet-up-form" title="Organize your own Meet up" component={MeetupComponent} onEnter={isAutenticated}/>
      <Route path="/meet-ups" title="Meet ups" component={MeetupsPage} onEnter={isAutenticated}/>
      <Route path="*" component={NotFoundPage} onEnter={isAutenticated}/>
    </Route>
);
