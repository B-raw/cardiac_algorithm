import { signUpAndSignIn, getBrowser, cleanDatabase, addPost, makeSaving, makeSavingBlank } from './testHelpers';

let mainBrowser;

describe('User Flow', function () {

  beforeEach(function () {
    cleanDatabase();
  });

  describe('Front page', function() {

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
             .waitForExist("h2");

      var currentUrl = browser.url().value
      expect(currentUrl).to.equal("http://localhost:3000/initial-assessment")

      var headerText = browser.getText("h2#initial-assess");
      expect(headerText).to.equal("Initial Assessment & Management");

      var questionText = browser.getText("h2#select-ecg");
      expect(questionText).to.equal("Please select what the ECG showed");
    });

    it('click "ST-segment elevation", moves to emergency management page', function() {
      browser.url("localhost:3000/initial-assessment")
             .waitForExist("h2");

      browser.click("#st-elevation")
             .waitForExist("h2");

      var currentUrl = browser.url().value
      expect(currentUrl).to.equal("http://localhost:3000/st-elevation")

      var headerText = browser.getText("h2");
      expect(headerText).to.equal("ST-segment elevation");

      var bodyText = browser.getText("#st-treatment");
      expect(bodyText).to.contain("Aspirin");
    });

    it('click "ST depression/T wave inversion", moves to emergency management page', function() {
      browser.url("localhost:3000/initial-assessment")
             .waitForExist("h2");

      browser.click("#non-st-elevation")
             .waitForExist("h2");

      var currentUrl = browser.url().value
      expect(currentUrl).to.equal("http://localhost:3000/non-st-elevation")

      var headerText = browser.getText("h2");
      expect(headerText).to.equal("ST depression/T wave inversion");

      var bodyText = browser.getText("#non-st-treatment");
      expect(bodyText).to.contain("Aspirin");
    });

    it('baseline troponin display', function() {
      browser.url("localhost:3000/initial-assessment")
             .waitForExist("h2");

      browser.click("#non-diagnostic")
             .waitForExist("h2");

      var currentUrl = browser.url().value
      expect(currentUrl).to.equal("http://localhost:3000/baseline-troponin")

      var headerText = browser.getText("h2");
      expect(headerText).to.equal("Non-diagnostic ECG");

      var bodyText = browser.getText("form");
      expect(bodyText).to.contain("What is the baseline troponin (ng/L)?");
    });

    it('(baseline troponin <5 AND < 2 hours pain) routes to MI ruled out', function() {
      browser.url("localhost:3000/baseline-troponin")
             .waitForExist("h2");

      browser.setValue('[name=baselineTroponin]', "3")
             .click('input[value="male"]')
             .click('input[value="false"]')
             .click('button[type=submit]');

      var currentUrl = browser.url().value
      expect(currentUrl).to.equal("http://localhost:3000/mi-ruled-out")

      var headerText = browser.getText("h2");
      expect(headerText).to.equal("Myocardial infarction ruled out");
    });

    it('(female AND baseline troponin > 16) routes to MI', function() {
      browser.url("localhost:3000/baseline-troponin")
             .waitForExist("h2");

      browser.setValue('[name=baselineTroponin]', "17")
             .click('input[value="female"]')
             .click('button[type=submit]');

      var currentUrl = browser.url().value
      expect(currentUrl).to.equal("http://localhost:3000/myocardial-injury")

      var headerText = browser.getText("h2");
      expect(headerText).to.contain("Myocardial injury or infarction");
    });

    it('(male AND baseline troponin > 34) routes to MI', function() {
      browser.url("localhost:3000/baseline-troponin")
             .waitForExist("h2");

      browser.setValue('[name=baselineTroponin]', "35")
             .click('input[value="male"]')
             .click('button[type=submit]');

      var currentUrl = browser.url().value
      expect(currentUrl).to.equal("http://localhost:3000/myocardial-injury")

      var headerText = browser.getText("h2");
      expect(headerText).to.contain("Myocardial injury or infarction");
    });

    it('chest pain duration disappears if trop >= 5', function() {
      browser.url("localhost:3000/baseline-troponin")
             .waitForExist("h2");

      // if <5, it should exist
      browser.setValue('[name=baselineTroponin]', "4")
             .click('input[value="male"]') //doing this to unfocus baseline trop
      var doesExist = browser.waitForExist('label[for="painDuration"]');
      expect(doesExist).to.be.true;

      // if >5, it should exist
      browser.setValue('[name=baselineTroponin]', "7")
             .click('input[value="male"]')
      var doesNotExist = browser.waitForExist('label[for="painDuration"]', undefined, true)
      expect(doesNotExist).to.be.true;

      // if <5, it should exist
      browser.setValue('[name=baselineTroponin]', "4")
             .click('input[value="male"]')
      var doesExist = browser.waitForExist('label[for="painDuration"]');
      expect(doesExist).to.be.true;
    });

    it('(male AND baseline troponin is 30) routes to 3 hour trop @watch', function() {
      browser.url("localhost:3000/baseline-troponin")
             .waitForExist("h2");

      browser.setValue('[name=baselineTroponin]', "15")
             .click('input[value="male"]')
             .click('button[type=submit]');

      var currentUrl = browser.url().value
      expect(currentUrl).to.equal("http://localhost:3000/3-hour-troponin")

      var headerText = browser.getText("h2");
      expect(headerText).to.contain("3 hour troponin");
    });

    it('(female AND baseline troponin is 15) routes to 3 hour trop @watch', function() {
      browser.url("localhost:3000/baseline-troponin")
             .waitForExist("h2");

      browser.setValue('[name=baselineTroponin]', "15")
             .click('input[value="female"]')
             .click('button[type=submit]');

      var currentUrl = browser.url().value
      expect(currentUrl).to.equal("http://localhost:3000/3-hour-troponin")

      var headerText = browser.getText("h2");
      expect(headerText).to.contain("3 hour troponin");
    });

  });
});
