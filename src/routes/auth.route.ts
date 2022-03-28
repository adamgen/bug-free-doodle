/** source/routes/Users.ts */
import express from "express";
import usersController from "../controllers/auth.controller";
import usersValidator from "../middleware/validator/users.validator";
import logoutMiddleware from "../middleware/logout.middleware";
const router = express.Router();

router.post("/register", usersValidator.createUser, usersController.register);
router.post("/login", usersValidator.loginUser, usersController.login);
router.get("/currentuser", usersController.currentuser);
router.delete("/logout", logoutMiddleware.logout, usersController.logout);
router.put("/users/:userId", usersController.validationToken);
// router.put("/users/:id", controller.updateUser);
// router.delete("/users/:id", controller.deleteUser);

export = router;
