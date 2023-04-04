import jwt from 'jsonwebtoken';
import { UnauthenticatedError } from '../errors/index.js';

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Αποτυχία Αυθεντικοποίησης (1.Auth Middleware)');
  }
  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET); // Εξακρίβωση αποδεικτικού
    const testUser = payload.userId === '642bd9123a69799ccf4c4364' // test user
    req.user = { userId: payload.userId, testUser }; // Αttach the user request object
    next();
  } catch (error) {
    throw new UnauthenticatedError('Αποτυχία Αυθεντικοποίησης (2.Auth Middleware)');
  }
};

export default auth;
