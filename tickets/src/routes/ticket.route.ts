/** source/routes/Tickets.ts */
import express from "express";
import usersController from "../controllers/ticket.controller";
import usersValidator from "../middleware/validator/users.validator";
const router = express.Router();

router.post("/", usersController.addTicket);
router.get("/", usersController.getTickets);
router.get("/:id", usersController.getTicket);
// router.put("/users/:id", controller.updateTicket);
// router.delete("/users/:id", controller.deleteTicket);

// router.post("/tokens", controller.addTicket);

export = router;
