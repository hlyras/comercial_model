const User = require('../model/user');
const userController = require('./user');

const homeController = {
	index: (req, res) => {
		if(req.user){
			return res.render('home', { user: req.user });
		};
		res.render('index', { message: req.flash('loginMessage')});
	},
	admin: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['Admin'])){
			return res.redirect('/');
		};
		res.render('admin');
	},
	login: (req, res) => {
		if(req.user){
			res.redirect("/");
		};
		res.render('login', { message: req.flash('loginMessage')});
	},
	signup: (req, res) => {
		if(req.user){
			res.redirect("/");
		};
		res.render('signup', { message: req.flash('signupMessage')});
	},
	logout: (req, res) => {
		req.logout();
		res.redirect('/');
	}
};

module.exports = homeController;