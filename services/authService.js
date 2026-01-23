const User = require('../models/User');

const register = async (name, email, password) => {
  try {
    const existingUser = await User.findByEmail(email);
    
    if (existingUser) {
      return { error: 'User already exists with this email' };
    }

    const user = new User({
      name,
      email,
      password
    });

    await user.save();

    return { user: user.toJSON() };
  } catch (error) {
    return { error: error.message };
  }
};

const login = async (email, password) => {
  try {
    const user = await User.findByEmail(email);
    
    if (!user) {
      return { error: 'Invalid email or password' };
    }

    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      return { error: 'Invalid email or password' };
    }

    return { user: user.toJSON() };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = {
  register,
  login
};