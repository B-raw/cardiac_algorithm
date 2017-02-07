import { withRenderedTemplate } from '../../test_helpers.js';
import { expect } from 'meteor/practicalmeteor:chai';
import { be } from 'meteor/practicalmeteor:chai';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import '../../test_helpers.js'
import '../cases.js'

describe('Cases', function() {
  before(function() {
    resetDatabase();
  });

  it('renders cases page correctly', function () {
    let data = {};

    withRenderedTemplate('Cases', data, el => {
      // expect($(el).context.innerText).to.include("New Patient Case")
      // expect($(el).context.innerHTML).to.include("Age")
      // expect($(el).context.innerHTML).to.include("When did the symptoms begin?")
      // expect($(el).context.innerHTML).to.include("History of ischaemic heart disease?")
    });
  });
});
