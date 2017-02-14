import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { insertCase } from '../../api/researchData/methods.js';
import './caseInvestigations.html'

Template.CaseInvestigations.events({
  'submit form'(event) {
    event.preventDefault();

    let target = event.target;
    let ecgIschaemia = target.ecgIschaemia.value;

    var baselineTroponin = (Session.get('showBaselineTropQuestion')) ?
      target.baselineTroponin.value : "-"

    var threeHourTroponin = (Session.get('showThreeHourTropQuestion')) ?
      target.threeHourTroponin.value : "-"

    var sixHourTroponin = (Session.get('showSixHourTropQuestion')) ?
      target.sixHourTroponin.value : "-"

    let newCase = {
      patientAge: Session.get('patientAge'),
      patientGender: Session.get('patientGender'),
      painDuration: Session.get('painDuration'),
      historyIschaemia: Session.get('historyIschaemia'),
      ecgIschaemia,
      baselineTroponin,
      threeHourTroponin,
      sixHourTroponin
    }

    insertCase.call(newCase, (error) => {
      if (error) {
        console.log(error)
        alert(error.reason)
      } else {
        FlowRouter.go('/cases')

        Session.set('patientAge', null)
        Session.set('patientGender', null)
        Session.set('painDuration', null)
        Session.set('historyIschaemia', null)
        Session.set('ecgIschaemia', null)
        Session.set('showBaselineTropQuestion', null)
        Session.set('showThreeHourTropQuestion', null)
        Session.set('showSixHourTropQuestion', null)

      }
    });

  },
  'click #baselineTropDone'(event) {
    let isChecked = event.target.checked

    Session.set('showBaselineTropQuestion', isChecked)
  },
  'click #threeHourTropDone'(event) {
    let isChecked = event.target.checked

    Session.set('showThreeHourTropQuestion', isChecked)
  },
  'click #sixHourTropDone'(event) {
    let isChecked = event.target.checked

    Session.set('showSixHourTropQuestion', isChecked)
  },
  'click [name="ecgIschaemia"]'(event) {
    let ecgIschaemia = event.target.id

    Session.set('ecgIschaemia', ecgIschaemia)
  }
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
