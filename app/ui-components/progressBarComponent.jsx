import React from 'react';

class ProgressBarComponent extends React.Component {
  render() {

    var completedStyle = {
          height: '100%',
          width: this.props.progress.completed
        };

    return(
      <div className='progress-bar'>
       <div style={completedStyle} className="completed"/>
      </div>
    )
  }
}


ProgressBarComponent.propTypes = {
    progress: React.PropTypes.object.isRequired,
}

export default ProgressBarComponent;
