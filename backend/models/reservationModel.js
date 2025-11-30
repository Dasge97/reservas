// backend/models/reservationModel.js
const pool = require("../config/db");

// Reservas de una sala (opcionalmente filtradas por fecha)
async function getReservationsByRoom(roomId, date = null) {
  let query = "SELECT * FROM reservations WHERE room_id = ?";
  const params = [roomId];

  if (date) {
    query += " AND date = ?";
    params.push(date);
  }

  const [rows] = await pool.query(query, params);
  return rows;
}

// Crear reserva nueva
async function createReservation({ room_id, full_name, date, start_time, end_time }) {
  const [result] = await pool.query(
    `INSERT INTO reservations (room_id, full_name, date, start_time, end_time, status)
     VALUES (?, ?, ?, ?, ?, 'confirmed')`,
    [room_id, full_name, date, start_time, end_time]
  );

  const [rows] = await pool.query("SELECT * FROM reservations WHERE id = ?", [
    result.insertId
  ]);
  return rows[0];
}

module.exports = {
  getReservationsByRoom,
  createReservation
};
