import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import './countrySelect.js'
import './signup.html';

Template.Signup.onRendered(function() {
  $( '#country' ).countrySelect({
    preferredCountries: ['gb', 'us']
  });
})

Template.Signup.events({
    'submit form': function(event){
      event.preventDefault();
      var target = event.target;

      console.log(target.specialty.value)
      console.log(target.role.value)

      var firstName = target.firstName.value;
      var lastName = target.lastName.value;
      var country = target.country.value
      var organisation = target.organisation.value;
      var specialty = target.specialty.value;
      var role = target.role.value;
      var email = target.email.value;
      var password = target.password.value;
      var tsAndCs = target.tsAndCs.checked;

      var options = {
        email,
        password,
        about: { firstName,
                 lastName,
                 country,
                 organisation,
                 specialty,
                 role
               }
      }

      createNewUser(options);
    }
});

function createNewUser(options) {
  Accounts.createUser( options , function(err){
    if( err ) {
      // console.log(error.reason);
      $('div#errors').html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>')
                     .html( err.reason )
                     .addClass("alert alert-danger")
                     .attr('role', 'alert');
    } else {
      FlowRouter.go('home')
    }
  });
}
