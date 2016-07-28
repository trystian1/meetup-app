import * as types from './actionTypes';
import {browserHistory} from 'react-router';

export function loginSucces(user)  {
  return {type: types.LOGIN_USER_SUCCESS, user};
}

export function logoutSucces()  {
  return {type: types.LOG_OUT};
}

export function setLoginErrors(error) {
  return {type: types.LOGIN_USER_ERROR, error};
}

export function onResetErrors() {
  return {type: types.RESET_ERRORS};
}

export function loginUser(username, password) {

  return function(dispatch) {
    return firebaseApp.auth()
       .signInWithEmailAndPassword(username, password)
        .then(user => {

          var userObject = {
            displayName: user.displayName,
            email: user.email
          }

          dispatch(loginSucces(userObject));
          browserHistory.push('/meet-up-form');

        })
        .catch(error => {
          dispatch(setLoginErrors(error));
        })
  }

}

export function logout() {
  return function(dispatch) {
    return firebaseApp.auth().signOut().then(() => {
      dispatch(logoutSucces());
      browserHistory.push('/login');
    });
  }
}


export function registerAndLogin(email, password, username) {

  return function(dispatch) {
    return firebaseApp.auth().createUserWithEmailAndPassword(email, password)
            .then(data => {

              var user = firebaseApp.auth().currentUser;

              user.updateProfile({
                displayName: username,

              }).then(() => {

                var userObject = {
                  displayName: data.displayName,
                  email: data.email
                }

                dispatch(loginSucces(userObject));
                browserHistory.push('/meet-up-form');

              }).catch(error => {
               dispatch(setLoginErrors(error));
             });

         }).catch( error => {
           dispatch(setLoginErrors(error));
         });

       }
     }

     export function resetErrors() {
       return function(dispatch) {
         dispatch(onResetErrors());
        }
      }
