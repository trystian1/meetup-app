import React from 'react';
import TextInputComponent from '../ui-components/textInputComponent.jsx'
import { Link } from 'react-router';

var  RegisterForm = React.createClass({
  render() {
    var errorClass = this.props.errors.message ? 'error-message' : 'hidden';
    return(
      <div>
        <div className={errorClass}>{this.props.errors.message}</div>
        <TextInputComponent name="username" label="Username: " type="text" error={this.props.errors.username} placeholder="Username" value={this.props.registerData.username} onChange={this.props.onChange}/>
        <TextInputComponent name="email" label="email: " type="text" error={this.props.errors.email} placeholder="Username" value={this.props.registerData.email} onChange={this.props.onChange}/>
        <TextInputComponent name="password" label="Password: " type="password" error={this.props.errors.password} placeholder="Password" value={this.props.registerData.password} onChange={this.props.onChange}/>
        <div type="submit" className="button" onClick={this.props.registerFunction}> Register </div>
        <div>
          <span className="help-text">Do you already have an account?</span>
          <Link to="login" activeClassName="active" className="button primary">
            <div type="submit" value="Login">Login</div>
          </Link>
        </div>
      </div>
    )
  }
});

export default RegisterForm;
