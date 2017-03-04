import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { insertTestCaseToDatabase } from '../helpers/insertTestCaseToDatabase.js';
import './miRuledOut.html'

Template.MIRuledOut.onCreated(function () {
  insertTestCaseToDatabase();
});

Template.MIRuledOut.helpers({
  referOrLetterToCardio() {
    if (Session.get('threeHourTroponin')) {
      return "discuss with cardiology"
    } else {
      return "copy discharge letter to cardiology"
    }
  }
})
