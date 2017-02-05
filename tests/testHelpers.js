export function signUp(browserName, firstName, lastName, email, password){
  browserName.url("localhost:3000")
             .waitForExist("#signup-required");
  browserName.click("#signup-required")
             .setValue('#firstName', firstName)
             .setValue('#lastName', lastName)
             .setValue('#email', email)
             .setValue('#password', password)
             .setValue('#organisation', "Royal Infirmary")
             .setValue('#profession', "Senior House Office")
             .click('#tsAndCs')
             .click('#login-submit')
             .waitForExist('.jumbotron');
}

export function signIn(browserName, email, password) {
  browserName.execute(function(email, password){
    Meteor.loginWithPassword(email, password);
  }, email, password);
}

export function getBrowser(i) {
  return browser.instances[i];
}

export function signUpSignIn(browserName, firstName, lastName, email, password) {
  signUp(browserName, firstName, lastName, email, password);
  signIn(browserName, email, password);
}

export function cleanDatabase() {
  server.execute(function () {
    Package['xolvio:cleaner'].resetDatabase();
  });
}
