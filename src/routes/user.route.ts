/** source/routes/Users.ts */
import express from "express";
import usersController from "../controllers/users.controller";
import usersValidator from "../validator/users.validator";
const router = express.Router();

router.post("/users", usersValidator.createUser, usersController.addUser);
router.get("/users", usersController.getUsers);
router.get("/users/:userId", usersController.getUser);
// router.put("/users/:id", controller.updateUser);
// router.delete("/users/:id", controller.deleteUser);

// router.post("/tokens", controller.addUser);

export = router;
