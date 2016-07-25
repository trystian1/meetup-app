import React from 'react';
import $ from 'jQuery';


class searchInputComponent extends React.Component {

  render() {

    var wrapperClass = 'form-group';
    console.log('search options', this.searchOptions);
    if (!this.searchOptions) {
      this.searchOptions = [{key: 1, value: 'aaa'}];
    }

    var searchOptions = this.searchOptions ? this.searchOptions : [];

    if (this.props.error && this.props.error.length > 0) {
      wrapperClass += ' ' + 'has-error';
    }

    if (this.props.size) {
      wrapperClass += ' ' + this.props.size
    }

    if (this.props.required) {
      wrapperClass += ' required';
    }

    console.log(searchOptions)

    return(
      <div className={wrapperClass}>
        <div class="field">
          <label htmlFor={this.props.name}>{this.props.label}
          </label>
          <input type='input' list={this.props.dataListId}
            name={this.props.name}
            className="text-input"
            placeholder={this.props.placeholder}
            ref={this.props.name}
            value={this.props.value}
            onChange={this.searchValue.bind(this)}
            />
          <datalist id={this.props.dataListId}>
              {searchOptions.map(searchOption =>
                <option key={searchOption.key} value={searchOption.value}/>
              )}
          </datalist>
        </div>
        <div className="input-error">{this.props.error}</div>
      </div>
    )
  }

  searchValue(evt) {
    var value = evt.target.value,
        service = new google.maps.places.AutocompleteService();
    if (value) {
      service.getQueryPredictions({ input: value}, this.callback.bind(this));
    }
    this.props.onChange(evt);
  }

  callback(results, status) {
    var id = 0,
        optionsArray = [];

    _.each(results, function(result) {
      id++;
      optionsArray.push(
        {
          key: id,
          value: result.description
        }
      )
    });

    this.searchOptions = optionsArray;


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
