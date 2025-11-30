// backend/models/institutionModel.js
const pool = require("../config/db");

// Obtener todas las instituciones
async function getAllInstitutions() {
  const [rows] = await pool.query("SELECT * FROM institutions");
  return rows;
}

// Obtener una institución por id
async function getInstitutionById(id) {
  const [rows] = await pool.query("SELECT * FROM institutions WHERE id = ?", [
    id
  ]);
  return rows[0] || null;
}

module.exports = {
  getAllInstitutions,
  getInstitutionById
};
