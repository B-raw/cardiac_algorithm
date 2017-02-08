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

  it('shows baseline trop question if checkbox ticked (session true)', function () {
    let data = {};
    //troponin is less than 5 so should see chest pain question
    Session.set('showBaselineTropQuestion', true);

    withRenderedTemplate('CaseInvestigations', data, el => {
      expect($(el).context.innerHTML).to.include("Presentation hs-cTnI concentration?")
    });

    Session.set('showBaselineTropQuestion', false);

    withRenderedTemplate('CaseInvestigations', data, el => {
      expect($(el).context.innerHTML).to.not.include("Presentation hs-cTnI concentration?")
    });
  });

  it('shows three hour trop question if checkbox ticked (session true)', function () {
    let data = {};
    //troponin is less than 5 so should see chest pain question
    Session.set('showThreeHourTropQuestion', true);

    withRenderedTemplate('CaseInvestigations', data, el => {
      expect($(el).context.innerHTML).to.include("3 hour hs-cTnI concentration?")
    });

    Session.set('showThreeHourTropQuestion', false);

    withRenderedTemplate('CaseInvestigations', data, el => {
      expect($(el).context.innerHTML).to.not.include("3 hour hs-cTnI concentration?")
    });
  });

  it('shows six hour trop question if checkbox ticked (session true)', function () {
    let data = {};
    //troponin is less than 5 so should see chest pain question
    Session.set('showSixHourTropQuestion', true);

    withRenderedTemplate('CaseInvestigations', data, el => {
      expect($(el).context.innerHTML).to.include("6 hour hs-cTnI concentration?")
    });

    Session.set('showSixHourTropQuestion', false);

    withRenderedTemplate('CaseInvestigations', data, el => {
      expect($(el).context.innerHTML).to.not.include("6 hour hs-cTnI concentration?")
    });
  });

});
