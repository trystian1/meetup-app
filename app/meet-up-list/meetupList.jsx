import React from 'react';
import MeetupItem from './MeetupItem'

class MeetupList extends React.Component {

    render() {

      return(
            <div className="meet-up-list">
              {meetups.map(meetup =?
                <MeetupItem key={meetup.id} meetupItem={meetup.meetupData} userId={meetup.userUid} />
              )}
            </div>
          )
    }
}

export default MeetupList;
