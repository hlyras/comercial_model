const saleController = {
	index: (req, res) => {
		res.render('sale/index', { user: req.user });
	}
};

module.exports = saleController;