import { withRenderedTemplate } from '../../test_helpers.js';
import { expect } from 'meteor/practicalmeteor:chai';
import { be } from 'meteor/practicalmeteor:chai';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import '../../test_helpers.js'
import '../stElevation.js'

describe('ST elevation', function() {
  before(function() {
    resetDatabase();
  });

  it('renders stElevation page correctly', function () {
    const data = {};

    withRenderedTemplate('STElevation', data, el => {
      expect($(el).context.innerText).to.include("ST-segment elevation")
      expect($(el).context.innerHTML).to.include("Aspirin")
      expect($(el).context.innerHTML).to.include("Clopidogrel 300mg")
      expect($(el).context.innerHTML).to.include("Heparin 5000 units IV (if not anti-coagulated)")
      expect($(el).context.innerHTML).to.include("Sub-lingual nitrate or analgesia")
      expect($(el).context.innerHTML).to.include("Consider tirofiban IV bolus")
      expect($(el).context.innerHTML).to.include("Admit and troponin at 6 hours")

    });
  });
});
