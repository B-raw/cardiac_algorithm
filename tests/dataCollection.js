import { signUpSignIn, signIn, getBrowser, cleanDatabase } from './testHelpers';

describe('User registration', function () {

  beforeEach(function () {
    cleanDatabase();
  });

  it('click data collection, enter new patient details @watch', function() {
    signUpSignIn(browser, "Bruce", "Wayne", "batman@hotmail.com", "123321")

    browser.url("localhost:3000/")
           .waitForExist('#new-patient-loggedin');
    browser.click("#new-patient-loggedin")
           .waitForExist("div");

    var currentUrl = browser.url().value
    expect(currentUrl).to.equal("http://localhost:3000/cases/new")

    browser.waitForExist(".panel");

    var headerText = browser.getText(".panel");
    expect(headerText).to.include("New Patient Case");

    var actualText = browser.getText("form");
    expect(actualText).to.include("Patient age:");
    expect(actualText).to.include("When did the symptoms begin (from presentation)?");
    expect(actualText).to.include("Past medical history of ischaemic heart disease?");

    browser.click('select[name="patientAge"]')
           .waitForExist('[value="41-50"]');
    browser.click('[value="41-50"]')
           .waitForExist("div");

    browser.click('input[value="female"]')

    browser.click('select[name="painDuration"]')
           .waitForExist('[value="3"]');
    browser.click('[value="3"]')
           .waitForExist("div");

    browser.click('input[value="true"]')
           .click('button[type="submit"]')
           .waitForExist('div');

    var actualText = browser.getText("form");
    expect(actualText).to.include("ECG Ischaemia?");

    browser.click('input[value="nonDiagnostic"]')
           .click('#baselineTropDone')
           .waitForExist('input[name="baselineTroponin"]');
    browser.setValue('[name=baselineTroponin]', "3")
           .click('button[type="submit"]')
           .waitForExist('div');

    var actualText = browser.getText("table");
    expect(actualText).to.include("3");
    expect(actualText).to.include("3 hours");
    expect(actualText).to.include("female");
    expect(actualText).to.include("41-50");

    // it('can click the options on new/investigations to show/hide trop value entering @watch', function() {
    // saves me from doing all the above again!!
      var actualText = browser.getText("#editAllCases");
      expect(actualText).to.include("Edit My Cases");

      var actualText = browser.getText("table");
      expect(actualText).to.not.include("Edit");
      expect(actualText).to.not.include("Delete");

      browser.click("#editAllCases")
             .waitForExist("button.js-edit");

      var actualText = browser.getText("#editAllCases");
      expect(actualText).to.include("Exit Edit Mode");

      var actualText = browser.getText("table");
      expect(actualText).to.include("Edit");
      expect(actualText).to.include("Delete");

  });



  // it('shows correct error messages on not entering cases', function() {
  //
  // });

  it('can view my cases tab from home, only when logged in', function() {
    browser.url("localhost:3000")
           .waitForExist("nav");
    // Don't see when not logged in
    var navbarText = browser.getText("nav");
    expect(navbarText).to.not.include("My Cases");

    signUpSignIn(browser, "Bruce", "Wayne", "batman@hotmail.com", "123321")

    browser.url("localhost:3000")
           .waitForExist("nav");
    browser.click('[href="/cases"]')
           .waitForExist("div");
    // Do see when logged in
    var navbarText = browser.getText("div");
    expect(navbarText).to.include("My Cases");

    var currentUrl = browser.url().value
    expect(currentUrl).to.equal("http://localhost:3000/cases")
  });

});
