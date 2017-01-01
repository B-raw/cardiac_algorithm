import { withRenderedTemplate } from '../../test_helpers.js';
import { expect } from 'meteor/practicalmeteor:chai';
import { be } from 'meteor/practicalmeteor:chai';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import '../../test_helpers.js'
import '../myocardialInjury.js'

describe('Myocardial Injury', function() {
  before(function() {
    resetDatabase();
  });

  it('renders myocardial injury page correctly', function () {
    const data = {};

    withRenderedTemplate('MyocardialInjury', data, el => {
      expect($(el).context.innerText).to.include("Myocardial injury or infarction")
      expect($(el).context.innerHTML).to.include("Arrange for admission, senior medical review and repeat hs-cTnI testing at 6 hours")
      expect($(el).context.innerHTML).to.include("A) Consider other causes of myocardial injury")
      expect($(el).context.innerHTML).to.include("B) If diagnosis of type 1 myocardial infarction confirmed:")
      expect($(el).context.innerHTML).to.include("Clopidogrel 300mg")
      expect($(el).context.innerHTML).to.include("Fondaparinux 2.5mg SC")
      expect($(el).context.innerHTML).to.include("Sub-lingual nitrate")
    });
  });
});
