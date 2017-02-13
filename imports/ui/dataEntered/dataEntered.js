import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import './dataEntered.html';

Template.DataEntered.events({

});

Template.DataEntered.helpers({
  baselineTropEntered() {
    return Session.get('baselineTroponin');
  },
  threeHourTropEntered() {
    return Session.get('threeHourTroponin');
  },
  sixHourTropEntered() {
    return Session.get('sixHourTroponin');
  }
})