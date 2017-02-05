import { signUpSignIn, signIn, getBrowser, cleanDatabase } from './testHelpers';

describe('User registration', function () {

  beforeEach(function () {
    cleanDatabase();
  });

  it('click data collection, enter new patient details @watch', function() {
    signUpSignIn(browser, "Bruce", "Wayne", "batman@hotmail.com", "123321")

    browser.url("localhost:3000/")
           .waitForExist('#new-patient-loggedin', 2000);
    browser.click("#new-patient-loggedin")
           .waitForExist("div");

    var currentUrl = browser.url().value
    expect(currentUrl).to.equal("http://localhost:3000/new-patient")

    var actualText = browser.getText("div");
    expect(actualText).to.include("New Patient");
    expect(actualText).to.include("Age");
    expect(actualText).to.include("When did the symptoms begin?");
    expect(actualText).to.include("History of ischaemic heart disease?");

    browser.click('input[value="41-50"]')
           .click('input[value="male"]')
           .click('input[value="lt2hours"]')
           .click('input[value="true"]')
           .click('#submit')
           .waitForExist('div');

    var actualText = browser.getText("div");
    expect(actualText).to.include("ECG Ischaemia?");

    browser.click('input[value="true"]')
           .setValue('[name=threeHourTroponin]', "3")
           .click('#submit')
           .waitForExist('div');

    var actualText = browser.getText("div");
    expect(actualText).to.include("Thank you for submitting your case");
    expect(actualText).to.include("Submit another case");

  });


});
