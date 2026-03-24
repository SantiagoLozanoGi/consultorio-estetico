const express = require("express");
const router = express.Router();
const { pool } = require("../lib/db");

router.get("/", async (_req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM procedimientos");
    return res.json({ ok: true, data: rows });
  } catch (err) {
    console.error("Error GET /procedimientos:", err);
    return res.status(500).json({ ok: false, error: "Error al obtener procedimientos" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { nombre, desc, precio, imagen, categoria, duracionMin, destacado } = req.body;

    const { rows } = await pool.query(
      `INSERT INTO procedimientos
         (nombre, "desc", precio, imagen, categoria, "duracionMin", destacado)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [nombre, desc, precio, imagen, categoria, duracionMin || null, destacado ? true : false]
    );

    return res.status(201).json({ ok: true, data: rows[0] });
  } catch (err) {
    console.error("Error POST /procedimientos:", err);
    return res.status(500).json({ ok: false, error: "Error al crear procedimiento" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, desc, precio, imagen, categoria, duracionMin, destacado } = req.body;

    const { rows } = await pool.query(
      `UPDATE procedimientos
       SET nombre = $1, "desc" = $2, precio = $3, imagen = $4,
           categoria = $5, "duracionMin" = $6, destacado = $7
       WHERE id = $8
       RETURNING *`,
      [nombre, desc, precio, imagen, categoria, duracionMin || null, destacado ? true : false, id]
    );

    return res.json({ ok: true, data: rows[0] });
  } catch (err) {
    console.error("Error PUT /procedimientos/:id:", err);
    return res.status(500).json({ ok: false, error: "Error al actualizar procedimiento" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM procedimientos WHERE id = $1", [req.params.id]);
    return res.json({ ok: true });
  } catch (err) {
    console.error("Error DELETE /procedimientos/:id:", err);
    return res.status(500).json({ ok: false, error: "Error al eliminar procedimiento" });
  }
});

module.exports = router;