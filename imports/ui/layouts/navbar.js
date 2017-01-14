import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './navbar.html'

Template.Navbar.events({
  'click #backButton'() {
    event.preventDefault();
    window.history.back();
  }
})
