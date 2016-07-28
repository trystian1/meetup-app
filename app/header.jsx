import React from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import * as userLoginActions from './actions/userLoginAction'

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {

    var userName = this.props.userdata.displayName
      ? this.props.userdata.displayName
      : this.props.userdata.email;

    return(
      <div>
        <div className="application-name"><h1 className="application-name-text">Meetey</h1></div>
          <aside className="primary-aside">
            <ul>
              <li><Link to="meet-up-form" activeClassName="active">Create meet up</Link></li>
              <li><Link to="meet-ups" activeClassName="active">Browse meet ups</Link></li>
            </ul>
          </aside>
        <div className="user-profile"><div className="user-profile-icon"><span className="icon-user"></span></div>
        <div className="username">{userName}</div> <div className="button logout-button" onClick={this.logout.bind(this)}> Logout </div> </div>
      </div>
    )
  }

  logout() {
    this.props.actions.logout();
  }

}

Header.PropTypes = {
  dispatch: React.PropTypes.func.isRequired,
  userdata: React.PropTypes.object.isRequired
}


function mapStateToProps(state, ownProps) {
  return {
    userdata: state.user.userdata
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userLoginActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
