import React from 'react';
import TextInputComponent from '../ui-components/textInputComponent.jsx';
import TextAreaInputComponent from '../ui-components/textAreaInputComponent.jsx';
import MapComponent from '../ui-components/mapComponent.jsx';
import SearchInputComponent from '../ui-components/searchInputComponent.jsx';
import PlacesAutoSuggestComponent from '../ui-components/placesAutoSuggestComponent.jsx';
import GeneralListComponent from '../ui-components/generalListComponent.jsx';
import DateInputComponent from '../ui-components/dateInputComponent.jsx';
import ProgressBarComponent from '../ui-components/progressBarComponent.jsx';

var  MeetupForm = React.createClass({

  render() {

    var buttonClass = 'button ' + this.props.isValid,
        autofocus = 'true',
        eventOptions = [
        {
          key: 1,
          value: 'Birthday'
        },
        {
          key: 2,
          value: 'Wedding'
        },
        {
          key: 3,
          value: 'Conference Talk'
        },
        {
          key: 4,
          value: 'Graduation Party'
        }
      ];

    return(
      <div>
        <form>
          <TextInputComponent name="name" autofocus="true" label="Event name: " required="true" type="text" error={this.props.errors.name} placeholder="Fill in the name of your event" value={this.props.eventData.name} onChange={this.props.onChange}/>
          <PlacesAutoSuggestComponent icon="icon-place" name="place" required="true" label="Location: " setPlace={this.props.setPlace} locationSearch={true} placeholder="The street or town where the event will be" dataListId="mapList"  error={this.props.errors.place} value={this.props.eventData.place} onChange={this.props.onChange} />
          <MapComponent place={this.props.place}/>
          <DateInputComponent icon="icon-calendar" name="startDate"  required="true" label="Start date: " error={this.props.errors.startDate} placeholder="When does your event start" value={this.props.eventData.startDate} onChange={this.props.onChange}/>
          <DateInputComponent icon="icon-calendar" name="endDate" required="true" label="End date: " placeholder="When does your event end" error={this.props.errors.endDate} value={this.props.eventData.endDate} onChange={this.props.onChange}/>
          <SearchInputComponent name="eventType" required="true" label="Type of Event: " placeholder="What type is the type of your event" dataListId="eventList" searchOptions={eventOptions} error={this.props.errors.eventType} value={this.props.eventData.eventType} onChange={this.props.onChange} />
          <TextInputComponent name="host" required="true" label="Host: " type="text" error={this.props.errors.host} placeholder="Who will be the host" value={this.props.eventData.host} onChange={this.props.onChange}/>
          <TextInputComponent name="guest" required="true" label="Add guests:" className="inline-input" placeholder="Guest name" size="medium" value={this.props.eventData.guest} error={this.props.errors.guest} onChange={this.props.onChange}/>
          <div type="submit" value="Add guest" className="button primary small" onClick={this.props.addGuest}><span className="icon-plus"></span> Add</div>
          <GeneralListComponent label="Guests:" icon="icon-user" dataList={this.props.eventData.guests} />
          <TextAreaInputComponent name="message" label="A message for your guests:" type="textarea" className="inline-input" placeholder="Describe how awesome your event is going to be" onChange={this.props.onChange} value={this.props.eventData.message}/>
        </form>
        <div className="button-bar">
          <button type="submit" value="Save" className={buttonClass} onClick={this.props.onSave}> <span className="icon-checkmark3"> </span>Create event</button>
          <ProgressBarComponent progress={this.props.progress} />
        </div>

    </div>
    )
  },

});

export default MeetupForm;
