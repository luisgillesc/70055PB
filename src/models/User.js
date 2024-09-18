import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

class UserModel {
  constructor() {
    const UserSchema = new Schema({
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      date: { type: Date, default: Date.now }
    });

    UserSchema.pre('save', function(next) {
      const user = this;
      if (!user.isModified('password')) return next();

      bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) return next(err);
          user.password = hash;
          next();
        });
      });
    });

    this.User = mongoose.model('User', UserSchema);
  }

  async createUser(userData) {
    const newUser = new this.User(userData);
    return await newUser.save();
  }

  async findUserByEmail(email) {
    return await this.User.findOne({ email });
  }

  async findUserById(id) {
    return await this.User.findById(id);
  }
}

export default new UserModel();