import { withRenderedTemplate } from '../../test_helpers.js';
import { expect } from 'meteor/practicalmeteor:chai';
import { be } from 'meteor/practicalmeteor:chai';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import '../frontpage.js'
import '../../test_helpers.js'

describe('Frontpage', function() {
  before(function() {
    resetDatabase();
  });

  it('renders front page correctly', function () {
    const data = {};

    withRenderedTemplate('Frontpage', data, el => {
      expect($(el).context.innerText).to.include("High-sensitivity Troponin in the Evaluation of Patients with Acute Coronary Syndromes")
      expect($(el).context.innerHTML).to.include("This protocol is for patients with chest pain and suspected acute myocardial infarction evaluated using the Abbott high-sensitivity cardiac troponin I assay")
      expect($(el).context.innerHTML).to.include("Begin Assessment")
    });
  });

  // it('renders correctly with teams', function () {
  //   //stub the teams collection
  //   StubCollections.stub(Teams);
  //   //create the details for our team:
  //   const timestamp = new Date();
  //   teamDetails = { teamName: "Gophers",
  //                   memberIds: ["1111"],
  //                   userDetailsForDisplay: [{ email: "test@test.com",
  //                                             username: "test",
  //                                             profile: { avatar: 0 }}],
  //                   createdBy: "1111",
  //                   createdAt: timestamp
  //   }
  //   // Now Teams is stubbed to a simple local collection mock:
  //   Teams.insert(teamDetails);
  //
  //   const data = {}
  //
  //   withRenderedTemplate('Team', data, (el) => {
  //     expect($(el).context.innerText).to.include("Your team")
  //     expect($(el).context.innerText).to.include("Gophers")
  //     expect($(el).context.innerText).to.include("Team was created on " + moment(timestamp).format("ddd Do MMM YYYY"))
  //   });
  //   // Restore the `Teams' collection
  //   StubCollections.restore();
  // });
  //
  // it('renders delete team and edit team name only when edit mode is on', function () {
  //   //stub the teams collection
  //   StubCollections.stub(Teams);
  //   //create the details for our team:
  //   const timestamp = new Date();
  //   teamDetails = { teamName: "Gophers",
  //                   memberIds: ["1111"],
  //                   userDetailsForDisplay: [{ email: "test@test.com",
  //                                             username: "test",
  //                                             profile: { avatar: 0 }}],
  //                   createdBy: "1111",
  //                   createdAt: timestamp
  //   }
  //   // Now Teams is stubbed to a simple local collection mock:
  //   Teams.insert(teamDetails);
  //
  //   //ISSUE for some reason editMode does not go through to the view
  //   const data = {
  //     editMode: () => true,
  //     cancer: "wakachanga",
  //   };
  //
  //   withRenderedTemplate('Team', {editMode: () => true}, (el) => {
  //     // console.log($(el).context.innerText)
  //     expect($(el).context.innerText).to.include("Your team")
  //     expect($(el).context.innerText).to.include("Gophers")
  //     expect($(el).context.innerText).to.include("Team was created on " + moment(timestamp).format("ddd Do MMM YYYY"))
  //   });
  //   // Restore the `Teams' collection
  //   StubCollections.restore();
  // });

});
