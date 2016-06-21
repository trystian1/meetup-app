import React from 'react';
import TextInputComponent from '../ui-components/textInputComponent.jsx'

var  RegisterForm = React.createClass({

  render() {
    return(
      <div>
        <TextInputComponent name="username" label="Username: " error={this.props.errors.username} placeholder="Username" value={this.props.registerData.username} onChange={this.props.onChange}/>
        <TextInputComponent name="email" label="email: " error={this.props.errors.email} placeholder="Username" value={this.props.registerData.email} onChange={this.props.onChange}/>
        <TextInputComponent name="password" label="Password: " type="password" error={this.props.errors.password} placeholder="Password" value={this.props.registerData.password} onChange={this.props.onChange}/>
        <div type="submit" className="button" onClick={this.props.registerFunction}> Register </div>
      </div>
    )
  }
});

export default RegisterForm;
