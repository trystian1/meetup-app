import React from 'react';
import MeetupForm from './meetupForm.jsx';
import _ from 'lodash';

class MeetupComponent extends React.Component {

    constructor(props, context) {
      super(props, context);
      this.state = {
        eventData: {
          name: '',
          place: '',
          date: ''
        },
        errors: {}
      }
    }

    setEventState(event) {

     var field = event.target.name,
         value = event.target.value;

     this.state.eventData[field] = value;
     this.validateInput(field, value);
     return this.setState({eventData: this.state.eventData});

   }

   validateInput(field, value) {

     var errors = this.state.errors;

     switch(field) {

       case 'name':
          if (value.length < 3) {
            errors.name = 'First name should be atleast 3 characters';
          } else {
            errors.name = null;
          }
        break;

        case 'place':
           if (value.length < 3) {
             errors.name = 'The place should be atleast 3 characters';
           } else {
             errors.name = null;
           }
         break;

     }

     this.setState({errors: errors});

   }

   isValidForm() {
     var isValid = true;

     _.each(this.state.errors, function(error) {

       if (error) {
         isValid = false;
       }

     });

     return isValid;
   }

   saveEvent(event) {

     event.preventDefault();
     event.stopPropagation();

     if (!this.isValidForm()) {
       return;
     }

     localStorage.setItem('event', JSON.stringify(this.state.eventData));

   }

    render() {
      return(
            <div>
              <MeetupForm
                eventData={this.state.eventData}
                onChange={this.setEventState.bind(this)}
                onSave={this.saveEvent.bind(this)}
                errors={this.state.errors} />
            </div>
          )
    }
}

export default MeetupComponent;
