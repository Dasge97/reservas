// backend/controllers/roomController.js
const Room = require("../models/roomModel");
const Reservation = require("../models/reservationModel");

async function getRoom(req, res) {
  try {
    const { id } = req.params;
    const room = await Room.getRoomById(id);
    if (!room) {
      return res.status(404).json({ error: "Sala no encontrada" });
    }

    // Parsear JSON de equipment si hace falta
    if (room.equipment && typeof room.equipment === "string") {
      try {
        room.equipment = JSON.parse(room.equipment);
      } catch {
        // si falla, se queda como string
      }
    }

    res.json(room);
  } catch (err) {
    console.error("Error getRoom:", err);
    res.status(500).json({ error: "Error al obtener la sala" });
  }
}

async function getRoomReservations(req, res) {
  try {
    const { id } = req.params;
    const { date } = req.query; // ?date=YYYY-MM-DD

    const room = await Room.getRoomById(id);
    if (!room) {
      return res.status(404).json({ error: "Sala no encontrada" });
    }

    const reservations = await Reservation.getReservationsByRoom(id, date || null);
    res.json({ room, reservations });
  } catch (err) {
    console.error("Error getRoomReservations:", err);
    res.status(500).json({ error: "Error al obtener las reservas de la sala" });
  }
}

module.exports = {
  getRoom,
  getRoomReservations
};
