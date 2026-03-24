const express = require("express");
const router = express.Router();
const supabase = require("../lib/supabaseAdmin");
const { pool } = require("../lib/db");

const ADMIN_EMAILS = ["medinapipe123@gmail.com", "admin@clinicavm.com"];

function resolveRole(email) {
  return ADMIN_EMAILS.includes(email) ? "admin" : "usuario";
}

/**
 * POST /auth/callback
 * El front envía el access_token que devuelve Supabase tras el login con Google.
 */
router.post("/callback", async (req, res) => {
  try {
    const { access_token } = req.body;
    if (!access_token) {
      return res.status(400).json({ ok: false, error: "Falta access_token" });
    }

    // 1) Verificar token con Supabase
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(access_token);

    if (error || !user) {
      return res.status(401).json({ ok: false, error: "Token inválido o expirado" });
    }

    const email = user.email;
    const displayName =
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      "";
    const photoURL = user.user_metadata?.avatar_url || null;

    // 2) Buscar usuario existente
    const { rows: existing } = await pool.query(
      `SELECT id, nombres, apellidos, email, telefono, rol, photo
       FROM usuarios WHERE email = $1 LIMIT 1`,
      [email]
    );

    if (existing.length) {
      return res.json({ ok: true, user: existing[0] });
    }

    // 3) Crear usuario nuevo
    const [nombres, ...rest] = displayName.split(" ");
    const apellidos = rest.join(" ");
    const rol = resolveRole(email);

    const { rows: created } = await pool.query(
      `INSERT INTO usuarios (nombres, apellidos, email, photo, rol)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, nombres, apellidos, email, telefono, rol, photo`,
      [nombres || "Paciente", apellidos || "", email, photoURL, rol]
    );

    return res.status(201).json({ ok: true, user: created[0] });
  } catch (err) {
    console.error("Error /auth/callback:", err);
    return res.status(500).json({ ok: false, error: "Error interno" });
  }
});

module.exports = router;