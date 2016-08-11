import React from 'react';
import RegisterForm from './registerForm.jsx';
import ApplicationTitle from '../title/applicationTitle.jsx';
import {browserHistory} from 'react-router'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import * as userLoginActions from '../actions/userLoginAction'
import _ from 'lodash';

class Register extends React.Component {

    constructor(props, context) {

      super(props, context);

      this.state = {
        registerData: {
          username: '',
          email: '',
          password: '',
          job: '',
          birthDate: ''
        },
        user: {
          name: ''
        },
        errors: {},
        validations: {
          passwordLength: false,
          passwordSpecialChar: false,
          passwordNumber: false,
          passwordUpperCase: false
        }
      }

    }

    componentWillUnmount() {

      if (this.props.userdata && !this.props.userdata.email) {
        this.props.actions.resetErrors();
      }

    }

    setEventState(event) {

     var field = event.target.name,
         value = event.target.value,
         errors;

     this.state.registerData[field] = value;
     errors = this.validateInput(field, value);
     this.state.errors[field] = errors[field];

     return this.setState({registerData: this.state.registerData});

   }

   isValidForm() {
     var isValid = true;

     _.each(this.getFormErrors(), function(errorObject, value) {

       if (errorObject.error) {
         isValid = false;
       }

     });

     return isValid;

   }

   getFormErrors() {

     var _this = this,
        errors = [];

     _.each(this.state.eventData, function(value, key) {
       errors.push({error: _this.validateInput(key, value)[key]});
     });

     return errors;

   }

   register(event) {

     var _this = this;

     event.preventDefault();
     event.stopPropagation();

     if (!this.isRegisterFormValid()) {
       return;
     }

     this.props.actions
      .registerAndLogin(this.state.registerData.email,
        this.state.registerData.password,
        this.state.registerData.username);
   }

   validateFormData() {
     var _this = this;

     _.each(this.state.registerData, function(value, key) {
       _this.validateInput(key, value);
     });

   }

   validateInput(field, value) {

    var errors = {},
        validations = this.state.validations,
        emailRegEx = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);

    switch(field) {

      case 'username':
         if (value.length < 3) {
           errors.username = 'Username should be atleast 3 characters';
         } else {
           errors.username = null;
         }
       break;

       case 'email':
          if (!value.match(emailRegEx)) {
            errors.email = 'Please fill in a valid email adress';
          } else {
            errors.email = null;
          }
        break;

        case 'password':

           if (value.length < 8) {
             validations.passwordLength = false;
             errors.password = 'Password should be atleast 8 characters';
           } else {
             errors.password = null;
             this.state.validations.passwordLength = true;
           }

           if (!value.match(/\d/)) {
             validations.passwordNumber = false;
             errors.password = 'Password should have one digit';
           } else {
             validations.passwordNumber = true;
             errors.password = null;
           }

           if (!value.match(/[A-Z]/)) {
             validations.passwordUpperCase = false;
             errors.password = 'Password should have one uppercase character';
           } else {
              validations.passwordUpperCase = true;
              errors.password = null;
           }

           if (!value.match(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/)) {
             validations.passwordSpecialChar = false;
             errors.password = 'Password should have one uppercase character';
           } else {
             validations.passwordSpecialChar = true;
             errors.password = null;
           }
         break;

    }

    return errors;

   }
    render() {
      var errors = this.props.userdata && this.props.userdata.error
        ? this.props.userdata.error
        : this.state.errors;

      return(
            <div className="content-wrapper">
              <ApplicationTitle/>
              <RegisterForm
                registerData={this.state.registerData}
                onChange={this.setEventState.bind(this)}
                registerFunction={this.register.bind(this)}
                validations={this.state.validations}
                errors={errors} />
            </div>
          )
    }
}

Register.propTypes = {
  actions: React.PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    userdata: state.user.userdata,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userLoginActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
