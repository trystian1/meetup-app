import React from 'react';
import GeneralListComponent from '../ui-components/generalListComponent.jsx'

class MeetupItem extends React.Component {

    render() {

      var meetupEventType = this.props.meetupItem.eventType ? this.props.meetupItem.eventType : '';

      return(
          <div className="meetup-item">
            <div className="meetup-title">
              <h1>{this.props.meetupItem.name}</h1>
              <div className="creator"><span className="icon-user"></span> {this.props.userData.createdBy} </div>
            </div>
            <div className={meetupEventType.toLowerCase() + ' meetup-row meetup-type'}><h3>{this.props.meetupItem.eventType}</h3></div>

            <div className="meetup-row meetup-place"><h2><span className="icon-block icon-location"></span>{this.props.meetupItem.place}</h2></div>
            <div className="meetup-row meetup-date"><h2> <span className="icon-block icon-calendar"></span>{this.props.meetupItem.startDate} - {this.props.meetupItem.startDate} </h2></div>
            <div className="meetup-row meetup-host"><h2> <span className="icon-block icon-user-tie"></span>{this.props.meetupItem.host}</h2></div>
            <div className="meetup-row meetup-host"><h2><span className="icon-block icon-group"></span><span className="label">Guest list:</span></h2></div>
            <div className="meetup-sub-row">
                <GeneralListComponent label="Guests:" icon="icon-user" dataList={this.props.meetupItem.guests} />
            </div>
            <h2> <span className="icon-block icon-list3"></span><span className="label">Information:</span> </h2>
            <div className="meetup-row meetup-description"> <span className="icon-block"></span> {this.props.meetupItem.message}</div>
          </div>
      )
    }
}

export default MeetupItem;
