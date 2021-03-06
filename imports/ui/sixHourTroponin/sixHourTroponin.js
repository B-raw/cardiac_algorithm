import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './sixHourTroponin.html'
import '../helpers/validationHelper.js'

Template.SixHourTroponin.onRendered(function() {
  $( "#six-hour-troponin-form" ).validate();
})

Template.SixHourTroponin.events({
  'submit #six-hour-troponin-form'(event) {
    event.preventDefault();

    let target = event.target;
    let sixHourTroponin = parseInt(target.sixHourTroponin.value, 10);
    let deltaTroponin = sixHourTroponin - Session.get('baselineTroponin')
    //can save these in database at later date
    Session.set({
      'sixHourTroponin': sixHourTroponin
    });

    if (myocardialInjuryRuledOut(sixHourTroponin, deltaTroponin)) {
      FlowRouter.go('sixHourMiRuledOut');
    }
    else {
      FlowRouter.go('sixHourMyocardialInjury');
    }
  }
});

function myocardialInjuryRuledOut(sixHourTroponin, deltaTroponin) {
  let patientGender = Session.get('patientGender')
  return ((sixHourTroponin <= 16 && patientGender == 'female') ||
          (sixHourTroponin <= 34 && patientGender == 'male'))
}
