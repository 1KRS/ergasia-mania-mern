import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';

const registerUser = async (req, res, next) => {
  const user = await User.create(req.body);
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      lastName: user.lastName,
      location: user.location,
      email: user.email,
    },
    token,
    location: user.location,
  });
};
const loginUser = async (req, res) => {
  res.send('Login User');
};
const updateUser = async (req, res) => {
  res.send('Update User');
};

export { registerUser, loginUser, updateUser };
