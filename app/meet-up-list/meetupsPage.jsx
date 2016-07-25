import React from 'react';
import MeetupForm from './meetupList.jsx';
import ModuleTitle from '../title/moduleTitle.jsx';
import * as saveMeetupAction from '../actions/saveMeetupAction'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import _ from 'lodash';

class MeetupsPage extends React.Component {

    constructor(props, context) {
      super(props, context);
      this.state = {
        meetups: [
          {name: 'test1'},
          {name: 'test2'}
        ]
      },
        errors: {}
      }
    }

    render() {

      return(
            <div className="content-wrapper">
              <ModuleTitle title={this.props.route.title} />
              <MeetupList meetups={this.state.meetups} />
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
    meetupList: state.meetupList,
  };

}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(saveMeetupAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetupsPage);
