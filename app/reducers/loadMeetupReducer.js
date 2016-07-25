import * as types from '../actions/actionTypes';

export default function loadMeetupReducer(state = {}, action) {
  switch(action.type) {
    case types.LOAD_MEETUP_SUCCES:
      return Object.assign({}, state, {
        meetups: action.meetupData
      })
    default:
      return state;
  }
}
