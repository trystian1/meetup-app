import React from 'react';

class ModuleTitle extends React.Component {
  constructor(props, context) {
    super(props, context);
    console.log('module title', props, context);
}

  render() {
    return(
        <div>
            <h1 className="module-title">{this.props.title}</h1>
        </div>
  )
  }
}

export default ModuleTitle;
