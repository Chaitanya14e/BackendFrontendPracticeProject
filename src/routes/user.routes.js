import {Router} from 'express'
import { verifyJwt } from '../middlewares/auth.middleware.js';
import {
    loginUser, 
    logoutUser, 
    registerUser, 
    refreshAccessToken, 
    changePassword, 
    updateAccountDetails, 
    getCurrentUser 
} from '../controllers/user.controller.js';
const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(verifyJwt,logoutUser);
router.route('/refresh-token').post(refreshAccessToken);
router.route('/change-password').post(verifyJwt,changePassword);
router.route('/update-account').put(verifyJwt,updateAccountDetails);
router.route('/get-current-user').get(verifyJwt,getCurrentUser);

export default router;