import { Meteor } from 'meteor/meteor';
import '../imports/startup/server';
import '../imports/startup/server/index';
import { configure } from '../imports/startup/server/modules/configure-services.js'

Meteor.startup(() => {
  configure();
});
