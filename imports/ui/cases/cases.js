import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Cases } from '../../api/researchData/researchData.js';
import { MomentsJS } from 'meteor/momentjs:moment';
import { deleteCase, editCase } from '../../api/researchData/methods.js';
import './cases.html'

Template.Cases.onCreated(function() {
  this.editModeCases = new ReactiveVar(false);
  this.individualEditMode = new ReactiveVar(null);
});

Template.registerHelper('formatDate', function(date) {
    return moment(date).format("DD/MM/YY");
});

Template.Cases.events({
  'click #editAllCases, click #cancelEditMode'(event, template) {
    event.preventDefault();

    template.editModeCases.set(!template.editModeCases.get());
    template.individualEditMode.set(null);

  },
  'click .js-edit'(event, template) {
    event.preventDefault();
    let target = event.target;
    let caseId = target.id;

    template.individualEditMode.set(caseId);
  },
  'click .js-cancel'(event, template) {
    event.preventDefault();

    template.individualEditMode.set(null);
  },
  'click .js-save'(event, template) {
    event.preventDefault();
    let target = event.target;
    let caseId = target.id;

    var selectBox = document.getElementById("finalDiagnosis")
    var finalDiagnosis = selectBox.options[selectBox.selectedIndex].value || "-"
    var baselineTroponin = document.getElementsByName("baselineTroponin")[0].value || "-"
    var threeHourTroponin = document.getElementsByName("threeHourTroponin")[0].value || "-"
    var sixHourTroponin = document.getElementsByName("sixHourTroponin")[0].value || "-"
    // var finalDiagnosis = document.getElementsByName("finalDiagnosis")[0].value || "-"

    let newCaseInfo = {
      caseId,
      baselineTroponin,
      threeHourTroponin,
      sixHourTroponin,
      finalDiagnosis
    }

    template.individualEditMode.set(!template.individualEditMode.get());

    editCase.call( newCaseInfo, (error) => {
      if (error) {
        console.log(error)
        alert(error.reason)
      } else {
        // success
      }
    });
  },
  'click .js-delete'() {
    event.preventDefault();
    let target = event.target;
    let caseId = target.id;

    let args = { caseId }

    if (confirm("Are you sure you want to permanently delete this case?")) {
      deleteCase.call( args, (error) => {
        if (error) {
          console.log(error)
          alert(error.reason)
        } else {
          // success
        }
      });
    }
  }
});

Template.Cases.helpers({
  cases() {
    return Cases.find({}, { sort: { createdAt: -1 } });
  },
  editModeCases() {
    return Template.instance().editModeCases.get();
  },
  individualEditMode(caseId) {
    return (caseId == Template.instance().individualEditMode.get())
  }
});
