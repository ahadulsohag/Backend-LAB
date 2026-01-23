const authService = require('../services/authService');
const jwt = require('../utils/jwt');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const result = await authService.register(name, email, password);
    
    if (result.error) {
      return res.status(400).json({ message: result.error });
    }

    const token = jwt.generateToken(result.user);

    res.status(201).json({
      message: 'User registered successfully',
      user: result.user,
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const result = await authService.login(email, password);
    
    if (result.error) {
      return res.status(401).json({ message: result.error });
    }

    const token = jwt.generateToken(result.user);

    res.status(200).json({
      message: 'Login successful',
      user: result.user,
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  register,
  login,
  logout
};