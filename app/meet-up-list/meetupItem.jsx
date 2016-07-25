import React from 'react';

class MeetupItem extends React.Component {

    render() {

      return(
          <div class="meetup-item">
            <div class="meetup-title">{this.props.meetupItem.name}</div>
          </div>
          )
    }
}

export default MeetupItem;
