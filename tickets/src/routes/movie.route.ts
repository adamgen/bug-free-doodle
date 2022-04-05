/** source/routes/Movies.ts */
import express from "express";
import movieController from "../controllers/movie.controller";
import usersValidator from "../middleware/validator/users.validator";
const router = express.Router();

router.post("/", movieController.addMovie);
router.get("/", movieController.getMovies);
router.get("/:id", movieController.getMovie);
// router.put("/users/:id", controller.updateMovie);
// router.delete("/users/:id", controller.deleteMovie);

// router.post("/tokens", controller.addMovie);

export = router;
