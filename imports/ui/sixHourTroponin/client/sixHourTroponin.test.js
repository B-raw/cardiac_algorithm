import { withRenderedTemplate } from '../../test_helpers.js';
import { expect } from 'meteor/practicalmeteor:chai';
import { be } from 'meteor/practicalmeteor:chai';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import '../../test_helpers.js'
import '../sixHourTroponin.js'

describe('Six hour troponin', function() {
  before(function() {
    resetDatabase();
  });

  it('renders six hour troponin page correctly', function () {
    let data = {};


    withRenderedTemplate('SixHourTroponin', data, el => {
      expect($(el).context.innerHTML).to.include("6 hour troponin")
      expect($(el).context.innerHTML).to.include("What is the six hour troponin (ng/L)?")
    });
  });
});
