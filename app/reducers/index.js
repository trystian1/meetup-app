import {combineReducers} from 'redux';
import user from './userLoginReducer';
import meetups from './loadMeetupReducer';

const rootReducer = combineReducers({
  user,
  meetups
});

export default rootReducer;
