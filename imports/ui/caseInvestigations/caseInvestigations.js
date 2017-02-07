import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { insertCase } from '../../api/researchData/methods.js';
import './caseInvestigations.html'

Template.CaseInvestigations.events({
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
        Flowrouter.go('/cases')
      }
    });

  },
  'click #baselineTropDone'(event) {
    isChecked = event.target.checked

    Session.set('showBaselineTropQuestion', isChecked)
  },
  'click #threeHourTropDone'(event) {
    isChecked = event.target.checked

    Session.set('showThreeHourTropQuestion', isChecked)
  },
  'click #sixHourTropDone'(event) {
    isChecked = event.target.checked

    Session.set('showSixHourTropQuestion', isChecked)
  },
});

Template.CaseInvestigations.helpers({
  showBaselineTropQuestion() {
    return Session.get('showBaselineTropQuestion')
  },
  showThreeHourTropQuestion() {
    return Session.get('showThreeHourTropQuestion')
  },
  showSixHourTropQuestion() {
    return Session.get('showSixHourTropQuestion')
  },
});
