import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
// import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import { chai, assert, expect, be } from 'meteor/practicalmeteor:chai';
import { Random } from 'meteor/random';
import { resetDatabase } from 'meteor/xolvio:cleaner';

// import { _ } from 'meteor/underscore';
// import { DDP } from 'meteor/ddp-client';
import { Cases } from '../researchData.js';
import { insertCase } from '../methods.js';
// import './publications.js';

describe('Cases', function () {
  describe('methods', function() {
    let userId;
    let newCase;

    beforeEach(function() {
      //clear database
      resetDatabase();

      Factory.define('user', Meteor.users, {
        email: 'bill@bill.com',
        password: "123321",
      });

      const user = Factory.create('user');

      newCase = {
        patientAge: "31-40",
        patientGender: "female",
        painDuration: "lt2hours",
        historyIschaemia: "false"
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
  });
});
