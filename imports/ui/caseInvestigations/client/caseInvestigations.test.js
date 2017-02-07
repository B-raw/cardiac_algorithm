import { withRenderedTemplate } from '../../test_helpers.js';
import { expect } from 'meteor/practicalmeteor:chai';
import { be } from 'meteor/practicalmeteor:chai';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import '../../test_helpers.js'
import '../caseInvestigations.js'

describe('Case Investigations', function() {
  before(function() {
    resetDatabase();
  });

  // it('renders new case page correctly', function () {
  //   let data = {};
  //
  //   withRenderedTemplate('CaseInvestigations', data, el => {
  //     expect($(el).context.innerText).to.include("New Patient Case")
  //     expect($(el).context.innerHTML).to.include("Age")
  //     expect($(el).context.innerHTML).to.include("When did the symptoms begin (from presentation)?")
  //     expect($(el).context.innerHTML).to.include("Past medical history of ischaemic heart disease?")
  //   });
  // });

  it('shows pain duration question if trop < 5', function () {
    let data = {};
    //troponin is less than 5 so should see chest pain question
    Session.set('baselineTroponinDone', true);

    withRenderedTemplate('BaselineTroponin', data, el => {
      expect($(el).context.innerHTML).to.include("What was the hs-cTnI concentration at presentation (ng/L)?")
    });

    Session.set('baselineTroponinDone', false);

    withRenderedTemplate('BaselineTroponin', data, el => {
      expect($(el).context.innerHTML).to.not.include("What was the hs-cTnI concentration at presentation (ng/L)?")
    });
  });

});
