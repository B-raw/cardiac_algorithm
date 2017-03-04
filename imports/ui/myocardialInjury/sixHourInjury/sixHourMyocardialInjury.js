import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { insertTestCaseToDatabase } from '../../helpers/insertTestCaseToDatabase.js';
import './sixHourMyocardialInjury.html'

Template.SixHourMyocardialInjury.onCreated(function () {
  insertTestCaseToDatabase();
});
