import React from 'react';
import LoginForm from './loginForm.jsx';
import ApplicationTitle from '../title/applicationTitle.jsx';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import * as userLoginActions from '../actions/userLoginAction'
import router from 'react-router';
import {browserHistory} from 'react-router'
import _ from 'lodash';

class Login extends React.Component {

    constructor(props, context) {

      super(props, context);

      this.state = {
        loginData: {
          username: '',
          password: ''
        },
        errors: {}
      }

    }

    setLoginField(event) {

     var field = event.target.name,
         value = event.target.value;

     this.state.loginData[field] = value;
     return this.setState({loginData: this.state.loginData});

   }

   login(event) {

     var _this = this;

     event.preventDefault();
     event.stopPropagation();
     this.props.actions
      .loginUser(this.state.loginData.username, this.state.loginData.password)
      .then(() =>{
        browserHistory.push('/meet-up-form');
      });


   }

   setLoginErrors() {

     var errors = this.state.errors;

     errors.username = 'Please check your entered credentials';
     errors.password = 'Please check your entered credentials';

     this.setState({errors: errors});

   }

  render() {

      var errors = this.props.userdata && this.props.userdata.error
        ? this.props.userdata.error
        : this.state.errors;

      return(
            <div className="content-wrapper">
              <ApplicationTitle/>
              <LoginForm
                loginData={this.state.loginData}
                onChange={this.setLoginField.bind(this)}
                loginFunction={this.login.bind(this)}
                errors={errors} />
            </div>
          )

    }

}

Login.contextTypes = {
    router: React.PropTypes.object.isRequired
};

Login.propTypes = {
  actions: React.PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  console.log(state.user);
  return {
    userdata: state.user.userdata,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userLoginActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
