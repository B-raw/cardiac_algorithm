import { withRenderedTemplate } from '../../test_helpers.js';
import { expect } from 'meteor/practicalmeteor:chai';
import { be } from 'meteor/practicalmeteor:chai';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import '../../test_helpers.js'
import '../baselineTroponin.js'

describe('Baseline troponin', function() {
  before(function() {
    resetDatabase();
  });

  it('renders baseline troponin page correctly', function () {
    let data = {};


    withRenderedTemplate('BaselineTroponin', data, el => {
      expect($(el).context.innerText).to.include("Non-diagnostic ECG")
      expect($(el).context.innerHTML).to.include("Consider Aspirin 300mg")
      expect($(el).context.innerHTML).to.include("Sub-lingual nitrate or analgesia")
      expect($(el).context.innerHTML).to.include("CXR as indicated")
      expect($(el).context.innerHTML).to.include("What is the hs-cTnI concentration at presentation (ng/L)?")
      expect($(el).context.innerHTML).to.include("Patient gender")
    });
  });

  it('shows pain duration question if trop < 5', function () {
    let data = {};
    //troponin is less than 5 so should see chest pain question
    Session.set('baselineTroponin', 3);

    withRenderedTemplate('BaselineTroponin', data, el => {
      expect($(el).context.innerHTML).to.include("Was the onset of symptoms within two hours of presentation?")
    });
  });

  it('doesn\'t show pain duration question if trop > 5', function () {
    let data = {};
    //troponin is greater than 5 so should see chest pain question
    Session.set('baselineTroponin', 6);

    withRenderedTemplate('BaselineTroponin', data, el => {
      expect($(el).context.innerHTML).not.to.include("Was the onset of symptoms within two hours of presentation?")
    });
  });
});
