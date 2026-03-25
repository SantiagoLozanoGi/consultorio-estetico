const express     = require("express");
const router      = express.Router();
const { pool }    = require("../lib/db");
const verifyToken = require("../middlewares/verifyToken");
const requireRole = require("../middlewares/requireRole");

// GET /citas
router.get("/", verifyToken, async (req, res) => {
  try {
    const { fecha } = req.query;
    const { id: userId, rol } = req.user;

    let sql = `
      SELECT id, user_id, nombres, apellidos, telefono, correo,
             procedimiento, tipo_cita, nota, fecha, hora,
             estado, pagado, monto, monto_pagado, monto_restante,
             metodo_pago, tipo_pago_consultorio, creado_en
      FROM citas
    `;
    const values = [];
    const conditions = [];

    // Usuario normal: solo ve sus propias citas
    if (rol === "usuario") {
      conditions.push(`user_id = $${values.length + 1}`);
      values.push(userId);
    }

    if (fecha) {
      conditions.push(`fecha = $${values.length + 1}`);
      values.push(fecha);
    }

    if (conditions.length) sql += " WHERE " + conditions.join(" AND ");
    sql += " ORDER BY fecha ASC, hora ASC";

    const { rows } = await pool.query(sql, values);
    return res.json({ ok: true, citas: rows });
  } catch (err) {
    console.error("Error GET /citas:", err);
    return res.status(500).json({ ok: false, error: "Error al obtener citas" });
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
        user_id, nombres, apellidos, telefono, correo,
        procedimiento, procedimiento_id, tipo_cita,
        nota, fecha, hora,
      } = req.body;

      const ownerId = user_id || req.user.id;

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
           user_id, nombres, apellidos, telefono, correo,
           procedimiento, procedimiento_id, tipo_cita,
           nota, fecha, hora, estado, pagado
         ) VALUES (
           $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,'pendiente',false
         ) RETURNING id`,
        [ownerId, nombres, apellidos || "", telefono || "",
         correo || "", procedimiento, procedimiento_id || null,
         tipo_cita || "valoracion", nota || null, fecha, hora]
      );

      return res.status(201).json({ ok: true, id: rows[0].id });
    } catch (err) {
      console.error("Error POST /citas:", err);
      return res.status(500).json({ ok: false, error: "Error al crear cita" });
    }
  }
);

// PUT /citas/:id
router.put("/:id", verifyToken, async (req, res) => {
  const { rol, id: userId } = req.user;
  const { id } = req.params;

  try {
    if (rol === "usuario") {
      // Usuario solo puede cancelar sus propias citas
      if (req.body.estado !== "cancelada") {
        return res.status(403).json({ ok: false, error: "Solo puedes cancelar tus propias citas" });
      }
      await pool.query(
        `UPDATE citas SET estado='cancelada', actualizado_en=NOW()
         WHERE id=$1 AND user_id=$2`,
        [id, userId]
      );
      return res.json({ ok: true });
    }

    // Admin / ayudante / developer — pueden editar campos autorizados
    const allowed = ["fecha", "hora", "estado", "nota", "motivo_cancelacion"];
    const sets    = [];
    const values  = [];

    for (const key of allowed) {
      if (req.body[key] !== undefined) {
        sets.push(`${key} = $${values.length + 1}`);
        values.push(req.body[key]);
      }
    }

    if (!sets.length) return res.status(400).json({ ok: false, error: "Sin campos para actualizar" });

    sets.push(`actualizado_en = NOW()`);
    values.push(id);

    await pool.query(
      `UPDATE citas SET ${sets.join(", ")} WHERE id = $${values.length}`,
      values
    );

    return res.json({ ok: true });
  } catch (err) {
    console.error("Error PUT /citas/:id:", err);
    return res.status(500).json({ ok: false, error: "Error al actualizar cita" });
  }
});

// POST /citas/:id/confirmar-pago — solo admin
router.post(
  "/:id/confirmar-pago",
  verifyToken,
  requireRole(["admin", "developer"]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { monto, monto_pagado, metodo_pago, tipo_pago_consultorio } = req.body;

      if (!monto || monto <= 0) {
        return res.status(400).json({ ok: false, error: "Monto inválido" });
      }

      const pagado       = monto_pagado >= monto;
      const monto_restante = Math.max(monto - (monto_pagado || 0), 0);

      await pool.query(
        `UPDATE citas SET
           pagado=$1, monto=$2, monto_pagado=$3, monto_restante=$4,
           metodo_pago=$5, tipo_pago_consultorio=$6,
           estado=$7, actualizado_en=NOW()
         WHERE id=$8`,
        [pagado, monto, monto_pagado || 0, monto_restante,
         metodo_pago || "Consultorio", tipo_pago_consultorio || null,
         pagado ? "atendida" : "confirmada", id]
      );

      return res.json({ ok: true });
    } catch (err) {
      console.error("Error POST /citas/:id/confirmar-pago:", err);
      return res.status(500).json({ ok: false, error: "Error al confirmar pago" });
    }
  }
);

// DELETE /citas/:id — solo admin
router.delete(
  "/:id",
  verifyToken,
  requireRole(["admin", "ayudante", "developer"]),
  async (req, res) => {
    try {
      await pool.query("DELETE FROM citas WHERE id = $1", [req.params.id]);
      return res.json({ ok: true });
    } catch (err) {
      console.error("Error DELETE /citas/:id:", err);
      return res.status(500).json({ ok: false, error: "Error al eliminar cita" });
    }
  }
);

module.exports = router;