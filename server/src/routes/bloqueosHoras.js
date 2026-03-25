const express     = require("express");
const router      = express.Router();
const { pool }    = require("../lib/db");
const verifyToken = require("../middlewares/verifyToken");
const requireRole = require("../middlewares/requireRole");

// GET /bloqueos-horas?fechaISO=YYYY-MM-DD — público
router.get("/", async (req, res) => {
  try {
    const { fechaISO } = req.query;
    let rows;

    if (fechaISO) {
      ({ rows } = await pool.query(
        `SELECT id, fecha, hora, motivo FROM bloqueos_horas
         WHERE fecha = $1 ORDER BY hora`,
        [fechaISO]
      ));
    } else {
      ({ rows } = await pool.query(
        `SELECT id, fecha, hora, motivo FROM bloqueos_horas
         ORDER BY fecha DESC, hora ASC`
      ));
    }

    return res.json({ ok: true, bloqueos: rows });
  } catch (err) {
    console.error("Error GET /bloqueos-horas:", err);
    return res.status(500).json({ ok: false, error: "Error al obtener bloqueos" });
  }
});

// POST /bloqueos-horas — solo admin
router.post(
  "/",
  verifyToken,
  requireRole(["admin", "ayudante", "developer"]),
  async (req, res) => {
    try {
      const { fechaISO, hora, motivo = "Bloqueo manual" } = req.body;

      if (!fechaISO || !hora) {
        return res.status(400).json({ ok: false, error: "'fechaISO' y 'hora' son obligatorios" });
      }

      await pool.query(
        `INSERT INTO bloqueos_horas (fecha, hora, motivo)
         VALUES ($1, $2, $3)
         ON CONFLICT (fecha, hora) DO NOTHING`,
        [fechaISO, hora, motivo]
      );

      const { rows } = await pool.query(
        `SELECT id, fecha, hora, motivo FROM bloqueos_horas
         WHERE fecha=$1 AND hora=$2 LIMIT 1`,
        [fechaISO, hora]
      );

      return res.status(201).json({ ok: true, bloqueo: rows[0] || null });
    } catch (err) {
      console.error("Error POST /bloqueos-horas:", err);
      return res.status(500).json({ ok: false, error: "Error al crear bloqueo" });
    }
  }
);

// DELETE /bloqueos-horas/:fechaISO/:hora — solo admin
router.delete(
  "/:fechaISO/:hora",
  verifyToken,
  requireRole(["admin", "ayudante", "developer"]),
  async (req, res) => {
    try {
      const { fechaISO, hora } = req.params;
      await pool.query(
        `DELETE FROM bloqueos_horas WHERE fecha=$1 AND hora=$2`,
        [fechaISO, decodeURIComponent(hora)]
      );
      return res.json({ ok: true });
    } catch (err) {
      console.error("Error DELETE /bloqueos-horas:", err);
      return res.status(500).json({ ok: false, error: "Error al eliminar bloqueo" });
    }
  }
);

module.exports = router;