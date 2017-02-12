Accounts.onCreateUser(function(options, user) {
  // Assigns about to the newly created user object
  user.about = options.about;


  if (user.services.facebook) {
    console.log(user.services.facebook.email)
    delete user.services.facebook.email
    console.log(user._id)
    Meteor.users.update({ _id: user._id },
                        { $unset: { email: 1,
                                    name: 1,
                                    first_name: 1,
                                    last_name: 1,
                                    link: 1,
                                    gender: 1,
                                    locale: 1,
                                    age_range: 1,
                                    profile: 1 }
                        })
  }

  // Returns the user object
  return user;
});
