/** source/routes/Users.ts */
import express from "express";
import usersController from "../controllers/user.controller";
import usersValidator from "../middleware/validator/users.validator";
import verifyMiddleware from "../middleware/verify.middleware";
const router = express.Router();

//FIXME
//init user without verify
router.post("/", usersValidator.createUser, usersController.addUser);

router.get("/", verifyMiddleware.verify, usersController.getUsers);
router.get("/:userId", verifyMiddleware.verify, usersController.getUser);
router.put("/:userId", usersController.updateUser);
router.delete("/:userId", usersController.removeUser);
// router.put("/users/:id", controller.updateUser);
// router.delete("/users/:id", controller.deleteUser);

// router.post("/tokens", controller.addUser);

export = router;
