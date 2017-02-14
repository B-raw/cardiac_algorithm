import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
// import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import { chai, assert, expect, be } from 'meteor/practicalmeteor:chai';
import { Random } from 'meteor/random';
import { resetDatabase } from 'meteor/xolvio:cleaner';

// import { _ } from 'meteor/underscore';
// import { DDP } from 'meteor/ddp-client';
import { Cases } from '../researchData.js';
import { insertCase, editCase, deleteCase } from '../methods.js';
// import './publications.js';

describe('Cases', function () {
  describe('methods', function() {
    let userId, newCase, user;

    beforeEach(function() {
      //clear database
      resetDatabase();

      Factory.define('user', Meteor.users, {
        email: 'bill@bill.com',
        password: "123321",
      });

      user = Factory.create('user');

      newCase = {
        patientAge: "31-40",
        patientGender: "female",
        painDuration: "lt2hours",
        historyIschaemia: "false",
        ecgIschaemia: "non-diagnostic",
        baselineTroponin: "4",
        threeHourTroponin: "4",
        sixHourTroponin: null
      }

      userId = user._id;
    });

    it('insertCase inserts a case into database', function() {
      const methodInvocation = { userId };
      const args = { newCase };
      insertCase._execute(methodInvocation, newCase);

      let myCase = Cases.findOne()

      expect(Cases.find().count()).to.equal(1)
      expect(myCase.userId).to.equal(userId)
      expect(myCase.patientAge).to.equal(newCase.patientAge)
    });

    it('editCase edits a case in the database', function() {
      const methodInvocation = { userId };
      const args = { newCase };
      insertCase._execute(methodInvocation, newCase);

      let myCase = Cases.findOne()
      let caseId = myCase._id

      caseEdit = {
        caseId,
        baselineTroponin: "8",
        threeHourTroponin: "11",
        sixHourTroponin: "15",
      }

      editCase._execute(methodInvocation, caseEdit );

      myCase = Cases.findOne()

      expect(Cases.find().count()).to.equal(1)
      expect(myCase.baselineTroponin).to.equal("8")
      expect(myCase.threeHourTroponin).to.equal("11")
    });

    it('deleteCase deletes a case from database', function() {
      const methodInvocation = { userId };
      const args = { newCase };
      insertCase._execute(methodInvocation, newCase);

      let myCase = Cases.findOne()
      let caseId = myCase._id

      deleteCase._execute(methodInvocation, { caseId });

      expect(Cases.find().count()).to.equal(0)
    });
  });
});
