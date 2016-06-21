import React from 'react';
import LoginForm from './loginForm.jsx';
import router from 'react-router';
import _ from 'lodash';

class Login extends React.Component {

    constructor(props, context) {

      super(props, context);

      this.state = {
        loginData: {
          username: '',
          password: '',
        },
        errors: {}
      }
    }

    setEventState(event) {

     var field = event.target.name,
         value = event.target.value;

     this.state.loginData[field] = value;
     return this.setState({loginData: this.state.loginData});

   }

   login(event) {

     var _this = this;

     event.preventDefault();
     event.stopPropagation();

     firebaseApp.auth()
        .signInWithEmailAndPassword(this.state.loginData.username,
          this.state.loginData.password)
        .catch(function(error) {
         _this.setLoginErrors();
         // Handle Errors here.
         var errorCode = error.code;
         var errorMessage = error.message;
       // ...

     }).then(function() {
       _this.onLoginSucces();
     });

   }

   setLoginErrors() {

     var errors = this.state.errors;

     errors.username = 'Please check your entered credentials';
     errors.password = 'Please check your entered credentials';

     this.setState({errors: errors});

   }

   onLoginSucces() {

     var errors = this.state.errors;

     errors.username = null;
     errors.password = null;

     this.setState({errors: errors});
     this.context.router.push('/meet-up');

   }

    render() {

      return(
            <div>
              <h1> Login </h1>
              <LoginForm
                loginData={this.state.loginData}
                onChange={this.setEventState.bind(this)}
                loginFunction={this.login.bind(this)}
                errors={this.state.errors} />
            </div>
          )

    }

}

Login.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Login;
