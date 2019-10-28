const router = require("express").Router();

const homeController = require("../controller/home");

router.get("/", homeController.index);
router.get("/admin", homeController.admin);

router.get("/user/login", homeController.userLogin);
router.get("/customer/login", homeController.customerLogin);
router.get("/signup", homeController.signup);
router.get("/logout", homeController.logout);

router.use("/user", require("./user"));

module.exports = router;