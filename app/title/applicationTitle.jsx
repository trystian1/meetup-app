import React from 'react';

class ApplicationTitle extends React.Component {
  constructor(props, context) {
    super(props, context);
}

  render() {
    return(
        <div className="application-title-wrap">
          <h1 className="module-title">Meetey</h1>
          <h2 className="module-sub-title">Create Events to meet people</h2>
        </div>
  )
  }
}

export default ApplicationTitle;
