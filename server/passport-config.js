import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';

const users = [{
  id: '1',
  userID: 'abc123',
  password: bcrypt.hashSync('1234', 10)
}];

export function initialize(passport) {
  const authenticateUser = (userID, password, done) => {
    const user = users.find(user => user.userID === userID);
    if (!user) {
      return done(null, false, { message: 'No user with that ID' });
    }

    if (bcrypt.compareSync(password, user.password)) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Password incorrect' });
    }
  };

  passport.use(new LocalStrategy({ usernameField: 'userID' }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    const user = users.find(user => user.id === id);
    return done(null, user);
  });
}
