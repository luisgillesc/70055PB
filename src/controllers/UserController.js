import UserService from '../services/UserService.js';

class UserController {
  async register(req, res) {
    try {
      const newUser = await UserService.register(req.body);
      res.json(newUser);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const tokenData = await UserService.login(email, password);
      res.json(tokenData);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async protectedRoute(req, res) {
    try {
      const user = await UserService.getUserById(req.user.id);
      res.json({ message: 'Acceso concedido', user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

export default new UserController();
