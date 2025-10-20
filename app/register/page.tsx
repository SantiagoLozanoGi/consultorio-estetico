"use client";

import { useMemo, useState } from "react";
import { registerUser } from "../utils/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [touched, setTouched] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // ✅ Validaciones dinámicas
  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!nombre.trim()) e.nombre = "Ingresa tu nombre";
    if (!apellido.trim()) e.apellido = "Ingresa tu apellido";
    if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Correo no válido";
    if (!/^[0-9\s()+-]{7,}$/.test(telefono)) e.telefono = "Teléfono no válido";
    if (password.length < 6) e.password = "Mínimo 6 caracteres";
    if (password !== confirm) e.confirm = "Las contraseñas no coinciden";
    return e;
  }, [nombre, apellido, email, telefono, password, confirm]);

  const isValid = Object.keys(errors).length === 0;

  // ✅ Envío del formulario
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setErr(null);
    if (!isValid) return;

    const res = registerUser({ nombre, apellido, email, telefono, password });
    if (!res.ok) {
      setErr(res.error || "No se pudo registrar.");
      return;
    }

    router.push("/login");
  };

  return (
    <section
      className="d-flex align-items-center py-5"
      style={{
        background: "linear-gradient(180deg,#FAF9F7 0%,#F1E9E0 100%)",
        minHeight: "100vh",
      }}
    >
      <div className="container px-3">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6">
            <div
              className="card border-0 shadow-lg rounded-4 animate-fadein"
              style={{
                backgroundColor: "#FFFDF9",
                transition: "all 0.4s ease",
              }}
            >
              <div className="card-body p-4 p-md-5 text-center">
                {/* 🩺 Encabezado */}
                <h1
                  className="fw-bold mb-2"
                  style={{
                    color: "#4E3B2B",
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(1.6rem, 2.5vw, 2rem)",
                  }}
                >
                  Crear cuenta
                </h1>

                <p
                  className="text-muted mb-4"
                  style={{
                    color: "#6C584C",
                    fontSize: "clamp(0.9rem, 1.2vw, 1rem)",
                  }}
                >
                  Regístrate para agendar tus citas de forma más rápida.
                </p>

                {/* 🚨 Error */}
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

                {/* 📋 Formulario */}
                <form onSubmit={onSubmit} noValidate>
                  {/* Nombre y Apellido */}
                  <div className="row">
                    <div className="col-12 col-md-6 mb-3 text-start">
                      <label
                        className="form-label fw-semibold"
                        style={{ color: "#4E3B2B" }}
                      >
                        Nombre
                      </label>
                      <input
                        className={`form-control rounded-3 shadow-sm ${
                          touched && errors.nombre ? "is-invalid" : ""
                        }`}
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Tu nombre"
                        style={{
                          borderColor: "#E9DED2",
                          backgroundColor: "#FFFDF9",
                        }}
                      />
                      {touched && errors.nombre && (
                        <div className="invalid-feedback">
                          {errors.nombre}
                        </div>
                      )}
                    </div>

                    <div className="col-12 col-md-6 mb-3 text-start">
                      <label
                        className="form-label fw-semibold"
                        style={{ color: "#4E3B2B" }}
                      >
                        Apellido
                      </label>
                      <input
                        className={`form-control rounded-3 shadow-sm ${
                          touched && errors.apellido ? "is-invalid" : ""
                        }`}
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        placeholder="Tu apellido"
                        style={{
                          borderColor: "#E9DED2",
                          backgroundColor: "#FFFDF9",
                        }}
                      />
                      {touched && errors.apellido && (
                        <div className="invalid-feedback">
                          {errors.apellido}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Correo */}
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tucorreo@gmail.com"
                      style={{
                        borderColor: "#E9DED2",
                        backgroundColor: "#FFFDF9",
                      }}
                    />
                    {touched && errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>

                  {/* Teléfono */}
                  <div className="mb-3 text-start">
                    <label
                      className="form-label fw-semibold"
                      style={{ color: "#4E3B2B" }}
                    >
                      Teléfono
                    </label>
                    <input
                      className={`form-control rounded-3 shadow-sm ${
                        touched && errors.telefono ? "is-invalid" : ""
                      }`}
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      placeholder="+57 313 821 0700"
                      style={{
                        borderColor: "#E9DED2",
                        backgroundColor: "#FFFDF9",
                      }}
                    />
                    {touched && errors.telefono && (
                      <div className="invalid-feedback">
                        {errors.telefono}
                      </div>
                    )}
                  </div>

                  {/* Contraseña y Confirmar */}
                  <div className="row">
                    <div className="col-12 col-md-6 mb-3 text-start">
                      <label
                        className="form-label fw-semibold"
                        style={{ color: "#4E3B2B" }}
                      >
                        Contraseña
                      </label>
                      <input
                        type="password"
                        className={`form-control rounded-3 shadow-sm ${
                          touched && errors.password ? "is-invalid" : ""
                        }`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mínimo 6 caracteres"
                        style={{
                          borderColor: "#E9DED2",
                          backgroundColor: "#FFFDF9",
                        }}
                      />
                      {touched && errors.password && (
                        <div className="invalid-feedback">
                          {errors.password}
                        </div>
                      )}
                    </div>

                    <div className="col-12 col-md-6 mb-4 text-start">
                      <label
                        className="form-label fw-semibold"
                        style={{ color: "#4E3B2B" }}
                      >
                        Confirmar contraseña
                      </label>
                      <input
                        type="password"
                        className={`form-control rounded-3 shadow-sm ${
                          touched && errors.confirm ? "is-invalid" : ""
                        }`}
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        placeholder="Repite tu contraseña"
                        style={{
                          borderColor: "#E9DED2",
                          backgroundColor: "#FFFDF9",
                        }}
                      />
                      {touched && errors.confirm && (
                        <div className="invalid-feedback">
                          {errors.confirm}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Botón */}
                  <button
                    type="submit"
                    className="btn w-100 fw-semibold py-2"
                    style={{
                      backgroundColor: "#B08968",
                      border: "none",
                      color: "white",
                      borderRadius: "50px",
                      fontSize: "clamp(0.9rem, 1.2vw, 1rem)",
                      transition: "all 0.3s ease",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#A1724F")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#B08968")
                    }
                  >
                    Crear cuenta
                  </button>

                  {/* Volver */}
                  <p
                    className="mt-3"
                    style={{
                      color: "#4E3B2B",
                      cursor: "pointer",
                      textDecoration: "underline",
                      fontSize: "clamp(0.9rem, 1.1vw, 1rem)",
                    }}
                    onClick={() => router.push("/login")}
                  >
                    ¿Ya tienes cuenta? Inicia sesión
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🎨 Animaciones */}
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

        @media (max-width: 768px) {
          .card-body {
            padding: 2rem 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
