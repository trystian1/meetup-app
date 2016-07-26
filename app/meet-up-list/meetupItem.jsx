import React from 'react';

class MeetupItem extends React.Component {

    render() {

      return(
          <div className="meetup-item">
            <div className="meetup-title">{this.props.meetupItem.name}</div>
          </div>
          )
    }
}

export default MeetupItem;
