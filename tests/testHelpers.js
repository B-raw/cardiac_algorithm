export function signUp(browserName, username, email, password){
  browserName.url("localhost:3000");
  browserName.waitForExist("#login-sign-in-link");
  browserName.click("#login-sign-in-link")
             .click("#signup-link")
             .setValue('#login-username', username)
             .setValue('#login-email', email)
             .setValue('#login-password', password)
             .click('#login-buttons-password');
}

export function signIn(browserName, email, password) {
  browserName.execute(function(email, password){
    Meteor.loginWithPassword(email, password);
  }, email, password);
}

export function getBrowser(i) {
  return browser.instances[i];
}

export function signUpAndSignIn(browserName, username, email, password) {
  signUp(browserName, username, email, password);
  signIn(browserName, email, password);
}

export function cleanDatabase() {
  server.execute(function () {
    Package['xolvio:cleaner'].resetDatabase();
  });
}

export function getText(browserName, element, elementId) {
  var text = browserName.element(element);
  return text.getText(elementId);
}
