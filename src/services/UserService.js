import bcrypt from 'bcryptjs';
import TokenManager from '../utils/TokenManager.js';
import UserModel from '../models/User.js';

class UserService {
  async register(userData) {
    const user = await UserModel.findUserByEmail(userData.email);
    if (user) throw new Error('El email ya está registrado');
    
    return await UserModel.createUser(userData);
  }

  async login(email, password) {
    const user = await UserModel.findUserByEmail(email);
    if (!user) throw new Error('Usuario no encontrado');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Contraseña incorrecta');

    const payload = { id: user._id, name: user.name };
    const token = TokenManager.generateToken(payload);
    return { token: `Bearer ${token}` };
  }

  async getUserById(id) {
    return await UserModel.findUserById(id);
  }
}

export default new UserService();
