const express = require('express');

const router = express.Router();

const { registerUser, 
    loginUser, 
    logout, 
    forgotPassword, 
    resetPassword, 
    getUserProfile, 
    updatePassword,
    upadateProfile,
    allUsers,
    getUserDetails,
    upadateUserProfile,
    deleteUser
}  = require('../controllers/authController');
const { isAuthenticated,authorizeRoles } = require('../middleware/auth');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router.route('/logout').get(logout);

router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);

router.route('/profile').get(isAuthenticated,getUserProfile);

router.route('/password/update').put(isAuthenticated,updatePassword);

router.route('/profile/update').put(isAuthenticated,upadateProfile);

router.route('/admin/users').get(isAuthenticated,authorizeRoles('admin'),allUsers);

router.route('/admin/user/:id').get(isAuthenticated,authorizeRoles('admin'),getUserDetails)
                               .put(isAuthenticated,authorizeRoles('admin'),upadateUserProfile)
                               .delete(isAuthenticated,authorizeRoles('admin'),deleteUser);
module.exports = router;