"use client";

// ✅ Definimos el tipo completo del usuario
export type User = {
  nombre: string;
  apellido?: string; // ← agregado (opcional, puedes quitar el ? si quieres hacerlo obligatorio)
  email: string;
  telefono?: string;
  password: string; // ⚠️ solo para demo; nunca guardes contraseñas en texto plano en producción
};

// 🔐 Claves de almacenamiento local
const USERS_KEY = "ce_users";
const CURRENT_KEY = "ce_current_user";

// 📦 Obtener todos los usuarios
export function getUsers(): User[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

// 💾 Guardar usuarios en localStorage
export function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// 🔎 Buscar usuario por correo
export function findUserByEmail(email: string): User | undefined {
  return getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
}

// 🧾 Registrar usuario nuevo
export function registerUser(user: User): { ok: boolean; error?: string } {
  const exists = findUserByEmail(user.email);
  if (exists) return { ok: false, error: "Este correo ya está registrado." };

  const users = getUsers();
  users.push(user);
  saveUsers(users);

  // ✅ Guarda sesión automática (nombre + correo)
  localStorage.setItem(
    CURRENT_KEY,
    JSON.stringify({
      nombre: `${user.nombre}${user.apellido ? " " + user.apellido : ""}`,
      email: user.email,
    })
  );

  return { ok: true };
}

// 🔑 Iniciar sesión
export function loginUser(
  email: string,
  password: string
): { ok: boolean; error?: string } {
  const user = findUserByEmail(email);
  if (!user) return { ok: false, error: "Usuario no encontrado." };
  if (user.password !== password)
    return { ok: false, error: "Contraseña incorrecta." };

  localStorage.setItem(
    CURRENT_KEY,
    JSON.stringify({
      nombre: `${user.nombre}${user.apellido ? " " + user.apellido : ""}`,
      email: user.email,
    })
  );

  return { ok: true };
}

// 🚪 Cerrar sesión
export function logoutUser() {
  localStorage.removeItem(CURRENT_KEY);
}

// 👤 Obtener usuario actual
export function getCurrentUser():
  | { nombre: string; email: string }
  | null {
  try {
    const raw = localStorage.getItem(CURRENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
