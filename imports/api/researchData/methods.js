import { Meteor } from 'meteor/meteor';
import { Cases } from './researchData';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const insertCase = new ValidatedMethod({
  name: 'Cases.methods.insert',
  validate: new SimpleSchema({
    // userId: this.userId,
    patientAge: { type: String },
    patientGender: {type: String },
    painDuration: { type: String },
    historyIschaemia: { type: String },
  }).validator(),
  run(newCase) {
    if (!this.userId) {
      throw new Meteor.Error('unauthorized', 'You must be logged in to add a new case.')
    }

  newCase.userId = this.userId

  Cases.insert(newCase)

  FlowRouter.go('cases')
  },
});
