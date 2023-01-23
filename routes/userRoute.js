const express = require('express');
const {
    loginController,
    registerController,
    authController } = require('../controllers/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

//login||post
router.post('/login', loginController);
//register ||post
router.post('/register', registerController);
//Auth || POST
router.post('/getuserdata', authMiddleware, authController);
module.exports = router