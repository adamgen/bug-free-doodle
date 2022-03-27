/** source/routes/Users.ts */
import express from "express";
import usersController from "../controllers/auth.controller";
import usersValidator from "../validator/users.validator";
const router = express.Router();

router.post("/register", usersValidator.createUser, usersController.register);
router.post("/login", usersController.login);
router.put("/users/:userId", usersController.validationToken);
// router.put("/users/:id", controller.updateUser);
// router.delete("/users/:id", controller.deleteUser);

export = router;
