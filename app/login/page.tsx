"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { loginUser } from "../utils/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  const [recoverMode, setRecoverMode] = useState(false);
  const [recoverEmail, setRecoverEmail] = useState("");
  const [recoverSent, setRecoverSent] = useState(false);

  // 🧩 Validaciones
  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Correo no válido";
    if (!password && !recoverMode) e.password = "Ingresa tu contraseña";
    return e;
  }, [email, password, recoverMode]);

  const isValid = Object.keys(errors).length === 0;

  // 📨 Manejador de login manual
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setErr(null);
    if (!isValid) return;

    if (recoverMode) {
      // Simula envío de recuperación
      setRecoverSent(true);
      setTimeout(() => {
        setRecoverSent(false);
        setRecoverMode(false);
      }, 2500);
      return;
    }

    const res = loginUser(email, password);
    if (!res.ok) {
      setErr(res.error || "No se pudo iniciar sesión.");
      return;
    }
    router.push("/");
  };

  return (
    <section
      className="py-5"
      style={{
        background: "linear-gradient(180deg, #FAF9F7 0%, #F1E9E0 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-5">
            <div
              className="card border-0 shadow-lg rounded-4 animate-fadein"
              style={{
                backgroundColor: "#FFFDF9",
                transition: "all 0.4s ease",
              }}
            >
              <div className="card-body p-4 p-md-5 text-center">
                <h1
                  className="fw-bold mb-1"
                  style={{
                    color: "#4E3B2B",
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {recoverMode ? "Recuperar contraseña" : "Iniciar sesión"}
                </h1>

                <p
                  className="text-muted mb-4"
                  style={{ color: "#6C584C", fontSize: "0.95rem" }}
                >
                  {recoverMode
                    ? "Ingresa tu correo para recibir un enlace de recuperación."
                    : "Bienvenida de nuevo. Ingresa tus credenciales o usa tu cuenta de Google."}
                </p>

                {/* Mensaje de error */}
                {err && (
                  <div
                    className="alert alert-danger text-center animate-fadein"
                    style={{
                      backgroundColor: "#FCEAEA",
                      color: "#8C2B2B",
                      border: "1px solid #E3B4A0",
                    }}
                  >
                    {err}
                  </div>
                )}

                {/* FORMULARIO */}
                <form onSubmit={onSubmit} noValidate>
                  {/* Email */}
                  <div className="mb-3 text-start">
                    <label
                      className="form-label fw-semibold"
                      style={{ color: "#4E3B2B" }}
                    >
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      className={`form-control rounded-3 shadow-sm ${
                        touched && errors.email ? "is-invalid" : ""
                      }`}
                      value={recoverMode ? recoverEmail : email}
                      onChange={(e) =>
                        recoverMode
                          ? setRecoverEmail(e.target.value)
                          : setEmail(e.target.value)
                      }
                      placeholder="tucorreo@dominio.com"
                      style={{
                        borderColor: "#E9DED2",
                        backgroundColor: "#FFFDF9",
                        transition: "all 0.3s ease",
                      }}
                    />
                    {touched && errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>

                  {/* Password */}
                  {!recoverMode && (
                    <div className="mb-4 text-start">
                      <label
                        className="form-label fw-semibold"
                        style={{ color: "#4E3B2B" }}
                      >
                        Contraseña
                      </label>
                      <div className="input-group">
                        <input
                          type={show ? "text" : "password"}
                          className={`form-control rounded-start-3 shadow-sm ${
                            touched && errors.password ? "is-invalid" : ""
                          }`}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Tu contraseña"
                          style={{
                            borderColor: "#E9DED2",
                            backgroundColor: "#FFFDF9",
                          }}
                        />
                        <button
                          className="btn btn-light rounded-end-3 border"
                          type="button"
                          onClick={() => setShow((s) => !s)}
                          style={{
                            borderColor: "#E9DED2",
                            backgroundColor: "#F8F5F0",
                            color: "#4E3B2B",
                          }}
                        >
                          <i
                            className={`fas ${
                              show ? "fa-eye-slash" : "fa-eye"
                            }`}
                          ></i>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Botón ENTRAR */}
                  <button
                    type="submit"
                    disabled={recoverSent}
                    className="btn w-100 fw-semibold py-2"
                    style={{
                      backgroundColor: "#B08968",
                      border: "none",
                      color: "white",
                      borderRadius: "50px",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {recoverMode
                      ? recoverSent
                        ? "Enviando enlace..."
                        : "Enviar enlace"
                      : "Entrar"}
                  </button>

                  {/* 🟢 Botón Google real */}
                  {!recoverMode && (
                    <button
                      type="button"
                      onClick={() => signIn("google")}
                      className="btn w-100 mt-3 fw-semibold d-flex align-items-center justify-content-center"
                      style={{
                        backgroundColor: "#FFF",
                        border: "2px solid #B08968",
                        color: "#4E3B2B",
                        borderRadius: "50px",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <i
                        className="fab fa-google me-2"
                        style={{ color: "#DB4437" }}
                      ></i>
                      Iniciar sesión con Google
                    </button>
                  )}
                </form>

                {/* LINKS INFERIORES */}
                <div className="text-center mt-4">
                  {!recoverMode ? (
                    <>
                      <p
                        style={{
                          color: "#B08968",
                          cursor: "pointer",
                          textDecoration: "underline",
                          transition: "color 0.3s ease",
                          marginBottom: "0.8rem",
                        }}
                        onClick={() => setRecoverMode(true)}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.color = "#A1724F")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.color = "#B08968")
                        }
                      >
                        ¿Olvidaste tu contraseña?
                      </p>
                      <p style={{ color: "#4E3B2B", fontSize: "0.9rem" }}>
                        ¿No tienes cuenta?{" "}
                        <span
                          onClick={() => router.push("/register")}
                          style={{
                            color: "#B08968",
                            textDecoration: "underline",
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                          onMouseOver={(e) =>
                            (e.currentTarget.style.color = "#A1724F")
                          }
                          onMouseOut={(e) =>
                            (e.currentTarget.style.color = "#B08968")
                          }
                        >
                          Quiero registrarme
                        </span>
                      </p>
                    </>
                  ) : (
                    <p
                      onClick={() => setRecoverMode(false)}
                      style={{
                        color: "#B08968",
                        cursor: "pointer",
                        textDecoration: "underline",
                        marginTop: "1rem",
                      }}
                    >
                      Volver al inicio de sesión
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animación */}
      <style jsx>{`
        @keyframes fadein {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadein {
          animation: fadein 0.6s ease forwards;
        }
      `}</style>
    </section>
  );
}
