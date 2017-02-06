import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './newPatient.html'

Template.NewPatient.events({
  'submit form'(event) {
    event.preventDefault();

    let target = event.target;
    let patientAge = target.patientAge.value
    let patientGender = target.gender.value
    let painDuration = target.painDuration.value
    let historyIschaemia = target.historyIschaemia.value

    console.log(patientAge)
    console.log(patientGender)
    console.log(painDuration)
    console.log(historyIschaemia)

    //can save these in database at later date
    Session.set({
      'patientAge': patientAge,
      'patientGender': patientGender,
      'painDuration': painDuration,
      'historyIschaemia': historyIschaemia
    });

    // routingLogic(target.painDuration, baselineTroponin, painLessThanTwoHoursBoolean, patientGender);
  }
});
