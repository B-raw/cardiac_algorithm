import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './baselineTroponin.html';
import '../helpers/validationHelper.js';
import '../dataEntered/dataEntered.js';

Template.BaselineTroponin.onRendered(function () {
  this.$('.painTooltip').tooltip();

  $('#baseline-troponin-form').validate();
});

function myocardialInjuryOccurred(baselineTroponin, patientGender) {
  return ((baselineTroponin > 16 && patientGender === 'female') ||
          (baselineTroponin > 34 && patientGender === 'male'));
}

function myocardialInjuryRuledOut(baselineTroponin, painLessThanTwoHoursBoolean) {
  return baselineTroponin < 5 && !painLessThanTwoHoursBoolean;
}

function routingLogic(painDuration, baselineTroponin, painLessThanTwoHoursBoolean, patientGender) {
  if (painDuration && myocardialInjuryRuledOut(baselineTroponin, painLessThanTwoHoursBoolean)) {
    FlowRouter.go('miRuledOut');
  } else if (myocardialInjuryOccurred(baselineTroponin, patientGender)) {
    FlowRouter.go('myocardialInjury');
  } else {
    FlowRouter.go('threeHourTroponin');
  }
}

Template.BaselineTroponin.events({
  'submit #baseline-troponin-form': function (event) {
    event.preventDefault();

    let painLessThanTwoHoursBoolean;
    const target = event.target;
    const baselineTroponin = parseInt(target.baselineTroponin.value, 10);
    const patientGender = target.gender.value;

    if (target.painDuration) {
      painLessThanTwoHoursBoolean = (target.painDuration.value === 'true');
      Session.set('painDurationBoolean', painLessThanTwoHoursBoolean);
    }
    // can save these in database at later date
    Session.set({
      baselineTroponin,
      patientGender,
    });

    routingLogic(target.painDuration, baselineTroponin, painLessThanTwoHoursBoolean, patientGender);
  },
  'blur input[name="baselineTroponin"]': function (event) {
    const target = event.target;
    const baselineTroponin = target.value;

    Session.set('baselineTroponin', baselineTroponin);
  },

});

Template.BaselineTroponin.helpers({
  tropLessThanFive() {
    const baselineTroponin = Session.get('baselineTroponin');
    return (baselineTroponin < 5);
  },
});

Template.registerHelper('log', (what) => {
  // You can use `this` and/or `Template.instance()`
  // to get template data access
  console.log(what);
});
