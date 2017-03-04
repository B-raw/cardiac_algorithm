import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { insertTestCaseToDatabase } from '../../helpers/insertTestCaseToDatabase.js';
import './sixHourMiRuledOut.html'

Template.SixHourMIRuledOut.onCreated(function () {
  insertTestCaseToDatabase();
});
