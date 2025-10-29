"use client";

import { useState, useMemo } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { handleGoogleSuccess } from "./GoogleHandler";
import { getUsers, updateUserData } from "../utils/localDB"; // ✅ Usamos la versión global
import { setCurrentUser } from "../utils/auth";
import { PALETTE } from "./palette2";

export default function RecoverForm({
  setErr,
}: {
  setErr: (msg: string | null) => void;
}) {
  const router = useRouter();
  const [recoverStep, setRecoverStep] = useState<"verify" | "reset">("verify");
  const [recoverUser, setRecoverUser] = useState<any>(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [touched, setTouched] = useState(false);

  // Validaciones
  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (recoverStep === "reset") {
      if (!password) e.password = "Ingresa una nueva contraseña";
      if (password !== confirm) e.confirm = "Las contraseñas no coinciden";
    }
    return e;
  }, [password, confirm, recoverStep]);

  const isValid = Object.keys(errors).length === 0;

  // Guardar nueva contraseña
const handleResetPassword = (e: React.FormEvent) => {
  e.preventDefault();
  setTouched(true);
  if (!isValid) {
    setErr("Revisa los campos marcados.");
    return;
  }

  if (!recoverUser) {
    setErr("No se detectó un usuario válido para restablecer la contraseña.");
    return;
  }

  const users = getUsers();
  const found = users.find(
    (u) => u.email.toLowerCase() === recoverUser.email.toLowerCase()
  );

  if (!found) {
    setErr("Usuario no encontrado.");
    return;
  }

  // === Actualizamos usando la función global ===
  updateUserData({ password }, found.email);

  // === Sincronizamos sesión ===
  const updatedUser = { ...found, password };
  setCurrentUser(updatedUser);

  // === Mensaje de éxito ===
  setSuccessMsg(true);
  setTimeout(() => {
    setSuccessMsg(false);
    router.push("/login");
  }, 2000);
};

  return (
    <div>
      {recoverStep === "verify" ? (
        <div className="text-center">
          <p
            className="text-muted mb-3"
            style={{ color: PALETTE.muted, fontSize: "0.95rem" }}
          >
            Verifica tu identidad con tu cuenta de Google antes de restablecer
            tu contraseña.
          </p>

          <GoogleLogin
            onSuccess={(cred) =>
              handleGoogleSuccess(
                cred,
                router,
                setErr,
                true, // recoverMode
                setRecoverUser,
                setRecoverStep
              )
            }
            onError={() =>
              setErr("Error al autenticar con Google. Intenta nuevamente.")
            }
            shape="pill"
            text="signin_with"
          />

          <div className="mt-3">
            <button
              type="button"
              className="btn btn-outline-secondary rounded-pill"
              onClick={() => router.push("/login")}
              style={{
                color: PALETTE.text,
                borderColor: PALETTE.border,
              }}
            >
              Volver al inicio
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleResetPassword} noValidate>
          <div className="mb-3 text-start">
            <label
              className="form-label fw-semibold"
              style={{ color: PALETTE.text }}
            >
              Nueva contraseña
            </label>
            <div className="input-group">
              <input
                type={showNew ? "text" : "password"}
                className={`form-control rounded-start-3 shadow-sm ${
                  touched && errors.password ? "is-invalid" : ""
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nueva contraseña"
                style={{
                  borderColor: PALETTE.border,
                  backgroundColor: PALETTE.surface,
                }}
              />
              <button
                type="button"
                className="btn btn-light rounded-end-3 border"
                onClick={() => setShowNew((s) => !s)}
                style={{
                  borderColor: PALETTE.border,
                  backgroundColor: "#F8F5F0",
                  color: PALETTE.text,
                }}
              >
                <i
                  className={`fas ${showNew ? "fa-eye-slash" : "fa-eye"}`}
                ></i>
              </button>
            </div>
            {touched && errors.password && (
              <div className="invalid-feedback d-block">
                {errors.password}
              </div>
            )}
          </div>

          <div className="mb-4 text-start">
            <label
              className="form-label fw-semibold"
              style={{ color: PALETTE.text }}
            >
              Confirmar contraseña
            </label>
            <div className="input-group">
              <input
                type={showConfirm ? "text" : "password"}
                className={`form-control rounded-start-3 shadow-sm ${
                  touched && errors.confirm ? "is-invalid" : ""
                }`}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Confirmar contraseña"
                style={{
                  borderColor: PALETTE.border,
                  backgroundColor: PALETTE.surface,
                }}
              />
              <button
                type="button"
                className="btn btn-light rounded-end-3 border"
                onClick={() => setShowConfirm((s) => !s)}
                style={{
                  borderColor: PALETTE.border,
                  backgroundColor: "#F8F5F0",
                  color: PALETTE.text,
                }}
              >
                <i
                  className={`fas ${showConfirm ? "fa-eye-slash" : "fa-eye"}`}
                ></i>
              </button>
            </div>
            {touched && errors.confirm && (
              <div className="invalid-feedback d-block">
                {errors.confirm}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="btn w-100 fw-semibold py-2"
            style={{
              backgroundColor: PALETTE.main,
              border: "none",
              color: "white",
              borderRadius: "50px",
            }}
          >
            Guardar nueva contraseña
          </button>

          {successMsg && (
            <div
              className="mt-3 alert alert-success text-center"
              style={{
                backgroundColor: "#EAF9EA",
                color: "#2F6E2F",
                border: "1px solid #BCE2B8",
              }}
            >
              Contraseña actualizada correctamente
            </div>
          )}
        </form>
      )}
    </div>
  );
}
