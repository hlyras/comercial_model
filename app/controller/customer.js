const customerController = {
	index: (req, res) => {
		res.render('customer/index', { user: req.user });
	}
};

module.exports = customerController;