import { withRenderedTemplate } from '../../test_helpers.js';
import { expect } from 'meteor/practicalmeteor:chai';
import { be } from 'meteor/practicalmeteor:chai';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import '../../test_helpers.js'
import '../nonSTElevation.js'

describe('non ST elevation', function() {
  before(function() {
    resetDatabase();
  });

  it('renders nonstElevation page correctly', function () {
    const data = {};

    withRenderedTemplate('NonSTElevation', data, el => {
      expect($(el).context.innerText).to.include("ST depression/T wave inversion")
      expect($(el).context.innerHTML).to.include("Aspirin 300mg")
      expect($(el).context.innerHTML).to.include("Sub-lingual nitrate or analgesia")
      expect($(el).context.innerHTML).to.include("Consider Clopidogrel 300mg")
      expect($(el).context.innerHTML).to.include("Consider Fondaparinux 2.5mg SC (if not anti-coagulated)")
      expect($(el).context.innerHTML).to.include("CXR as indicated")
      expect($(el).context.innerHTML).to.include("Admit and repeat hs-cTnI at 6 hours")
    });
  });
});
