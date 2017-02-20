import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './threeHourTroponin.html'
import '../helpers/validationHelper.js'

Template.ThreeHourTroponin.onRendered(function() {
  $( "#three-hour-troponin-form" ).validate();
})

Template.ThreeHourTroponin.events({
  'submit #three-hour-troponin-form'(event) {
    event.preventDefault();

    let target = event.target;
    let threeHourTroponin = parseInt(target.threeHourTroponin.value, 10);
    let deltaTroponin = threeHourTroponin - Session.get('baselineTroponin')

    //can save these in database at later date
    Session.set({
      'threeHourTroponin': threeHourTroponin
    });

    if (myocardialInjuryRuledOut(threeHourTroponin, deltaTroponin)) {
      FlowRouter.go('miRuledOut');
    }
    else if (myocardialInjuryOccurred(threeHourTroponin)) {
      FlowRouter.go('myocardialInjury');
    }
    else {
      FlowRouter.go('sixHourTroponin');
    }
  }
});

Template.ThreeHourTroponin.helpers({
  patientGender() {
    return Session.get('patientGender');
  },
  troponinCutOff() {
    return Session.equals('patientGender', "male") ? 34 : 16;

  }
})

function myocardialInjuryOccurred(threeHourTroponin) {
  let patientGender = Session.get('patientGender')
  return ((threeHourTroponin > 16 && patientGender == 'female') ||
          (threeHourTroponin > 34 && patientGender == 'male'))
}

function myocardialInjuryRuledOut(threeHourTroponin, deltaTroponin) {
  let patientGender = Session.get('patientGender')
  if (deltaTroponin < 3) {
    return ((threeHourTroponin <= 16 && patientGender == 'female') ||
            (threeHourTroponin <= 34 && patientGender == 'male'))
  }
  else {
    return false
  }
}
