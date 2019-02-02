import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
const router = new Router();

// Save a user
router.route('/user/add').post(UserController.addUser);

// authenticate User
router.route('/user/auth').post(UserController.authenticateUser);

// check User Existance
router.route('/user/checkExistance').post(UserController.checkUserExistance);

export default router;
