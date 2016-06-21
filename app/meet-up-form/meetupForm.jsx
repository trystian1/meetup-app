import React from 'react';
import TextInputComponent from '../ui-components/textInputComponent.jsx'
import DateInputComponent from '../ui-components/dateInputComponent.jsx'

var  MeetupForm = React.createClass({

  render() {

    return(
      <div>
        <h1> Create your event </h1>
        <h2> General information </h2>
        <form>
          <TextInputComponent name="name" label="Name: " error={this.props.errors.name} placeholder="Fill in the name of your event" value={this.props.eventData.name} onChange={this.props.onChange}/>
          <TextInputComponent name="place" label="Place: " error={this.props.errors.place} placeholder="Where is the event" value={this.props.eventData.place} onChange={this.props.onChange}/>
          <DateInputComponent name="date" label="Date: " placeholder="Date of your event" value={this.props.eventData.date} onChange={this.props.onChange}/>
          <div type="submit" value="Save" className="button" onClick={this.props.onSave}>Create event</div>
        </form>
      </div>
    )
  }
});

export default MeetupForm;
