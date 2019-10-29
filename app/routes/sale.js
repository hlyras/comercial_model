const router = require("express").Router();

const saleController = require('../controller/sale');

//API ROUTES
router.get('/', saleController.index);

module.exports = router;