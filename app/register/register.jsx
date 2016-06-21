import React from 'react';
import firebase from 'firebase'
import RegisterForm from './registerForm.jsx';
import _ from 'lodash';

class Register extends React.Component {

    constructor(props, context) {
      super(props, context);
      this.state = {
        registerData: {
          username: '',
          email: '',
          password: '',
        },
        user: {
          name: ''
        },
        errors: {}
      }
    }

    setEventState(event) {

     var field = event.target.name,
         value = event.target.value;

     this.state.registerData[field] = value;
     this.validateInput(field, value);

     return this.setState({registerData: this.state.registerData});

   }


   validateInput(field, value) {

    var errors = this.state.errors,
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
       console.log(value.indexOf(emailRegEx));
          if (!value.match(emailRegEx)) {
            errors.email = 'Please fill in a valid email adress';
          } else {
            errors.email = null;
          }
        break;

        case 'password':
           if (value.length < 6) {
             errors.password = 'Password should be atleast 6 characters';
           } else {
             errors.password = null;
           }
         break;

    }

    this.setState({errors: errors});

   }

   register(event) {
     var _this = this;
     event.preventDefault();
     event.stopPropagation();

     firebaseApp.auth()
      .createUserWithEmailAndPassword(this.state.registerData.email, this.state.registerData.password)
      .catch(function(error) {
        
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
       // ...
     }).then(function() {

       firebaseApp.auth()
        .signInWithEmailAndPassword(_this.state.registerData.email, _this.state.registerData.password)
        .catch(function(error) {
         console.log(error);
         // Handle Errors here.

         var errorCode = error.code;
         var errorMessage = error.message;
         // ...
       }).then(function() {
         var user = firebaseApp.auth().currentUser;

         user.updateProfile({
           displayName: _this.state.registerData.username,
         }).then(function() {
           // Update successful.
         }, function(error) {
           // An error happened.
         });
       });
     });

   }

    render() {
      return(
            <div>
              <h1> Register </h1>
              <RegisterForm
                registerData={this.state.registerData}
                onChange={this.setEventState.bind(this)}
                registerFunction={this.register.bind(this)}
                errors={this.state.errors} />
            </div>
          )
    }
}

export default Register;
