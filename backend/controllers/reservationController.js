// backend/controllers/reservationController.js
const Reservation = require("../models/reservationModel");
const Room = require("../models/roomModel");

// Crear nueva reserva
async function createReservation(req, res) {
  try {
    const { room_id, full_name, date, start_time, end_time } = req.body;

    if (!room_id || !full_name || !date || !start_time || !end_time) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const room = await Room.getRoomById(room_id);
    if (!room) {
      return res.status(404).json({ error: "Sala no encontrada" });
    }

    // Aquí podrías hacer comprobación de solapamiento de horarios
    // (para la práctica de clase incluso puedes dejar un TODO)

    const newReservation = await Reservation.createReservation({
      room_id,
      full_name,
      date,
      start_time,
      end_time
    });

    res.status(201).json(newReservation);
  } catch (err) {
    console.error("Error createReservation:", err);
    res.status(500).json({ error: "Error al crear la reserva" });
  }
}

module.exports = {
  createReservation
};
