import express from 'express'
import authenticateUser from '../middleware/auth.js';
import { registerUser, loginUser, updateUser} from '../controllers/authControllers.js'

const authRouter = express.Router()

authRouter.route('/registerUser').post(registerUser);
authRouter.route('/loginUser').post(loginUser);
authRouter.route('/updateUser').patch(authenticateUser, updateUser);

export default authRouter;