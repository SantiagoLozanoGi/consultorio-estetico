"use client";

export type User = {
  nombre: string;
  email: string;
  telefono?: string;
  password: string; // para demo solamente (no en producción)
};

const USERS_KEY = "ce_users";
const CURRENT_KEY = "ce_current_user";

export function getUsers(): User[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function findUserByEmail(email: string): User | undefined {
  return getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function registerUser(user: User): { ok: boolean; error?: string } {
  const exists = findUserByEmail(user.email);
  if (exists) return { ok: false, error: "Este correo ya está registrado." };
  const users = getUsers();
  users.push(user);
  saveUsers(users);
  // inicia sesión automáticamente
  localStorage.setItem(CURRENT_KEY, JSON.stringify({ nombre: user.nombre, email: user.email }));
  return { ok: true };
}

export function loginUser(email: string, password: string): { ok: boolean; error?: string } {
  const user = findUserByEmail(email);
  if (!user) return { ok: false, error: "Usuario no encontrado." };
  if (user.password !== password) return { ok: false, error: "Contraseña incorrecta." };
  localStorage.setItem(CURRENT_KEY, JSON.stringify({ nombre: user.nombre, email: user.email }));
  return { ok: true };
}

export function logoutUser() {
  localStorage.removeItem(CURRENT_KEY);
}

export function getCurrentUser(): { nombre: string; email: string } | null {
  try {
    const raw = localStorage.getItem(CURRENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
