import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import './login.html';
import '../helpers/validationHelper.js'

Template.Login.onRendered(function() {
  $( "#login-form" ).validate();
})

Template.Login.events({
    'click [data-social-login]' ( event, template ) {
      const service = event.target.getAttribute( 'data-social-login' ),
            options = {

            };

      // if ( service === 'loginWithTwitter' ) {
      //   delete options.requestPermissions;
      // }

      Meteor[ service ]( options, (error ) => {
        if ( error ) {
          Bert.alert( error.message, 'danger' );
        }
      });

      // if ( service === 'loginWithFacebook') {

      // }
    }


    // 'submit form': function(event){
    //   event.preventDefault();
    //   var target = event.target;
    //
    //   var email = target.email.value;
    //   var password = target.password.value;
    //
    //   Meteor.loginWithPassword(email, password, function(error) {
    //     if (error) {
    //       console.log(error.reason)
    //       $('div#errors').html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>')
    //                      .html( error.reason )
    //                      .addClass("alert alert-danger")
    //                      .attr('role', 'alert');
    //     } else {
    //       FlowRouter.go('home')
    //     }
    //   });
    // }
});
