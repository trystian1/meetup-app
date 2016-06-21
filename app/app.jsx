import React from 'react';
import Header from './header.jsx'

class App extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      user: {
        name: '',
      },
    }
    this.setUser();
  }

  setUser() {
    var user = firebaseApp.auth().currentUser;


    if (user) {
      this.setState({user: {
          name: user.displayName
        }
      });
    }
    
    console.log(this.state);
  }

  render() {
    console.log('render');
    return(

      <div className="app">
      <div className="header-wrap">
        <Header user={this.state.user}/>
      </div>
      <main className="event-wrapper">
        {this.props.children}
      </main>
    </div>
    );
  }
}

export default App;
