// backend/controllers/institutionController.js
const Institution = require("../models/institutionModel");
const Room = require("../models/roomModel");

async function getInstitutions(req, res) {
  try {
    const institutions = await Institution.getAllInstitutions();
    res.json(institutions);
  } catch (err) {
    console.error("Error getInstitutions:", err);
    res.status(500).json({ error: "Error al obtener las instituciones" });
  }
}

async function getInstitution(req, res) {
  try {
    const { id } = req.params;
    const institution = await Institution.getInstitutionById(id);
    if (!institution) {
      return res.status(404).json({ error: "Institución no encontrada" });
    }
    res.json(institution);
  } catch (err) {
    console.error("Error getInstitution:", err);
    res.status(500).json({ error: "Error al obtener la institución" });
  }
}

// Extra: salas de una institución
async function getRoomsFromInstitution(req, res) {
  try {
    const { id } = req.params;
    const institution = await Institution.getInstitutionById(id);
    if (!institution) {
      return res.status(404).json({ error: "Institución no encontrada" });
    }

    const rooms = await Room.getRoomsByInstitutionId(id);
    res.json({
      institution,
      rooms
    });
  } catch (err) {
    console.error("Error getRoomsFromInstitution:", err);
    res.status(500).json({ error: "Error al obtener las salas" });
  }
}

module.exports = {
  getInstitutions,
  getInstitution,
  getRoomsFromInstitution
};
