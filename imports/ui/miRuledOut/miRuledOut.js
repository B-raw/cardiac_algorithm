import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './miRuledOut.html'

Template.MIRuledOut.helpers({
  referOrLetterToCardio() {
    if (Session.get('threeHourTroponin')) {
      return "discuss with cardiology"
    } else {
      return "copy discharge letter to cardiology"
    }
  }
})
