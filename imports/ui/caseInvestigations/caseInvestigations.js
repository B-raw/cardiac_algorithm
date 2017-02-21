import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { insertCase } from '../../api/researchData/methods.js';
import { clearAllSessions } from '../../startup/client/helpers/clearSessionHelper';
import { getValueFromRadioButton } from '../helpers/getValueFromRadioButton';
import './caseInvestigations.html';
import '../helpers/validationHelper.js';

Template.CaseInvestigations.onRendered(() => {
  $('#case-investigation-form').validate();
});

Template.CaseInvestigations.events({
  'submit form': function (event) {
    event.preventDefault();

    const target = event.target;
    const ecgIschaemia = getValueFromRadioButton('ecgIschaemia');

    const baselineTroponin = (Session.get('showBaselineTropQuestion')) ?
      target.baselineTroponin.value : '-';

    const threeHourTroponin = (Session.get('showThreeHourTropQuestion')) ?
      target.threeHourTroponin.value : '-';

    const sixHourTroponin = (Session.get('showSixHourTropQuestion')) ?
      target.sixHourTroponin.value : '-';

    const newCase = {
      patientAge: Session.get('patientAge'),
      patientGender: Session.get('patientGender'),
      painDuration: Session.get('painDuration'),
      historyIschaemia: Session.get('historyIschaemia'),
      ecgIschaemia,
      baselineTroponin,
      threeHourTroponin,
      sixHourTroponin,
    };

    insertCase.call(newCase, (error) => {
      if (error) {
        console.log(error);
        alert(error.reason);
      } else {
        FlowRouter.go('/cases');

        clearAllSessions();
      }
    });
  },
  'click #baselineTropDone': function (event) {
    const isChecked = event.target.checked;

    Session.set('showBaselineTropQuestion', isChecked);
  },
  'click #threeHourTropDone': function (event) {
    const isChecked = event.target.checked;

    Session.set('showThreeHourTropQuestion', isChecked);
  },
  'click #sixHourTropDone': function (event) {
    const isChecked = event.target.checked;

    Session.set('showSixHourTropQuestion', isChecked);
  },
  'click [name="ecgIschaemia"]': function (event) {
    const ecgIschaemia = event.target.id;

    Session.set('ecgIschaemia', ecgIschaemia);
  },
});

Template.CaseInvestigations.helpers({
  showBaselineTropQuestion() {
    return Session.get('showBaselineTropQuestion');
  },
  showThreeHourTropQuestion() {
    return Session.get('showThreeHourTropQuestion');
  },
  showSixHourTropQuestion() {
    return Session.get('showSixHourTropQuestion');
  },
});
