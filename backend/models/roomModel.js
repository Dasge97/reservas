// backend/models/roomModel.js
const pool = require("../config/db");

// Salas de una institución
async function getRoomsByInstitutionId(institutionId) {
  const [rows] = await pool.query(
    "SELECT * FROM rooms WHERE institution_id = ?",
    [institutionId]
  );
  return rows;
}

// Sala por id
async function getRoomById(id) {
  const [rows] = await pool.query("SELECT * FROM rooms WHERE id = ?", [id]);
  return rows[0] || null;
}

module.exports = {
  getRoomsByInstitutionId,
  getRoomById
};
