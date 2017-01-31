import { withRenderedTemplate } from '../../test_helpers.js';
import { expect } from 'meteor/practicalmeteor:chai';
import { be } from 'meteor/practicalmeteor:chai';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import '../../test_helpers.js'
import '../initialAssessment.js'

describe('Initial Assessment', function() {
  before(function() {
    resetDatabase();
  });

  it('renders initial assessment page correctly', function () {
    const data = {};

    withRenderedTemplate('InitialAssessment', data, el => {
      expect($(el).context.innerText).to.include("Initial Assessment & Management")
      expect($(el).context.innerHTML).to.include("Please select what the ECG showed")
      expect($(el).context.innerHTML).to.include("Non-diagnostic")
    });
  });

});
