import React from 'react';
import MeetupList from './meetupList.jsx';
import ModuleTitle from '../title/moduleTitle.jsx';
import * as loadMeetupsAction from '../actions/loadMeetupsAction'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import _ from 'lodash';

class MeetupsPage extends React.Component {

    constructor(props, context) {
      super(props, context);
      this.state = {
        meetups: []
      }
    }

    componentDidMount() {
      this.props.actions.loadMeetups();
    }

    render() {

      var meetups = this.props.meetups ? this.props.meetups : [];

      return(
            <div className="content-wrapper">
              <ModuleTitle title={this.props.route.title} />
              <MeetupList meetups={meetups} />
            </div>
          )
    }
}


MeetupsPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

MeetupsPage.propTypes = {
  actions: React.PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    meetups: state.meetups.meetups,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loadMeetupsAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetupsPage);
