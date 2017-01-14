import { signUpAndSignIn, getBrowser, cleanDatabase, addPost, makeSaving, makeSavingBlank } from './testHelpers';

let mainBrowser;

describe('User Flow', function () {

  beforeEach(function () {
    cleanDatabase();
  });

  it('frontpage renders', function() {
    browser.url("localhost:3000/")
           .waitForExist("h1", 2000);
    var actualText = browser.getText("h1");

    expect(actualText).to.equal("Rapid rule out of myocardial infarction");
  });

  it('click Begin, moves to initial assessment page', function() {
    browser.url("localhost:3000/")
           .waitForExist("h1");

    browser.click("#begin-assessment")
           .waitForExist("div");

    var currentUrl = browser.url().value
    expect(currentUrl).to.equal("http://localhost:3000/initial-assessment")

    var headerText = browser.getText("h2#initial-assess");
    expect(headerText).to.equal("Initial Assessment & Management");

    var questionText = browser.getText("h2#select-ecg");
    expect(questionText).to.equal("Please select what the ECG showed:");
  });

  describe('Front page', function() {
    it('click "ST-segment elevation", moves to emergency management page', function() {
      browser.url("localhost:3000/initial-assessment")
             .waitForExist("div");

      browser.click("#st-elevation")
             .waitForExist("div");

      var currentUrl = browser.url().value
      expect(currentUrl).to.equal("http://localhost:3000/st-elevation")

      var headerText = browser.getText("h2");
      expect(headerText).to.equal("Management of ST-segment elevation");

      var bodyText = browser.getText("#st-treatment");
      expect(bodyText).to.contain("Aspirin");
    });

    it('click "ST depression/T wave inversion", moves to emergency management page', function() {
      browser.url("localhost:3000/initial-assessment")
             .waitForExist("div");

      browser.click("#non-st-elevation")
             .waitForExist("div");

      var currentUrl = browser.url().value
      expect(currentUrl).to.equal("http://localhost:3000/non-st-elevation")

      var headerText = browser.getText("h2");
      expect(headerText).to.equal("ST depression/T wave inversion");

      var bodyText = browser.getText("#non-st-treatment");
      expect(bodyText).to.contain("Aspirin");
    });

    it('has an about page', function() {
      browser.url("localhost:3000/")
             .waitForExist("h1");

      browser.click("#about")
             .waitForExist("div");

      var currentUrl = browser.url().value
      expect(currentUrl).to.equal("http://localhost:3000/about")

      var headerText = browser.getText("h2");
      expect(headerText).to.equal("About");
    });

    it('has a home page quick link @watch', function() {
      browser.url("localhost:3000/about")
             .waitForExist("h2");

      browser.click("#home")
             .waitForExist("div");

      var currentUrl = browser.url().value
      expect(currentUrl).to.equal("http://localhost:3000/")

      var headerText = browser.getText("h1");
      expect(headerText).to.equal("Rapid rule out of myocardial infarction");
    });
  });
});
