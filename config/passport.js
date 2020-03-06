import passport from "passport";
import { GraphQLLocalStrategy } from "graphql-passport";
import { user } from "../src/models";

passport.serializeUser((req, user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (req, id, done) => {
  user.findById(id, (err, model) => {
    done(err, model);
  });
});

passport.use(
  new GraphQLLocalStrategy((email, password, done) => {
    user
      .findOne({ email: email.toLowerCase() })
      .where("deletedAt")
      .eq(null)
      .exec((err, model) => {
        if (err) {
          return done(err);
        }
        if (!model) {
          return done(
            {
              code: "WAR01",
              type: "warning",
              message: "Sorry, the email is not registered in the system."
            },
            false
          );
        }

        model.comparePassword(password, (err, isMatch) => {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return done(null, model);
          }
          return done(
            {
              code: "DAN01",
              type: "danger",
              message: "The email or password you entered is incorrect."
            },
            false
          );
        });
      });
  })
);

export default passport;
