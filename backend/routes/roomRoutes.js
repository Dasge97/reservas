// backend/routes/roomRoutes.js
const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");

// GET /api/rooms/:id
router.get("/:id", roomController.getRoom);

// GET /api/rooms/:id/reservations?date=YYYY-MM-DD
router.get("/:id/reservations", roomController.getRoomReservations);

module.exports = router;
