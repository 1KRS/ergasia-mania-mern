import express from 'express'
import { registerUser, loginUser, updateUser} from '../controllers/authControllers.js'

const authRouter = express.Router()

authRouter.route('/register').post(registerUser);
authRouter.route('/login').post(loginUser);
authRouter.route('/update').patch(updateUser);

export default authRouter;