import React from 'react';
import MeetupItem from './meetupItem.jsx'

class MeetupList extends React.Component {

    render() {
      return(
            <div className="meet-up-list">
              {this.props.meetups.map(meetup =>
                <MeetupItem key={meetup.id} meetupItem={meetup.meetupData} userId={meetup.userUid} userData={meetup.userData}/>
              )}
            </div>
          )
    }
}

export default MeetupList;
