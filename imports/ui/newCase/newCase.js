import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { insertCase } from '../../api/researchData/methods.js';
import './newCase.html'

Template.NewCase.events({
  'submit form'(event) {
    event.preventDefault();

    let target = event.target;
    let patientAge = target.patientAge.value;
    let patientGender = target.gender.value;
    let painDuration = target.painDuration.value;
    let historyIschaemia = target.historyIschaemia.value;

    let newCase = {
      patientAge,
      patientGender,
      painDuration,
      historyIschaemia
    }

    //can save these in database at later date
    Session.set({
      'patientAge': patientAge,
      'patientGender': patientGender,
      'painDuration': painDuration,
      'historyIschaemia': historyIschaemia
    });

    insertCase.call(newCase, (error) => {
      if (error) {
        console.log(error)
        alert(error.reason)
      } else {
        FlowRouter.go('/cases/new/investigations')
      }
    });

  }
});
