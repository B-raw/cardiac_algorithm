import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from "meteor/kadira:flow-router";
import './navbar.html';

Template.Navbar.events({
  'click #backButton'() {
    event.preventDefault();
    window.history.back();
  },
  'click #logout'() {
    event.preventDefault();
    Meteor.logout();

    FlowRouter.go('home');
    }
})

Template.Navbar.helpers({
    'isActive': function (itemName) {
      if (FlowRouter.getRouteName() == itemName) {
          return 'active';
      }
    }

});
