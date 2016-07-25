import * as types from './actionTypes';

export function saveMeetupSucces(meetupData)  {
  return {type: types.SAVE_MEETUP_SUCCES, meetupData};
}

export function saveMeetup(meetupData) {
  return function(dispatch) {

    var id = new Date().valueOf();

    return firebase.database().ref('meetup-event/' + id).set({
      id: id,
      userData: {
        userUid: firebase.auth().currentUser.uid,
        createdBy: firebase.auth().currentUser.displayName,
      },
      meetupData: meetupData
    }).then(value => {
        saveMeetupSucces(meetupData)
    });
  }

}
