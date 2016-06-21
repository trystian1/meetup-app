import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);
    console.log('renderHeader', props, context)
  }

  render() {
    return(
      <div>
        <div className="application-name"><h1>Meetup application</h1></div>
          <aside className="primary-aside">
            <ul>
              <li><Link to="login" activeClassName="active">To nothing</Link></li>
              <li><Link to="meet-up" activeClassName="active">To meetup form</Link></li>
              <li><Link to="asdfasfd" activeClassName="active">faulty</Link></li>
            </ul>
          </aside>
        <div class="user-profile"></div>
      </div>
    )
  }
}


export default Header;
