import { withRenderedTemplate } from '../../test_helpers.js';
import { expect } from 'meteor/practicalmeteor:chai';
import { be } from 'meteor/practicalmeteor:chai';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import '../../test_helpers.js'
import '../miRuledOut.js'

describe('MI ruled out', function() {
  before(function() {
    resetDatabase();
  });

  it('renders baseline troponin page correctly', function () {
    const data = {};

    withRenderedTemplate('MIRuledOut', data, el => {
      expect($(el).context.innerText).to.include("Myocardial infarction ruled out")
      expect($(el).context.innerHTML).to.include("A) Clear alternative diagnosis")
      expect($(el).context.innerHTML).to.include("B) Atypical chest pain or recent negative investigations")
      expect($(el).context.innerHTML).to.include("C) Typical cardiac pain on exertion with no previous investigations")
      expect($(el).context.innerHTML).to.include("D) Known coronary heart disease")
    });
  });
});
