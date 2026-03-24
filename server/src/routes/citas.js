const express = require("express");
const router = express.Router();
const { pool } = require("../lib/db");
const verifyToken = require("../middlewares/verifyToken");
const requireRole = require("../middlewares/requireRole");

// GET /citas
router.get("/", verifyToken, async (req, res) => {
  try {
    const { fecha } = req.query;
    const { id: userId, rol } = req.user;

    let sql = `
      SELECT id, "userId", nombres, apellidos, procedimiento, "tipoCita",
             fecha, hora, estado, pagado, monto, "fechaCreacion"
      FROM citas
    `;

    const values = [];
    const conditions = [];

    if (rol === "usuario") {
      conditions.push(`"userId" = $${values.length + 1}`);
      values.push(userId);
    }

    if (fecha) {
      conditions.push(`fecha = $${values.length + 1}`);
      values.push(fecha);
    }

    if (conditions.length) sql += " WHERE " + conditions.join(" AND ");
    sql += " ORDER BY fecha ASC, hora ASC";

    const { rows } = await pool.query(sql, values);
    res.json({ ok: true, citas: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false });
  }
});

// POST /citas
router.post(
  "/",
  verifyToken,
  requireRole(["usuario", "admin", "ayudante", "developer"]),
  async (req, res) => {
    try {
      const {
        userId,
        nombres,
        apellidos,
        telefono,
        correo,
        procedimiento,
        tipoCita,
        nota,
        fecha,
        hora,
      } = req.body;

      const ownerId = userId || req.user.id;

      // Verificar disponibilidad
      const { rows: ocupada } = await pool.query(
        `SELECT id FROM citas
         WHERE fecha = $1 AND hora = $2 AND estado NOT IN ('cancelada')`,
        [fecha, hora]
      );

      if (ocupada.length) {
        return res.status(409).json({ ok: false, error: "Hora no disponible" });
      }

      const { rows } = await pool.query(
        `INSERT INTO citas (
           "userId", nombres, apellidos, telefono, correo,
           procedimiento, "tipoCita", nota, fecha, hora,
           estado, pagado, "fechaCreacion"
         ) VALUES (
           $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
           'pendiente', false, NOW()
         ) RETURNING id`,
        [ownerId, nombres, apellidos, telefono, correo,
         procedimiento, tipoCita, nota ?? null, fecha, hora]
      );

      res.status(201).json({ ok: true, id: rows[0].id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ ok: false });
    }
  }
);

// PUT /citas/:id
router.put("/:id", verifyToken, async (req, res) => {
  const { rol, id: userId } = req.user;
  const { id } = req.params;

  try {
    if (rol === "usuario") {
      if (req.body.estado !== "cancelada") {
        return res.status(403).json({ ok: false });
      }
      await pool.query(
        `UPDATE citas SET estado = 'cancelada' WHERE id = $1 AND "userId" = $2`,
        [id, userId]
      );
      return res.json({ ok: true });
    }

    const allowed = ["fecha", "hora", "estado", "nota"];
    const sets = [];
    const values = [];

    for (const key of allowed) {
      if (req.body[key] !== undefined) {
        sets.push(`${key} = $${values.length + 1}`);
        values.push(req.body[key]);
      }
    }

    if (!sets.length) return res.status(400).json({ ok: false });

    values.push(id);
    await pool.query(
      `UPDATE citas SET ${sets.join(", ")} WHERE id = $${values.length}`,
      values
    );

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false });
  }
});

// POST /citas/:id/confirmar-pago
router.post(
  "/:id/confirmar-pago",
  verifyToken,
  requireRole(["admin", "developer"]),
  async (req, res) => {
    const { id } = req.params;
    const { monto } = req.body;

    if (!monto || monto <= 0) {
      return res.status(400).json({ ok: false });
    }

    await pool.query(
      `UPDATE citas
       SET pagado = true, monto = $1, estado = 'pagada',
           "fechaPago" = NOW(), "confirmadoPor" = $2
       WHERE id = $3`,
      [monto, req.user.id, id]
    );

    res.json({ ok: true });
  }
);

// DELETE /citas/:id
router.delete(
  "/:id",
  verifyToken,
  requireRole(["admin", "ayudante", "developer"]),
  async (req, res) => {
    await pool.query("DELETE FROM citas WHERE id = $1", [req.params.id]);
    res.json({ ok: true });
  }
);

module.exports = router;