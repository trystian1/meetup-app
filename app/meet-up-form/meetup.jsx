import React from 'react';
import MeetupForm from './meetupForm.jsx';
import ModuleTitle from '../title/moduleTitle.jsx';
import * as saveMeetupAction from '../actions/saveMeetupAction'
import {connect} from 'react-redux';
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import _ from 'lodash';
import moment from 'moment'

class MeetupComponent extends React.Component {

    constructor(props, context) {
      super(props, context);
      this.state = {
        eventData: {
          name: '',
          place: '',
          host: '',
          startDate: moment.utc(new Date()).local().format('YYYY-MM-DDThh:mm'),
          endDate: '',
          eventType: '',
          guest: '',
          guests: [],
          message: ''
        },
        isValid: 'invalid',
        errors: {},
        progress: {
          completed: '0%'
        },
        place: []
      }
    }

    setEventState(event) {

     var field = event.target.name,
         value = event.target.value,
         errors;

     this.state.eventData[field] = value;
     errors = this.validateInput(field, value);

     this.state.errors[field] = errors[field];

     this.updateProgress();

     this.state.isValid = this.isValidForm() ? 'valid' : 'invalid'

     return this.setState({eventData: this.state.eventData});

   }

   validateInput(field, value) {

     var errors = {},
         yesterday = moment().subtract(1, 'days');

     switch(field) {

       case 'name':
          if (!value) {
            errors.name = 'Event name is required';
          } else if (value.length < 3) {
            errors.name = 'Event name should be atleast 3 characters';
          } else {
            errors.name = null;
          }
        break;

        case 'place':
          if (!value) {
            errors.place = 'Location is required';
          } else {
            errors.place = null;
          }
         break;

         case 'startDate':
           if (!value) {
             errors.startDate = 'A start date is required';
           } else if (this.state.endDate
             && moment(value).isAfter(moment(this.state.eventData.endDate))) {
             errors.startDate = 'Start date should be before end date';
           } else if (moment(value).isBefore(yesterday)) {
             errors.startDate = 'Start date cannot be in the past';
           } else if (moment(value).isSame(moment(this.state.eventData.endDate))) {
              errors.startDate = 'Start date cannot be in the same as the end date';
           } else {
             errors.startDate = null;
           }
          break;

          case 'endDate':
            if (!value) {
              errors.endDate = 'A end date is required';
            } else if (moment(value).isBefore(moment(this.state.eventData.startDate))) {
              errors.endDate = 'End date should be after start date';
            } else if (moment(value).isSame(moment(this.state.eventData.startDate))) {
              errors.endDate = 'End date can\'t be same as the start date';
            } else {
              errors.endDate = null;
            }
           break;

         case 'eventType':
           if (!value) {
             errors.eventType = 'A event type is required';
           } else {
             errors.eventType = null;
           }
          break;


         case 'host':
           if (!value) {
             errors.host = 'Your event needs to have a host'
           } else {
             errors.host = null
           }
           break;

        case 'guest':
          if (!this.state.eventData.guests.length) {
            errors.guest = 'Atleast one guest is required'
          } else {
            errors.guest = null
          }
          break;
     }

     //this.setState({errors: errors});
     return errors;

   }

   addGuest() {

     var guest = this.state.eventData.guest,
         guests =  this.state.eventData.guests,
         guestItem;

    guestItem = {
      name: guest,
      key: new Date().valueOf()
    }
    guests.push(guestItem);

    this.state.errors.guest = null;

    this.setState({
      guests: guests,
      guest: null
    });

    if (this.isValidForm()) {
      this.state.isValid = 'valid';
    }

   }

   setPlace(data) {

      this.setState({
        place: data
      });

   }

   updateProgress() {

     var _this = this,
         completed = 0;

     _.each(this.state.eventData, function(value, key) {
       if (value && !_this.state.errors[key]) {
         completed += 100 / Object.keys(_this.state.eventData).length
       }
     });

     this.setState({
       progress: {
         completed: completed + '%'
       }
     })
   }

   isValidForm() {

     var isValid = true;

     _.each(this.getFormErrors(), function(errorObject, value) {

       if (errorObject.error) {
         isValid = false;
       }

     });

     return isValid;

   }

   getFormErrors() {

     var _this = this,
        errors = [];

     _.each(this.state.eventData, function(value, key) {
       errors.push({error: _this.validateInput(key, value)[key]});
     });

     return errors;

   }

   saveEvent(event) {

     event.preventDefault();
     event.stopPropagation();

     this.formatDates();
     if (!this.isValidForm()) {
       return;
     }

     this.props.actions.saveMeetup(this.state.eventData).then(() => {
       browserHistory.push('/meet-ups');
     });

   }

   formatDates() {
     this.state.eventData['startDate'] =
      moment(this.state.eventData['startDate']).format('DD-MM-YYYY h:mm');
     this.state.eventData['endDate'] =
      moment(this.state.eventData['endDate']).format('DD-MM-YYYY h:mm');
   }

    render() {

      return(
            <div className="content-wrapper">
              <ModuleTitle title={this.props.route.title} />
              <MeetupForm
                eventData={this.state.eventData}
                isValid={this.state.isValid}
                onChange={this.setEventState.bind(this)}
                onSave={this.saveEvent.bind(this)}
                errors={this.state.errors}
                progress={this.state.progress}
                place={this.state.place}
                setPlace={this.setPlace.bind(this)}
                addGuest={this.addGuest.bind(this)}
              />
            </div>
          )
    }
}


MeetupComponent.contextTypes = {
  router: React.PropTypes.object.isRequired
};

MeetupComponent.propTypes = {
  actions: React.PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {

  return {
    eventData: state.eventData,
  };

}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(saveMeetupAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetupComponent);
