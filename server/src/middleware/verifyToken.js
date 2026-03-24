const supabase = require("../lib/supabaseAdmin");
const { pool } = require("../lib/db");

async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verificar token con Supabase Auth
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ message: "Token inválido" });
    }

    if (!user.email) {
      return res.status(401).json({ message: "Token sin email válido" });
    }

    // Buscar usuario en tu tabla usuarios
    const { rows } = await pool.query(
      `SELECT id, email, rol FROM usuarios WHERE email = $1 LIMIT 1`,
      [user.email]
    );

    if (!rows.length) {
      return res
        .status(403)
        .json({ message: "Usuario no registrado en el sistema" });
    }

    req.user = {
      id: rows[0].id,
      email: rows[0].email,
      rol: rows[0].rol,
      supabaseUid: user.id,
    };

    next();
  } catch (err) {
    console.error("verifyToken error:", err);
    return res.status(401).json({ message: "Token inválido" });
  }
}

module.exports = verifyToken;