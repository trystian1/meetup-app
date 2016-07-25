import React from 'react';

class HeaderMessage extends React.Component {
  constructor(props, context) {
    super(props, context);
}

  render() {
    return(
      <div className="headerMessage">
        <div><h1>Please log in or register to continue</h1></div>
      </div>
    )
  }
}

export default HeaderMessage;
