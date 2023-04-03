import express from 'express'
import authenticateUser from '../middleware/auth.js';
import { registerUser, loginUser, updateUser} from '../controllers/authController.js'
import rateLimiter from 'express-rate-limit';

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 λεπτά
  max: 10,
  message: 'Πάρα πολλά αιτήματα από αυτήν την διεύθυνση IP, δοκιμάστε ξανά μετά από 15 λεπτά.'
})

const authRouter = express.Router()

authRouter.route('/registerUser').post(apiLimiter, registerUser);
authRouter.route('/loginUser').post(apiLimiter, loginUser);
authRouter.route('/updateUser').patch(authenticateUser, updateUser);

export default authRouter;