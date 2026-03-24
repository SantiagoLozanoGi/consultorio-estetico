const express = require("express");
const router = express.Router();
const { pool } = require("../lib/db");

router.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, titulo, descripcion, detalle, imagen, fecha
       FROM charlas ORDER BY fecha DESC`
    );
    res.json({ ok: true, charlas: rows });
  } catch (err) {
    console.error("Error GET /charlas:", err);
    res.status(500).json({ ok: false, error: "Error al obtener charlas" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { titulo, descripcion, detalle, imagen, fecha } = req.body;
    if (!titulo || !descripcion || !detalle || !imagen) {
      return res.status(400).json({ ok: false, error: "Campos obligatorios faltantes" });
    }

    const { rows } = await pool.query(
      `INSERT INTO charlas (titulo, descripcion, detalle, imagen, fecha)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [titulo, descripcion, detalle, imagen, fecha ?? null]
    );
    res.status(201).json({ ok: true, charla: rows[0] });
  } catch (err) {
    console.error("Error POST /charlas:", err);
    res.status(500).json({ ok: false, error: "Error al crear charla" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;

    if (!Object.keys(datos).length) {
      return res.status(400).json({ ok: false, error: "No hay datos para actualizar" });
    }

    const campos = [];
    const valores = [];

    Object.entries(datos).forEach(([key, value]) => {
      campos.push(`${key} = $${valores.length + 1}`);
      valores.push(value);
    });

    valores.push(id);
    const { rows } = await pool.query(
      `UPDATE charlas SET ${campos.join(", ")} WHERE id = $${valores.length} RETURNING *`,
      valores
    );
    res.json({ ok: true, charla: rows[0] });
  } catch (err) {
    console.error("Error PUT /charlas:", err);
    res.status(500).json({ ok: false, error: "Error al actualizar charla" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM charlas WHERE id = $1", [req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    console.error("Error DELETE /charlas:", err);
    res.status(500).json({ ok: false, error: "Error al eliminar charla" });
  }
});

module.exports = router;