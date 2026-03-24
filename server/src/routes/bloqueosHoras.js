const express = require("express");
const router = express.Router();
const { pool } = require("../lib/db");

router.get("/", async (req, res) => {
  try {
    const { fechaISO } = req.query;
    let rows;

    if (fechaISO) {
      ({ rows } = await pool.query(
        `SELECT id, "fechaISO", hora, motivo FROM bloqueos_horas
         WHERE "fechaISO" = $1 ORDER BY hora`,
        [fechaISO]
      ));
    } else {
      ({ rows } = await pool.query(
        `SELECT id, "fechaISO", hora, motivo FROM bloqueos_horas
         ORDER BY "fechaISO" DESC, hora ASC`
      ));
    }

    return res.json({ ok: true, bloqueos: rows });
  } catch (err) {
    console.error("Error GET /bloqueos-horas:", err);
    return res.status(500).json({ ok: false, error: "Error al obtener bloqueos de horas" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { fechaISO, hora, motivo = "Bloqueo manual" } = req.body;

    if (!fechaISO || !hora) {
      return res.status(400).json({ ok: false, error: "Los campos 'fechaISO' y 'hora' son obligatorios" });
    }

    await pool.query(
      `INSERT INTO bloqueos_horas ("fechaISO", hora, motivo)
       VALUES ($1, $2, $3)
       ON CONFLICT ("fechaISO", hora) DO NOTHING`,
      [fechaISO, hora, motivo]
    );

    const { rows } = await pool.query(
      `SELECT id, "fechaISO", hora, motivo FROM bloqueos_horas
       WHERE "fechaISO" = $1 AND hora = $2 LIMIT 1`,
      [fechaISO, hora]
    );

    return res.status(201).json({ ok: true, bloqueo: rows[0] || null });
  } catch (err) {
    console.error("Error POST /bloqueos-horas:", err);
    return res.status(500).json({ ok: false, error: "Error al crear bloqueo de hora" });
  }
});

router.delete("/:fechaISO/:hora", async (req, res) => {
  try {
    const { fechaISO, hora } = req.params;
    await pool.query(
      `DELETE FROM bloqueos_horas WHERE "fechaISO" = $1 AND hora = $2`,
      [fechaISO, hora]
    );
    return res.json({ ok: true });
  } catch (err) {
    console.error("Error DELETE /bloqueos-horas:", err);
    return res.status(500).json({ ok: false, error: "Error al eliminar bloqueo de hora" });
  }
});

module.exports = router;