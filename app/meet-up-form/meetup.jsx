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
        errors: {}
      }
    }

    setEventState(event) {

     var field = event.target.name,
         value = event.target.value;

     this.state.eventData[field] = value;

     this.validateFormData();

     if (this.isValidForm()) {
       this.state.isValid = 'valid';
     }

     return this.setState({eventData: this.state.eventData});

   }

   validateInput(field, value) {

     var errors = this.state.errors;

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
           } else if (moment(value).isAfter(moment(this.state.endDate))) {
             errors.startDate = 'Start date should be before end date';
           } else {
             errors.startDate = null;
           }
          break;

          case 'endDate':
            if (!value) {
              errors.endDate = 'A end date is required';
            } else if (moment(value).isBefore(moment(this.state.startDate))) {
              errors.endDate = 'End date should be before start date';
            } else {
              errors.endDate = null;
            }
           break;

     }

     this.setState({errors: errors});

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
    this.setState({
      guests: guests,
      guest: null
    })

   }

   isValidForm() {

     var isValid = true,
         fields = []

     _.each(this.state.errors, function(error) {

       if (error) {
         isValid = false;
       }

     });

     return isValid;
   }

   validateFormData() {
     var _this = this;

     _.each(this.state.eventData, function(value, key) {
       _this.validateInput(key, value);
     });

   }

   saveEvent(event) {

     event.preventDefault();
     event.stopPropagation();

     this.validateFormData();
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
