import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnauthenticatedError } from '../errors/index.js';

const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError('Συμπλήρωσε όλα τα πεδία.');
  }
  const user = await User.create({ name, email, password });
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
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Συμπλήρωσε όλα τα πεδία.');
  }

  const user = await User.findOne({ email }).select('+password'); // Ψάχνουμε τον χρήστη. Έπειτα προσθέτουμε και τον κωδικό χρήστη για να τον συγκρίνουμε παρακάτω.
  if (!user) {
    throw new UnauthenticatedError('Λάθος στοιχεία.');
  }

  const isPasswordCorrect = await user.comparePassword(password); // Συγκρίνουμε τους κωδικούς.
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Λάθος στοιχεία.');
  }

  const token = user.createJWT();
  user.password = undefined; // Για να μην συμπεριλάβουμε και τον κωδικό στο αντικείμενο που στέλνουμε πίσω.
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

const updateUser = async (req, res) => {
  console.log(req.user)
  res.send('Update User');
};

export { registerUser, loginUser, updateUser };
