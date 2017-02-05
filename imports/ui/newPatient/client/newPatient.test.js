import { withRenderedTemplate } from '../../test_helpers.js';
import { expect } from 'meteor/practicalmeteor:chai';
import { be } from 'meteor/practicalmeteor:chai';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import '../../test_helpers.js'
import '../newPatient.js'

describe('New Patient', function() {
  before(function() {
    resetDatabase();
  });

  it('renders new patient page correctly', function () {
    let data = {};

    withRenderedTemplate('NewPatient', data, el => {
      expect($(el).context.innerText).to.include("New Patient Case")
      expect($(el).context.innerHTML).to.include("Age")
      expect($(el).context.innerHTML).to.include("When did the symptoms begin?")
      expect($(el).context.innerHTML).to.include("History of ischaemic heart disease?")
    });
  });

  // it('shows pain duration question if trop < 5', function () {
  //   let data = {};
  //   //troponin is less than 5 so should see chest pain question
  //   Session.set('baselineTroponin', 3);
  //
  //   withRenderedTemplate('BaselineTroponin', data, el => {
  //     expect($(el).context.innerHTML).to.include("Was the onset of symptoms within two hours of presentation?")
  //   });
  // });
  //
  // it('doesn\'t show pain duration question if trop > 5', function () {
  //   let data = {};
  //   //troponin is greater than 5 so should see chest pain question
  //   Session.set('baselineTroponin', 6);
  //
  //   withRenderedTemplate('BaselineTroponin', data, el => {
  //     expect($(el).context.innerHTML).not.to.include("Was the onset of symptoms within two hours of presentation?")
  //   });
  // });
});
