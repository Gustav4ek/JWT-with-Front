const Router = require("express").Router;
const UserController = require('../controllers/user-controller');
const {body} = require("express-validator")
const AuthMiddleware = require("../middlewares/auth-middleware");

const router = new Router;

router.post("/registration", body("email").isEmail(), body("password").isLength({min: 4, max: 8}),UserController.registration);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get("/activation/:link", UserController.activate);
router.get("/refresh", UserController.refresh);
router.get("/users", AuthMiddleware, UserController.getUsers);
module.exports = router;