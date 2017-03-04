import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { insertTestCaseToDatabase } from '../helpers/insertTestCaseToDatabase.js';

import './myocardialInjury.html'

Template.MyocardialInjury.onCreated(function () {
  insertTestCaseToDatabase();
});
