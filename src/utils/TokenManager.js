import jwt from 'jsonwebtoken';
import keys from '../config/keys.js';

class TokenManager {
  generateToken(payload) {
    return jwt.sign(payload, keys.secretOrKey, { expiresIn: '1h' });
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, keys.secretOrKey);
    } catch (err) {
      throw new Error('Token inválido');
    }
  }
}

export default new TokenManager();
