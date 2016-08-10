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
            message: action.error.message,
            username: 'Failed please check credentials',
            password: 'Failed please check credentials',
            email: 'Failed please check credentials'
          }
        },
      })

      case types.RESET_ERRORS:
        return Object.assign({}, state, {
          userdata: {
            displayName: state.userdata.displayName,
            error: {
              message: null,
              username: null,
              password: null,
              email: null
            }
          },
        })

        case types.LOG_OUT:
          return Object.assign({}, state, {
            userdata: {
              displayName: null,
              email: null,
            }
          })

    default:
      return state;
  }
}
