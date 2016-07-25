import * as types from './actionTypes';
import _ from 'lodash'

export function loadMeetupsSucces(meetupData)  {
  return {type: types.LOAD_MEETUP_SUCCES, meetupData};
}

export function loadMeetups() {
  return function(dispatch) {
    return firebase.database().ref('/meetup-event').on('value', function(meetupData) {

      var meetups = [];

      _.each(meetupData.val(), function(meetup) {
        meetups.push(meetup);
      });
      meetups.reverse();
      dispatch(loadMeetupsSucces(meetups));

    });
  }
}
