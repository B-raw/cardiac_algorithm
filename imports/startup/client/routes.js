import { FlowRouter } from "meteor/kadira:flow-router";
import { BlazeLayout } from "meteor/kadira:blaze-layout";
import { clearAllSessions } from "./helpers/clearSessionHelper"

// IMPORTING VIEWS (JS FILES)
import '../../ui/layouts/mainLayout.js';

FlowRouter.route('/', {
  name: 'home',
  action() {
    clearAllSessions();

    BlazeLayout.render("mainLayout", { content: "Frontpage" });
  }
});

FlowRouter.route('/about', {
  name: 'about',
  action() {
    BlazeLayout.render("mainLayout", { content: "About" });
  }
});

FlowRouter.route('/signup', {
  name: 'signup',
  action() {
    BlazeLayout.render("mainLayout", { content: "Signup" });
  }
});

FlowRouter.route('/login', {
  name: 'login',
  action() {
    BlazeLayout.render("mainLayout", { content: "Login" });
  }
});

FlowRouter.route('/terms-conditions', {
  name: 'terms-conditions',
  action() {
    BlazeLayout.render("mainLayout", { content: "TermsConditions" });
  }
});

FlowRouter.route('/privacy-policy', {
  name: 'privacy-policy',
  action() {
    BlazeLayout.render("mainLayout", { content: "PrivacyPolicy" });
  }
});

FlowRouter.route('/pathway', {
  name: 'pathway',
  action() {
    BlazeLayout.render("mainLayout", { content: "Pathway" });
  }
});

FlowRouter.route('/funding', {
  name: 'funding',
  action() {
    BlazeLayout.render("mainLayout", { content: "Funding" });
  }
});

FlowRouter.route('/initial-assessment', {
  name: 'initial-assessment',
  action() {
    BlazeLayout.render("mainLayout", { content: "InitialAssessment" });
  }
});

FlowRouter.route('/st-elevation', {
  name: 'stElevation',
  action() {
    BlazeLayout.render("mainLayout", { content: "STElevation" });
  }
});

FlowRouter.route('/non-st-elevation', {
  name: 'nonSTElevation',
  action() {
    BlazeLayout.render("mainLayout", { content: "NonSTElevation" });
  }
});

FlowRouter.route('/baseline-troponin', {
  name: 'baselineTroponin',
  action() {
    BlazeLayout.render("mainLayout", { content: "BaselineTroponin" });
  }
});

FlowRouter.route('/mi-ruled-out', {
  name: 'miRuledOut',
  action() {
    BlazeLayout.render("mainLayout", { content: "MIRuledOut" });
  }
});

FlowRouter.route('/six-hour-mi-ruled-out', {
  name: 'sixHourMiRuledOut',
  action() {
    BlazeLayout.render("mainLayout", { content: "SixHourMIRuledOut" });
  }
});

FlowRouter.route('/myocardial-injury', {
  name: 'myocardialInjury',
  action() {
    BlazeLayout.render("mainLayout", { content: "MyocardialInjury" });
  }
});

FlowRouter.route('/six-hour-myocardial-injury', {
  name: 'sixHourMyocardialInjury',
  action() {
    BlazeLayout.render("mainLayout", { content: "SixHourMyocardialInjury" });
  }
});

FlowRouter.route('/3-hour-troponin', {
  name: 'threeHourTroponin',
  action() {
    if(!Session.get('baselineTroponin')) {
      FlowRouter.go('initial-assessment');
    }
    BlazeLayout.render("mainLayout", { content: "ThreeHourTroponin" });
  }
});

FlowRouter.route('/6-hour-troponin', {
  name: 'sixHourTroponin',
  action() {
    if(!Session.get('baselineTroponin') || !Session.get('threeHourTroponin')) {
      FlowRouter.go('initial-assessment');
    }
    BlazeLayout.render("mainLayout", { content: "SixHourTroponin" });
  }
});

FlowRouter.route('/cases/new', {
  name: 'newCase',
  action() {
    BlazeLayout.render("mainLayout", { content: "NewCase" });
  }
});

FlowRouter.route('/cases/new/investigations', {
  name: 'caseInvestigations',
  action() {
    BlazeLayout.render("mainLayout", { content: "CaseInvestigations" });
  }
});

FlowRouter.route('/cases', {
  name: 'cases',
  action() {
    BlazeLayout.render("mainLayout", { content: "Cases" });
  }
});
