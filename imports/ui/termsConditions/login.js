import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import './login.html';

Template.Login.events({
    'submit form': function(event){
      event.preventDefault();
      var target = event.target;

      var email = target.email.value;
      var password = target.password.value;

      Meteor.loginWithPassword(email, password, function(error) {
        if (error) {
          console.log(error.reason)
        } else {
          FlowRouter.go('home')
        }
      });
    }
});
