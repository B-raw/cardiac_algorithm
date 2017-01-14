describe('Six Hour Troponin', function() {
  it('6 hour troponin <= 16 in woman routes to MI ruled out', function() {
    browser.url("localhost:3000/baseline-troponin")
           .waitForExist("div");

    browser.setValue('[name=baselineTroponin]', "10")
           .click('input[value="female"]')
           .click('button[type=submit]')
           .waitForExist("div");

    browser.setValue('[name=threeHourTroponin]', "13")
           .click('button[type=submit]')
           .waitForExist("div");

    browser.setValue('[name=sixHourTroponin]', "15")
           .click('button[type=submit]')

    var currentUrl = browser.url().value;
    expect(currentUrl).to.equal("http://localhost:3000/six-hour-mi-ruled-out");

    var headerText = browser.getText("h2");
    expect(headerText).to.equal("Myocardial infarction ruled out");
  });

  it('6 hour troponin <= 34 in man routes to MI ruled out', function() {
    browser.url("localhost:3000/baseline-troponin")
           .waitForExist("div");

    browser.setValue('[name=baselineTroponin]', "16")
           .click('input[value="male"]')
           .click('button[type=submit]')
           .waitForExist("div");

    browser.setValue('[name=threeHourTroponin]', "19")
           .click('button[type=submit]')
           .waitForExist("div");

    browser.setValue('[name=sixHourTroponin]', "34")
           .click('button[type=submit]');

    var currentUrl = browser.url().value;
    expect(currentUrl).to.equal("http://localhost:3000/six-hour-mi-ruled-out");
  });

  it('(female AND 6 hour troponin > 16) routes to MI', function() {
    browser.url("localhost:3000/baseline-troponin")
           .waitForExist("div");

    browser.setValue('[name=baselineTroponin]', "12")
           .click('input[value="female"]')
           .click('button[type=submit]')
           .waitForExist("div");

    browser.setValue('[name=threeHourTroponin]', "15")
           .click('button[type=submit]')
           .waitForExist("div");

    browser.setValue('[name=sixHourTroponin]', "17")
           .click('button[type=submit]');

    var currentUrl = browser.url().value;
    expect(currentUrl).to.equal("http://localhost:3000/six-hour-myocardial-injury");

    var headerText = browser.getText("h2");
    expect(headerText).to.contain("Myocardial injury or infarction");

    var headerText = browser.getText("main");
    expect(headerText).to.contain("Referral to cardiology for inpatient assessment");
  });

  it('(male AND 6 hour troponin > 34) routes to MI', function() {
    browser.url("localhost:3000/baseline-troponin")
           .waitForExist("div");

    browser.setValue('[name=baselineTroponin]', "14")
           .click('input[value="male"]')
           .click('button[type=submit]')
           .waitForExist("div");

    browser.setValue('[name=threeHourTroponin]', "17")
           .click('button[type=submit]');

    browser.setValue('[name=sixHourTroponin]', "35")
           .click('button[type=submit]');

    var currentUrl = browser.url().value;
    expect(currentUrl).to.equal("http://localhost:3000/six-hour-myocardial-injury");
  });

  it("does not go to straight to six hour without a baseline trop", function() {
    browser.url("localhost:3000/6-hour-troponin")
           .waitForExist("div");

    var currentUrl = browser.url().value
    expect(currentUrl).to.equal("http://localhost:3000/initial-assessment")
  });
});
