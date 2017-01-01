import { signUpAndSignIn, getBrowser, cleanDatabase, addPost, makeSaving, makeSavingBlank } from './testHelpers';

describe('Baseline troponin flow', function() {
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

  it('(baseline troponin <5 AND > 2 hours pain) routes to MI ruled out', function() {
    browser.url("localhost:3000/baseline-troponin")
           .waitForExist("h2");

    browser.setValue('[name=baselineTroponin]', "3")
           .click('input[value="male"]')
           .waitForExist('input[name="painDuration"]');
    browser.click('input[value="false"]')
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

  it('(male AND baseline troponin is 30) routes to 3 hour trop', function() {
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

  it('(female AND baseline troponin is 15) routes to 3 hour trop', function() {
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

  it("does not go to another route, if trop & gender not filled in", function() {
    browser.url("localhost:3000/baseline-troponin")
           .waitForExist("h2");

    browser.click('button[type=submit]');

    var currentUrl = browser.url().value
    expect(currentUrl).to.equal("http://localhost:3000/baseline-troponin")
  });
});
