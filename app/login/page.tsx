"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { loginUser } from "../utils/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [show, setShow] = useState(false);

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Correo no válido";
    if (!password) e.password = "Ingresa tu contraseña";
    return e;
  }, [email, password]);

  const isValid = Object.keys(errors).length === 0;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setErr(null);
    if (!isValid) return;
    const res = loginUser(email, password);
    if (!res.ok) {
      setErr(res.error || "No se pudo iniciar sesión.");
      return;
    }
    router.push("/"); // o "/agendar"
  };

  return (
    <section className="py-5" style={{ background: "linear-gradient(180deg,#f6f9ff 0%,#ffffff 100%)" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-5">
            <div className="card border-0 shadow-lg rounded-4">
              <div className="card-body p-4 p-md-5">
                <h1 className="fw-bold mb-1" style={{ color: "#1E63FF" }}>Iniciar sesión</h1>
                <p className="text-muted mb-4">Bienvenida de nuevo.</p>

                {err && <div className="alert alert-danger">{err}</div>}

                <form onSubmit={onSubmit} noValidate>
                  <div className="mb-3">
                    <label className="form-label">Correo</label>
                    <input
                      type="email"
                      className={`form-control ${touched && errors.email ? "is-invalid" : ""}`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tucorreo@dominio.com"
                    />
                    {touched && errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Contraseña</label>
                    <div className="input-group">
                      <input
                        type={show ? "text" : "password"}
                        className={`form-control ${touched && errors.password ? "is-invalid" : ""}`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Tu contraseña"
                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => setShow((s) => !s)}
                        aria-label={show ? "Ocultar" : "Mostrar"}
                      >
                        <i className={`fas ${show ? "fa-eye-slash" : "fa-eye"}`}></i>
                      </button>
                    </div>
                    {touched && errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
                  </div>

                  <button className="btn btn-primary w-100 mb-3" style={{ backgroundColor: "#1E63FF", borderColor: "#1E63FF" }}>
                    Entrar
                  </button>

                  
                </form>
              </div>
            </div>

           
          </div>
        </div>
      </div>
    </section>
  );
}
