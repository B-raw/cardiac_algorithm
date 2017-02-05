import { signUpSignIn, getBrowser, cleanDatabase, addPost } from './testHelpers';

let mainBrowser;

describe('User registration', function () {

  beforeEach(function () {
    cleanDatabase();
  });

  it('shows registration required, new patient etc when logged out', function() {
    browser.url("localhost:3000/")
           .waitForExist("div");
    var actualText = browser.getText(".jumbotron");
    expect(actualText).to.include("New Patient");
    expect(actualText).to.include("Sign Up Required");
    expect(actualText).to.include("Test Patient");

    var headerText = browser.getText("nav");
    expect(headerText).to.include("Log In");
    expect(headerText).to.include("Sign Up");
  });

  it('shows sign up page when click on New Patient when logged out', function() {
    browser.url("localhost:3000/")
           .waitForExist("div");
    browser.click("#new-patient")
           .waitForExist("div");

    var currentUrl = browser.url().value
    expect(currentUrl).to.equal("http://localhost:3000/signup")


    var headerText = browser.getText("h3");
    expect(headerText).to.include("Sign Up");
  });

  it('shows sign up page when click on "Sign Up Required" when logged out', function() {
    browser.url("localhost:3000/")
           .waitForExist("div");
    browser.click("#signup-required")
           .waitForExist("div");

    var currentUrl = browser.url().value
    expect(currentUrl).to.equal("http://localhost:3000/signup")
  });

  it('shows sign up page when click sign up', function() {
    browser.url("localhost:3000/")
           .waitForExist("div");
    browser.click("#signup")
           .waitForExist("div");

    var currentUrl = browser.url().value
    expect(currentUrl).to.equal("http://localhost:3000/signup")

    var headerText = browser.getText("h3");
    expect(headerText).to.include("Sign Up");
  });

  it('can register a new user @watch', function() {
    signUpSignIn(browser, "Bruce", "Wayne", "batman@hotmail.com", "123321")

    var currentUrl = browser.url().value
    expect(currentUrl).to.equal("http://localhost:3000/")

    browser.waitForExist(".jumbotron");

    var jumboText = browser.getText(".jumbotron");
    expect(jumboText).to.include("New Patient");
    // expect(jumboText).to.not.include("Sign Up Required");
    expect(jumboText).to.include("Test Patient");

    var newNavText = browser.getText("nav");
    console.log(newNavText)
    expect(newNavText).to.include("Log Out");
    expect(newNavText).to.include("My Account");
  });

  describe('when logged in', function() {
    it('shows algorithm when click on "New Patient" @watch', function() {
      signUpSignIn(browser, "Bruce", "Wayne", "batman@hotmail.com", "123321")

      browser.click("#new-patient2")
             .waitForExist("div");

      var currentUrl = browser.url().value
      expect(currentUrl).to.equal("http://localhost:3000/initial-assessment")
    });
  });


});
