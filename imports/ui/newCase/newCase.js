import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { insertCase } from '../../api/researchData/methods.js';
import { getValueFromRadioButton } from '../helpers/getValueFromRadioButton'
import './newCase.html'
import '../helpers/validationHelper.js'

Template.NewCase.onRendered(function() {
  $( "#baseline-troponin-form" ).validate();
})

Template.NewCase.events({
  'submit form'(event) {
    event.preventDefault();

    let target = event.target;
    let patientAge = target.patientAge.value;
    let patientGender = getValueFromRadioButton("gender");
    let painDuration = target.painDuration.value;
    let historyIschaemia = getValueFromRadioButton("historyIschaemia");

    console.log(patientGender)
    console.log(historyIschaemia)

    //can save these in database at later date
    Session.set({
      'patientAge': patientAge,
      'patientGender': patientGender,
      'painDuration': painDuration,
      'historyIschaemia': historyIschaemia
    });

    FlowRouter.go('/cases/new/investigations')
  }
});
