import React from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);
    console.log('renderHeader', props, context)
  }

  render() {
    console.log(this.props);
    return(
      <div>
        <div className="application-name"><h1 className="application-name-text">Meetey</h1></div>
          <aside className="primary-aside">
            <ul>
              <li><Link to="meet-up-form" activeClassName="active">Create meet up</Link></li>
              <li><Link to="meet-ups" activeClassName="active">Browse meet ups</Link></li>
              <li><Link to="meet-ups-own" activeClassName="active">My meet ups</Link></li>
            </ul>
          </aside>
        <div className="user-profile"><div className="user-profile-icon"><span className="icon-user"></span></div>
        <div className="username">{this.props.userdata.displayName}</div></div>
      </div>
    )
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


export default connect(mapStateToProps)(Header);
