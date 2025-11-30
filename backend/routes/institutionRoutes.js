// backend/routes/institutionRoutes.js
const express = require("express");
const router = express.Router();
const institutionController = require("../controllers/institutionController");

// GET /api/institutions
router.get("/", institutionController.getInstitutions);

// GET /api/institutions/:id
router.get("/:id", institutionController.getInstitution);

// GET /api/institutions/:id/rooms
router.get("/:id/rooms", institutionController.getRoomsFromInstitution);

module.exports = router;
