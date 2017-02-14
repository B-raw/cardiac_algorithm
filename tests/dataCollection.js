import { signUpSignIn, signIn, getBrowser, cleanDatabase } from './testHelpers';

describe('User registration', function () {

  beforeEach(function () {
    cleanDatabase();
  });

  // it('click data collection, enter new patient details @watch', function() {
  //   signUpSignIn(browser, "Bruce", "Wayne", "batman@hotmail.com", "123321")
  //
  //   browser.url("localhost:3000/")
  //          .waitForExist('#new-patient-loggedin', 2000);
  //   browser.click("#new-patient-loggedin")
  //          .waitForExist("div");
  //
  //   var currentUrl = browser.url().value
  //   expect(currentUrl).to.equal("http://localhost:3000/cases/new")
  //
  //   browser.waitForExist(".panel");
  //
  //   var headerText = browser.getText(".panel");
  //   expect(headerText).to.include("New Patient Case");
  //
  //   var actualText = browser.getText("form");
  //   expect(actualText).to.include("Patient age:");
  //   expect(actualText).to.include("When did the symptoms begin (from presentation)?");
  //   expect(actualText).to.include("Past medical history of ischaemic heart disease?");
  //
  //   browser.click('input[value="41-50"]')
  //          .click('input[value="male"]')
  //          .click('input[value="lt2hours"]')
  //          .click('input[value="true"]')
  //          .click('#submit')
  //          .waitForExist('div');
  //
  //   var actualText = browser.getText("div");
  //   expect(actualText).to.include("ECG Ischaemia?");
  //
  //   browser.click('input[value="nonDiagnostic"]')
  //          .click('#baselineTropDone')
  //          .waitForExist('input[name="baselineTroponin"]');
  //   browser.setValue('[name=baselineTroponin]', "3")
  //          .click('button[type="submit"]')
  //          .waitForExist('div');
  //
  //   var actualText = browser.getText("div");
  //   expect(actualText).to.include("Thank you for submitting your case");
  //   expect(actualText).to.include("Submit another case");
  //
  // });

  it('can view my cases tab from home, only when logged in @watch', function() {
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
