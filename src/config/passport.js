import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import UserService from '../services/UserService.js';
import keys from './keys.js';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.secretOrKey
};

export default function(passport) {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await UserService.getUserById(jwt_payload.id);
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (err) {
        return done(err, false);
      }
    })
  );
}
