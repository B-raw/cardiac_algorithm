import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './newPatient.html'

Template.NewPatient.onRendered(function() {
  this.$(".painTooltip").tooltip();
})

Template.NewPatient.events({
  'submit #baseline-troponin-form'(event) {
    event.preventDefault();

    let painLessThanTwoHoursBoolean;
    let target = event.target;
    let baselineTroponin = target.baselineTroponin.value;
    let patientGender = target.gender.value

    if (target.painDuration) {
      painLessThanTwoHoursBoolean = (target.painDuration.value == 'true');
      Session.set('painDurationBoolean', painLessThanTwoHoursBoolean);
    }
    //can save these in database at later date
    Session.set({
      'baselineTroponin': baselineTroponin,
      'patientGender': patientGender
    });

    routingLogic(target.painDuration, baselineTroponin, painLessThanTwoHoursBoolean, patientGender);
  },
  'blur input[name="baselineTroponin"]'(event) {
    const target = event.target;
    const baselineTroponin = target.value;

    Session.set('baselineTroponin', baselineTroponin);
  },

});

Template.NewPatient.helpers({
  tropLessThanFive() {
    const baselineTroponin = Session.get('baselineTroponin');
    return (baselineTroponin < 5);
  }
});

Template.registerHelper('log', function(what) {
  // You can use `this` and/or `Template.instance()`
  // to get template data access
  console.log(what);
});

function myocardialInjuryOccurred(baselineTroponin, patientGender) {
  return ((baselineTroponin > 16 && patientGender == 'female') ||
          (baselineTroponin > 34 && patientGender == 'male'))
}

function myocardialInjuryRuledOut(baselineTroponin, painLessThanTwoHoursBoolean) {
  return baselineTroponin < 5 && !painLessThanTwoHoursBoolean
}

function routingLogic(painDuration, baselineTroponin, painLessThanTwoHoursBoolean, patientGender) {
  if (painDuration && myocardialInjuryRuledOut(baselineTroponin, painLessThanTwoHoursBoolean)) {
    FlowRouter.go('miRuledOut');
  }
  else if (myocardialInjuryOccurred(baselineTroponin, patientGender)) {
    FlowRouter.go('myocardialInjury');
  }
  else {
    FlowRouter.go('threeHourTroponin');
  }
}
