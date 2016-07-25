import React from 'react';
import $ from 'jQuery';


class searchInputComponent extends React.Component {

  render() {

    var wrapperClass = 'form-group';

    if (this.props.error && this.props.error.length > 0) {
      wrapperClass += ' ' + 'has-error';
    }

    if (this.props.size) {
      wrapperClass += ' ' + this.props.size
    }

    if (this.props.required) {
      wrapperClass += ' required';
    }

    return(
      <div className={wrapperClass}>
        <div class="field">
          <label htmlFor={this.props.name}>{this.props.label}
            <input type='input' list={this.props.dataListId}
              name={this.props.name}
              className="text-input"
              placeholder={this.props.placeholder}
              ref={this.props.name}
              value={this.props.value}
              onChange={this.props.onChange}
              />
          </label>
          <datalist id={this.props.dataListId}>
              {this.props.searchOptions.map(searchOption =>
                <option key={searchOption.key} value={searchOption.value}/>
              )}
          </datalist>
        </div>
        <div className="input-error">{this.props.error}</div>
      </div>
    )
  }

}

searchInputComponent.propTypes = {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    type: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    value: React.PropTypes.string,
    error: React.PropTypes.string
}

export default searchInputComponent;
