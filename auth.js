// sets up Passport with a local authentication strategy, using a Person model for usd

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Person = require('./models/Person.js');

passport.use(
  new localStrategy(async (username, password, done) => {
    // authentication logic here
    try {
      // console.log('Recieved credential', username, password);
      const user = await Person.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const isPasswordMatch = await user.comparePassword(password);
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password" });
      }
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = passport; // Export configured passport