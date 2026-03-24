const express = require("express");
const router = express.Router();
const { pool } = require("../lib/db");

router.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, mes, anio, "fechaGeneracion",
              "totalOnline", "totalConsultorio", "totalEsperado", "archivoURL"
       FROM reportes_mensuales
       ORDER BY "fechaGeneracion" DESC`
    );
    return res.json({ ok: true, reportes: rows });
  } catch (err) {
    console.error("Error GET /reportes:", err);
    return res.status(500).json({ ok: false, error: "Error al obtener reportes" });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      mes,
      anio,
      totalOnline = 0,
      totalConsultorio = 0,
      totalEsperado = 0,
      archivoURL = null,
    } = req.body;

    if (!mes || !anio) {
      return res.status(400).json({ ok: false, error: "Campos 'mes' y 'anio' son obligatorios" });
    }

    // UPSERT PostgreSQL
    const { rows } = await pool.query(
      `INSERT INTO reportes_mensuales
         (mes, anio, "totalOnline", "totalConsultorio", "totalEsperado", "archivoURL")
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (mes, anio) DO UPDATE SET
         "totalOnline"       = EXCLUDED."totalOnline",
         "totalConsultorio"  = EXCLUDED."totalConsultorio",
         "totalEsperado"     = EXCLUDED."totalEsperado",
         "archivoURL"        = EXCLUDED."archivoURL",
         "fechaGeneracion"   = NOW()
       RETURNING *`,
      [mes, anio, totalOnline, totalConsultorio, totalEsperado, archivoURL]
    );

    return res.status(201).json({ ok: true, reporte: rows[0] });
  } catch (err) {
    console.error("Error POST /reportes:", err);
    return res.status(500).json({ ok: false, error: "Error al guardar reporte" });
  }
});

module.exports = router;