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

  it('renders three hour troponin page correctly for males', function () {
    let data = {};
    Session.set({
      'patientGender': "male"
    })

    var expectedInformationText = "In male patients with a troponin ≥ 5 but ≤ 34, a repeat troponin should be taken at 3 hours from presentation"

    withRenderedTemplate('ThreeHourTroponin', data, el => {
      expect($(el).context.innerHTML).to.include(expectedInformationText)
      expect($(el).context.innerHTML).to.include("3 hour troponin")
      expect($(el).context.innerHTML).to.include("What is the three hour troponin (ng/L)?")
    });
  });

  it('renders three hour troponin page correctly for females', function () {
    let data = {};
    Session.set({
      'patientGender': "female"
    })

    var expectedInformationText = "In female patients with a troponin ≥ 5 but ≤ 16, a repeat troponin should be taken at 3 hours from presentation"

    withRenderedTemplate('ThreeHourTroponin', data, el => {
      expect($(el).context.innerHTML).to.include(expectedInformationText)
    });
  });
});
