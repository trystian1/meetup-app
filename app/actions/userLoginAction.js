import * as types from './actionTypes';

export function loginSucces(user)  {
  return {type: types.LOGIN_USER_SUCCESS, user};
}

export function setLoginErrors(error) {
  return {type: types.LOGIN_USER_ERROR, error};
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

        })
        .catch(error => {
          dispatch(setLoginErrors(error));
        })
  }

}

export function registerAndLogin(email, password, username) {
  return function(dispatch) {

    return firebaseApp.auth()
          .createUserWithEmailAndPassword(email, password)
            .catch( error => {

              dispatch(setLoginErrors(error));

            }).then(data => {
              firebaseApp.auth()
                .signInWithEmailAndPassword(email, password)
                  .catch(error => {
                    dispatch(setLoginErrors(error));
              }).then(() => {

                var user = firebaseApp.auth().currentUser;

                user.updateProfile({
                  displayName: username,

                }).then(() => {

                  var userObject = {
                    displayName: data.displayName,
                    email: data.email
                  }

                  dispatch(loginSucces(userObject));

             }, error  => {

               dispatch(setLoginErrors(error));

             });

           });

         });

       }
     }
