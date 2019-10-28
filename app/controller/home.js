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
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};
		res.render('admin');
	},
	userLogin: (req, res) => {
		if(req.user){
			res.redirect("/");
		};
		res.render('customer/login', { message: req.flash('loginMessage')});
	},
	customerLogin: (req, res) => {
		if(req.user){
			res.redirect("/");
		};
		res.render('user/login', { message: req.flash('loginMessage')});
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