import React from 'react';
import { Link } from 'react-router';
import TextInputComponent from '../ui-components/textInputComponent.jsx'

var  LoginForm = React.createClass({

  render() {
    var errorClass = this.props.errors.message ? 'error-message' : 'hidden';
    return(
      <div>
        <div className={errorClass}>{this.props.errors.message}</div>
        <TextInputComponent name="username" label="Email: " type="text" error={this.props.errors.username} placeholder="Email" value={this.props.loginData.username} onChange={this.props.onChange}/>
        <TextInputComponent name="password" label="Password: " type="password" error={this.props.errors.password} placeholder="Password" value={this.props.loginData.password} onChange={this.props.onChange}/>
        <div type="submit" value="Login" className="button" onClick={this.props.loginFunction}>Login </div>
        <div>
          <span className="help-text">No account yet?</span>
          <Link to="register" activeClassName="active" className="button primary">Register
            <div type="submit" value="Register" onClick={this.props.loginFunction}></div>
          </Link>
        </div>
      </div>
    )
  }
});

export default LoginForm;
