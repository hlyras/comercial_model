const router = require("express").Router();

const passport = require('../../config/passport');
const userController = require("../controller/user");

router.get('/', userController.verify, userController.index);

router.post('/login', passport.authenticate('local-login', { 
	failureRedirect: '/login',
	failureFlash: true
}), userController.login);

router.post('/signup', passport.authenticate('local-signup', { 
	failureRedirect: '/signup',
	failureFlash: true
}), userController.signup);

module.exports = router;