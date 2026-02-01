import admin from "../lib/firebaseAdmin.js";
import { pool } from "../lib/db.js";

export async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verificar token Firebase
    const decoded = await admin.auth().verifyIdToken(token);

    if (!decoded.email) {
      return res.status(401).json({ message: "Token sin email válido" });
    }

    // Buscar usuario en TU base de datos
    const [rows] = await pool.query(
      `
      SELECT id, email, rol
      FROM usuarios
      WHERE email = ?
      LIMIT 1
      `,
      [decoded.email]
    );

    if (!rows.length) {
      return res.status(403).json({
        message: "Usuario no registrado en el sistema",
      });
    }

    // Inyectar usuario completo y confiable
    req.user = {
      id: rows[0].id,
      email: rows[0].email,
      rol: rows[0].rol,
      firebaseUid: decoded.uid,
    };

    next();
  } catch (err) {
    console.error("verifyToken error:", err);
    return res.status(401).json({ message: "Token inválido" });
  }
}
