const { pool } = require("../lib/db");

/**
 * Emails con rol administrador.
 * (esto luego puede ir a tabla o env)
 */
const ADMIN_EMAILS = [
  "medinapipe123@gmail.com",
  "admin@clinicavm.com",
];

function resolveRole(email) {
  return ADMIN_EMAILS.includes(email) ? "admin" : "user";
}

/**
 * Busca usuario por email (SIN datos sensibles).
 */
async function findUserByEmail(email) {
  const [rows] = await pool.query(
    `
    SELECT 
      id,
      nombres,
      apellidos,
      email,
      rol,
      photo,
      creadoEn
    FROM usuarios
    WHERE email = ?
    LIMIT 1
    `,
    [email]
  );

  return rows[0] || null;
}

/**
 * Crea usuario a partir de Firebase (NO login tradicional).
 */
async function createUserFromFirebase({
  email,
  displayName,
  photoURL,
  genero = "Otro",
  edad = 0,
}) {
  const [nombres, ...rest] = (displayName || "").split(" ");
  const apellidos = rest.join(" ");

  const rol = resolveRole(email);

  const [result] = await pool.query(
    `
    INSERT INTO usuarios (
      nombres,
      apellidos,
      email,
      password,
      edad,
      genero,
      telefono,
      antecedentes,
      antecedentesDescripcion,
      alergias,
      alergiasDescripcion,
      medicamentos,
      medicamentosDescripcion,
      photo,
      rol
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, NULL, NULL, NULL, NULL, NULL, NULL, ?, ?
    )
    `,
    [
      nombres || "Paciente",
      apellidos || "",
      email,
      "FIREBASE_AUTH", // explícito, no usable para login
      edad,
      genero,
      "",
      photoURL || null,
      rol,
    ]
  );

  const [rows] = await pool.query(
    `
    SELECT 
      id,
      nombres,
      apellidos,
      email,
      rol,
      photo,
      creadoEn
    FROM usuarios
    WHERE id = ?
    `,
    [result.insertId]
  );

  return rows[0];
}

/**
 * Devuelve usuario existente o lo crea desde Firebase.
 * ESTA FUNCIÓN DEBE LLAMARSE SOLO TRAS verifyToken
 */
async function getOrCreateUserFromFirebase(firebaseUser) {
  const {
    email,
    name: displayName,
    picture: photoURL,
    email_verified,
  } = firebaseUser;

  if (!email) {
    throw new Error("El usuario de Firebase no trae email.");
  }

  if (!email_verified) {
    throw new Error("Email de Firebase no verificado.");
  }

  let user = await findUserByEmail(email);
  if (user) return user;

  return await createUserFromFirebase({
    email,
    displayName,
    photoURL,
  });
}

module.exports = {
  findUserByEmail,
  createUserFromFirebase,
  getOrCreateUserFromFirebase,
};
