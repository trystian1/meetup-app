import React from 'react';

class TextInputComponent extends React.Component {
  componentDidMount() {

    if (this.props.autofocus) {
      this.refs[this.props.name].focus();
    }

  }

  render() {

    var wrapperClass = 'form-group',
        iconClass;

    if (this.props.error && this.props.error.length > 0) {
      wrapperClass += ' ' + 'has-error';
    }

    if (this.props.size) {
      wrapperClass += ' ' + this.props.size
    }

    if (this.props.required) {
      wrapperClass += ' required';
    }

    iconClass = this.props.icon ? this.props.icon + ' icon-block-small' : ' ';

    return(
      <div className={wrapperClass}>
        <span className={iconClass}></span>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <div className="field">
          <input type={this.props.type ? this.props.type : 'text'}
            id={this.props.name}
            name={this.props.name}
            className="text-input"
            placeholder={this.props.placeholder}
            ref={this.props.name}
            value={this.props.value}
            onChange={this.props.onChange} />
        </div>
        <div className="input-error">{this.props.error}</div>
      </div>
    )
  }
}


TextInputComponent.propTypes = {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    type: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    value: React.PropTypes.string,
    error: React.PropTypes.string,
    autofocus: React.PropTypes.string
}

export default TextInputComponent;
