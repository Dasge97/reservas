// backend/routes/reservationRoutes.js
const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");

// POST /api/reservations
router.post("/", reservationController.createReservation);

module.exports = router;
