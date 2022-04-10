/** source/routes/Shows.ts */
import express from "express";
import showController from "../controllers/show.controller";
import usersValidator from "../middleware/validator/users.validator";
const router = express.Router();

router.post("/", showController.addShow);
router.get("/", showController.getShows);
router.get("/:id", showController.getShow);
// router.put("/users/:id", controller.updateShow);
// router.delete("/users/:id", controller.deleteShow);

// router.post("/tokens", controller.addShow);

export = router;
