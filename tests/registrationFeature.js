import { signUpAndSignIn, getBrowser, cleanDatabase, addPost } from './testHelpers';

let mainBrowser;

describe('User registration', function () {

  beforeEach(function () {
    cleanDatabase();
  });

  it('shows registration required, new patient etc when not logged in @watch', function() {
    browser.url("localhost:3000/")
           .waitForExist("div");
    var actualText = browser.getText(".jumbotron");
    expect(actualText).to.include("New Patient");
    expect(actualText).to.include("Registration Required");
    expect(actualText).to.include("Test Patient");
    expect(actualText).to.include("No Registration Required");

    var headerText = browser.getText("nav");
    expect(headerText).to.include("Log In");
    expect(headerText).to.include("Register");
  });

  // it('shows registration page when click on New Patient', function() {
  //   browser.url("localhost:3000/")
  //          .waitForExist("div");
  //   browser.click("")
  //
  //   var actualText = browser.getText(".jumbotron");
  //   expect(actualText).to.include("New Patient");
  //   expect(actualText).to.include("Registration Required");
  //   expect(actualText).to.include("Test Patient");
  //   expect(actualText).to.include("No Registration Required");
  //
  //   var headerText = browser.getText("nav");
  //   expect(headerText).to.include("Log In");
  //   expect(headerText).to.include("Register");
  // });

});
