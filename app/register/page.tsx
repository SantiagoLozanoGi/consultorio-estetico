"use client";

import Link from "next/link";
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

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!nombre.trim()) e.nombre = "Ingresa tu nombre";
    if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Correo no válido";
    if (!/^[0-9\s()+-]{7,}$/.test(telefono)) e.telefono = "Teléfono no válido";
    if (password.length < 6) e.password = "Mínimo 6 caracteres";
    if (password !== confirm) e.confirm = "Las contraseñas no coinciden";
    return e;
  }, [nombre, email, telefono, password, confirm]);

  const isValid = Object.keys(errors).length === 0;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setErr(null);
    if (!isValid) return;
    const res = registerUser({ nombre, email, telefono, password });
    if (!res.ok) {
      setErr(res.error || "No se pudo registrar.");
      return;
    }
    // Redirige a inicio o a agendar
    router.push("/");
  };


  return (
    <section className="py-5" style={{ background: "linear-gradient(180deg,#f6f9ff 0%,#ffffff 100%)" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6">
            <div className="card border-0 shadow-lg rounded-4">
              <div className="card-body p-4 p-md-5">
                <h1 className="fw-bold mb-1" style={{ color: "#1E63FF" }}>Crear cuenta</h1>
                <p className="text-muted mb-4">Regístrate para agendar tus citas de forma más rápida.</p>

                {err && <div className="alert alert-danger">{err}</div>}

                <form onSubmit={onSubmit} noValidate>
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                      className={`form-control ${touched && errors.nombre ? "is-invalid" : ""}`}
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Tu nombre"
                    />
                    {touched && errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                  </div>
                   <div className="mb-3">
                    <label className="form-label">Apellido</label>
                    <input
                      className={`form-control ${touched && errors.apellido ? "is-invalid" : ""}`}
                      value={nombre}
                      onChange={(e) => setApellido(e.target.value)}
                      placeholder="Tu apellido"
                    />
                    {touched && errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Correo</label>
                    <input
                      type="email"
                      className={`form-control ${touched && errors.email ? "is-invalid" : ""}`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tucorreo@gmail.com"
                    />
                    {touched && errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input
                      className={`form-control ${touched && errors.telefono ? "is-invalid" : ""}`}
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      placeholder="+57 313 821 0700"
                    />
                    {touched && errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input
                      type="password"
                      className={`form-control ${touched && errors.password ? "is-invalid" : ""}`}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Mínimo 6 caracteres"
                    />
                    {touched && errors.password && <div className="invalid-feedback">{errors.password}</div>}
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Confirmar contraseña</label>
                    <input
                      type="password"
                      className={`form-control ${touched && errors.confirm ? "is-invalid" : ""}`}
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                    />
                    {touched && errors.confirm && <div className="invalid-feedback">{errors.confirm}</div>}
                  </div>

                  <button className="btn btn-primary w-100 mb-3" style={{ backgroundColor: "#1E63FF", borderColor: "#1E63FF" }}>
                    Crear cuenta
                  </button>

                  <div className="text-center">
                    <small className="text-muted">
                      ¿Ya tienes cuenta? <Link href="/login">Inicia sesión</Link>
                    </small>
                  </div>
                </form>
              </div>
            </div>

            <p className="text-center text-muted mt-3" style={{ fontSize: ".9rem" }}>
              Al registrarte aceptas nuestros términos y tratamiento de datos personales.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
