describe('Three Hour Troponin', function() {
  it('(3 hour troponin change <3 AND <= 16 in woman) routes to MI ruled out', function() {
    browser.url("localhost:3000/baseline-troponin")
           .waitForExist("h2");

    browser.setValue('[name=baselineTroponin]', "12")
           .click('input[value="female"]')
           .click('button[type=submit]')
           .waitForExist("h2");

    browser.setValue('[name=threeHourTroponin]', "14")
           .click('button[type=submit]');

    var currentUrl = browser.url().value
    expect(currentUrl).to.equal("http://localhost:3000/mi-ruled-out")

    var headerText = browser.getText("h2");
    expect(headerText).to.equal("Myocardial infarction ruled out");
  });

  it('(3 hour troponin change <3 AND <= 34 in man) routes to MI ruled out', function() {
    browser.url("localhost:3000/baseline-troponin")
           .waitForExist("h2");

    browser.setValue('[name=baselineTroponin]', "16")
           .click('input[value="male"]')
           .click('button[type=submit]')
           .waitForExist("h2");

    browser.setValue('[name=threeHourTroponin]', "18")
           .click('button[type=submit]');

    var currentUrl = browser.url().value
    expect(currentUrl).to.equal("http://localhost:3000/mi-ruled-out")

    var headerText = browser.getText("h2");
    expect(headerText).to.equal("Myocardial infarction ruled out");
  });

  it('(female AND 3 hour troponin > 16) routes to MI', function() {
    browser.url("localhost:3000/baseline-troponin")
           .waitForExist("h2");

    browser.setValue('[name=baselineTroponin]', "12")
           .click('input[value="female"]')
           .click('button[type=submit]')
           .waitForExist("h2");

    browser.setValue('[name=threeHourTroponin]', "17")
           .click('button[type=submit]');

    var currentUrl = browser.url().value
    expect(currentUrl).to.equal("http://localhost:3000/myocardial-injury")

    var headerText = browser.getText("h2");
    expect(headerText).to.contain("Myocardial injury or infarction");
  });

  it('(male AND 3 hour troponin > 34) routes to MI', function() {
    browser.url("localhost:3000/baseline-troponin")
           .waitForExist("h2");

    browser.setValue('[name=baselineTroponin]', "12")
           .click('input[value="male"]')
           .click('button[type=submit]')
           .waitForExist("h2");

    browser.setValue('[name=threeHourTroponin]', "35")
           .click('button[type=submit]');

    var currentUrl = browser.url().value
    expect(currentUrl).to.equal("http://localhost:3000/myocardial-injury")

    var headerText = browser.getText("h2");
    expect(headerText).to.contain("Myocardial injury or infarction");
  });

  it('(male AND  trop change is >3 AND 3 hour troponin is 30) routes to 6 hour trop', function() {
    browser.url("localhost:3000/baseline-troponin")
           .waitForExist("h2");

    browser.setValue('[name=baselineTroponin]', "12")
           .click('input[value="male"]')
           .click('button[type=submit]')
           .waitForExist("h2");

    browser.setValue('[name=threeHourTroponin]', "30")
           .click('button[type=submit]')
           .waitForExist("h2");

    var currentUrl = browser.url().value
    expect(currentUrl).to.equal("http://localhost:3000/6-hour-troponin")

    var headerText = browser.getText("h2");
    expect(headerText).to.contain("6 hour troponin");
  });

  it('(female AND trop change is >3 AND 3 hour troponin is 15) routes to 6 hour trop', function() {
    browser.url("localhost:3000/baseline-troponin")
           .waitForExist("h2");

    browser.setValue('[name=baselineTroponin]', "6")
           .click('input[value="female"]')
           .click('button[type=submit]')
           .waitForExist("h2");

    browser.setValue('[name=threeHourTroponin]', "12")
           .click('button[type=submit]')
           .waitForExist("h2");

    var currentUrl = browser.url().value
    expect(currentUrl).to.equal("http://localhost:3000/6-hour-troponin")

    var headerText = browser.getText("h2");
    expect(headerText).to.contain("6 hour troponin");
  });

  it("does not go to straight to three hour without a baseline trop @watch", function() {
    browser.url("localhost:3000/3-hour-troponin")
           .waitForExist("h2");

    var currentUrl = browser.url().value
    expect(currentUrl).to.equal("http://localhost:3000/initial-assessment")
  });

});
