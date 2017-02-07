import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Cases } from '../../api/researchData/researchData.js';
import './cases.html'

Template.Cases.events({

});

Template.Cases.helpers({
  cases() {
    return Cases.find({}, { sort: { createdAt: -1 } });
  }
});
