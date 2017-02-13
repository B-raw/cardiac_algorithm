import { withRenderedTemplate } from '../../test_helpers.js';
import { expect } from 'meteor/practicalmeteor:chai';
import { be } from 'meteor/practicalmeteor:chai';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import '../../test_helpers.js'
import '../dataEntered.js'

describe('DataEntered', function() {
  before(function() {
    resetDatabase();
  });

  it('renders data enetered template correctly', function () {
    const data = {};

    withRenderedTemplate('DataEntered', data, el => {
      expect($(el).context.innerText).to.include("Data Entered");
    });
  });

});
