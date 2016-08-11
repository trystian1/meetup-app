import React from 'react';
import TextInputComponent from '../ui-components/textInputComponent.jsx'
import DateInputComponent from '../ui-components/dateInputComponent.jsx';

import { Link } from 'react-router';

var  RegisterForm = React.createClass({
  render() {

    var errorClass = this.props.errors.message ? 'error-message' : 'hidden',
        passwordSpecialCharValidationClass = this.props.validations.passwordSpecialChar ? 'validation-ok' : 'validation-error',
        passwordLengthValidationClass = this.props.validations.passwordLength ? 'validation-ok' : 'validation-error',
        passwordUpperCaseValidationClass = this.props.validations.passwordUpperCase ? 'validation-ok' : 'validation-error',
        passwordNumberValidationClass = this.props.validations.passwordNumber ? 'validation-ok' : 'validation-error';

    return(
      <div>
        <div className={errorClass}>{this.props.errors.message}</div>
        <TextInputComponent name="username" autofocus="true"  label="Name: " type="text" error={this.props.errors.username} placeholder="Username" value={this.props.registerData.username} required="true" onChange={this.props.onChange}/>
        <TextInputComponent name="email" label="Email: " type="text" error={this.props.errors.email} placeholder="Username" value={this.props.registerData.email} required="true" onChange={this.props.onChange}/>
        <TextInputComponent name="password" label="Password: " type="password" placeholder="Password" value={this.props.registerData.password} required="true" onChange={this.props.onChange}/>
        <ul className="password-checker">
          <li className={passwordLengthValidationClass}>The password should atleast have <strong>eight</strong> characters</li>
          <li className={passwordUpperCaseValidationClass}>The password should atleast contain one <strong>uppercase</strong> character</li>
          <li className={passwordNumberValidationClass}>The password should atleast contain one <strong>number</strong></li>
          <li className={passwordSpecialCharValidationClass}>The password should atleast contain one <strong>special character</strong></li>
        </ul>
        <h2> Additional information: </h2>
        <TextInputComponent name="job" label="Occupation: " type="text" error={this.props.errors.job} placeholder="What is you job title?" value={this.props.registerData.job} onChange={this.props.onChange}/>
        <DateInputComponent name="birthDate" label="Date of birth: " type="date" error={this.props.errors.birthDate} value={this.props.registerData.birthDate} onChange={this.props.onChange}/>
        <button type="submit" className="button" onClick={this.props.registerFunction}> Register </button>
        <div>
          <span className="help-text">Do you already have an account?</span>
          <Link to="login" activeClassName="active" className="button primary">
            Login
          </Link>
        </div>
      </div>
    )
  }
});

export default RegisterForm;
