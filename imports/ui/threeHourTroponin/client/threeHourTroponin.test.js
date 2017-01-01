import { withRenderedTemplate } from '../../test_helpers.js';
import { expect } from 'meteor/practicalmeteor:chai';
import { be } from 'meteor/practicalmeteor:chai';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import '../../test_helpers.js'
import '../threeHourTroponin.js'

describe('Three hour troponin', function() {
  before(function() {
    resetDatabase();
  });

  it('renders three hour troponin page correctly', function () {
    let data = {};


    withRenderedTemplate('ThreeHourTroponin', data, el => {
      expect($(el).context.innerHTML).to.include("3 hour troponin")
      expect($(el).context.innerHTML).to.include("What is the three hour troponin (ng/L)?")
    });
  });
});
