import * as types from '../actions/actionTypes';

export default function loginReducer(state = {}, action) {

  switch(action.type) {

    case types.LOGIN_USER_SUCCESS:

      return Object.assign({}, state, {
          userdata: {
            displayName: action.user.displayName,
            email: action.user.email,
            error: null
          }
      })
    case types.LOGIN_USER_ERROR:
      return Object.assign({}, state, {
        userdata: {
          displayName: null,
          email: null,
          error: {
            username: action.error.message,
            password: action.error.message
          }
        },
      })

    default:
      return state;
  }
}
