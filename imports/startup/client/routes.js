import { FlowRouter } from "meteor/kadira:flow-router";
import { BlazeLayout } from "meteor/kadira:blaze-layout";

// IMPORTING VIEWS (JS FILES)
import '../../ui/layouts/mainLayout.js';

FlowRouter.route('/', {
  name: 'home',
  action() {
    // if(!Meteor.userId()) {
    //   FlowRouter.go('home');
    // }
    BlazeLayout.render("mainLayout", { content: "Frontpage" });
  }
});

FlowRouter.route('/initial-assessment', {
  name: 'intial',
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

FlowRouter.route('/myocardial-injury', {
  name: 'myocardialInjury',
  action() {
    BlazeLayout.render("mainLayout", { content: "MyocardialInjury" });
  }
});

FlowRouter.route('/3-hour-troponin', {
  name: 'threeHourTroponin',
  action() {
    BlazeLayout.render("mainLayout", { content: "ThreeHourTroponin" });
  }
});
