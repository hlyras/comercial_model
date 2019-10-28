const userController = {
	index: (req, res) => {
		res.render('user/profile', { user: req.user });
	},
	verify: (req, res, next) => {
		if (req.isAuthenticated()){ return next() };
		res.redirect('/login');
	},
	verifyAccess: async (req, res, access) => {
		if(req.isAuthenticated()){
			for(let i in access){
				if(access[i]==req.user.access){
					return true;
				};
			};
		};
		return false;
	},
	signup: (req, res) => {
		req.session.cookie.maxAge = 1000 * 60 * 30;
		res.redirect('/');
	},
	login: (req, res) => {
		req.session.cookie.maxAge = 1000 * 60 * 30;
		res.redirect('/');
	}
};

module.exports = userController;