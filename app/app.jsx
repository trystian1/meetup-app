import React from 'react';
import Header from './header.jsx';
import HeaderMessage from './headerMessages/headerMessage.jsx';

import {connect} from 'react-redux';

class App extends React.Component {

  constructor(props, context) {
    super(props, context);
 }

 render() {
   var headerComponent,
      className,
      titleComponent;

    if (this.props.userdata && this.props.userdata.email) {
      headerComponent = <Header/>;
      className = 'header-wrap default-header';
    } else {
      headerComponent = <HeaderMessage />
      className = 'header-wrap message-header';
    }

    return(
      <div className="app">
      <div className={className}>
        {headerComponent}
      </div>
      <main className="main">
        {this.props.children}
      </main>

    </div>
    );
  }
}

App.PropTypes = {
  dispatch: React.PropTypes.func.isRequired,
  userdata: React.PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    userdata: state.user.userdata,
    errors: state.user.error
  };
}


export default connect(mapStateToProps)(App);
