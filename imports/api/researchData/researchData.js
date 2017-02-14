import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Accounts } from 'meteor/accounts-base';

export const Cases = new Mongo.Collection('cases');

if (Meteor.isServer) {
  Meteor.publish('cases', function casesPublication() {
    return Cases.find({ userId: this.userId });
  });
}
