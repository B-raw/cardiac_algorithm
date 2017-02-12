import { Meteor } from 'meteor/meteor';
import { Cases } from './researchData';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const insertCase = new ValidatedMethod({
  name: 'Cases.methods.insert',
  validate: new SimpleSchema({
    patientAge: { type: String },
    patientGender: {type: String },
    painDuration: { type: String },
    historyIschaemia: { type: String },
    ecgIschaemia: {type: String},
    baselineTroponin: {
      type: String,
      optional: true
    },
    threeHourTroponin: {
      type: String,
      optional: true
    },
    sixHourTroponin: {
      type: String,
      optional: true
    }
  }).validator(),
  run(newCase) {
    if (!this.userId) {
      throw new Meteor.Error('unauthorized', 'You must be logged in to add a new case.')
    }

  newCase.userId = this.userId
  newCase.createdAt = new Date()

  Cases.insert(newCase)
  },
});

export const editCase = new ValidatedMethod({
  name: 'Cases.methods.edit',
  validate: new SimpleSchema({
    caseId: { type: String },
    patientAge: {
      type: String,
      optional: true },
    patientGender: {
      type: String,
      optional: true },
    painDuration: {
      type: String,
      optional: true },
    historyIschaemia: {
      type: String,
      optional: true },
    baselineTroponin: {
      type: String,
      optional: true
    },
    threeHourTroponin: {
      type: String,
      optional: true
    },
    sixHourTroponin: {
      type: String,
      optional: true
    },
    finalDiagnosis: {
      type: String,
      optional: true
    }
  }).validator(),
  run(newCaseInfo) {
    console.log(newCaseInfo)
    let caseId = newCaseInfo.caseId;
    let thisCase = Cases.findOne(caseId)

    if (!this.userId) {
      throw new Meteor.Error('unauthorized', 'You must be logged in to edit a new case.')
    }

    if (!(this.userId === thisCase.userId)) {
      throw new Meteor.Error('unauthorized', 'You don\'t own this case.')
    }

    Cases.update({ _id: caseId }, { $set: { baselineTroponin: newCaseInfo.baselineTroponin,
                                            threeHourTroponin: newCaseInfo.threeHourTroponin,
                                            sixHourTroponin: newCaseInfo.sixHourTroponin,
                                            finalDiagnosis: newCaseInfo.finalDiagnosis
                                          }});
  },
});

export const deleteCase = new ValidatedMethod({
  name: 'Cases.methods.delete',
  validate: new SimpleSchema({
    caseId: { type: String }
  }).validator(),

  run(args) {
    let thisCase = Cases.findOne(args.caseId)

    if (!this.userId) {
      throw new Meteor.Error('unauthorized', 'You must be logged in to delete a case.')
    }

    if (!(this.userId === thisCase.userId)) {
      throw new Meteor.Error('unauthorized', 'You don\'t own this case.')
    }

    Cases.remove({ _id: thisCase._id })
  }
});
