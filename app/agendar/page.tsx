"use client";

import { useMemo, useState } from "react";

type Form = {
  nombre: string;
  email: string;
  telefono: string;
  procedimiento: string;
  fecha: string; // YYYY-MM-DD
  hora: string;  // HH:MM
  notas: string;
  pago: "Efectivo" | "Tarjeta en clínica" | "Transferencia" | "Pago en línea" | "";
  anticipo: string; 
};

const PROCEDIMIENTOS = [
  "Limpieza Facial",
  "Bótox",
  "Ácido Hialurónico en labios",
  "Ácido Hialurónico Facial",
  "Tratamiento para el Acné",
  "Tratamiento para Manchas",
];

// precios estimados
const PRECIOS: Record<string, number> = {
  "Limpieza Facial": 120000,
  "Bótox": 600000,
  "Ácido Hialurónico en labios": 900000,
  "Ácido Hialurónico Facial": 1200000,
  "Tratamiento para el Acné": 250000,
  "Tratamiento para Manchas": 300000,
};

const WHATSAPP_NUM = "573138210700"; 
const CLINIC_EMAIL = "etr510@gmail.com";

const fmtCOP = (v: number) =>
  v.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

export default function AgendarPage() {
  const [f, setF] = useState<Form>({
    nombre: "",
    email: "",
    telefono: "",
    procedimiento: "",
    fecha: "",
    hora: "",
    notas: "",
    pago: "",
    anticipo: "",
  });
  const [touched, setTouched] = useState(false);

  const precio = useMemo(() => PRECIOS[f.procedimiento] ?? 0, [f.procedimiento]);
  const anticipoSugerido = useMemo(() => Math.round(precio * 0.2), [precio]);
  const anticipoNumber = useMemo(() => Number((f.anticipo || "0").replace(/[^\d]/g, "")), [f.anticipo]);

  const errors = useMemo(() => {
    const e: Partial<Record<keyof Form, string>> = {};
    if (!f.nombre.trim()) e.nombre = "Ingresa tu nombre";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Correo no válido";
    if (!/^[0-9\s()+-]{7,}$/.test(f.telefono)) e.telefono = "Teléfono no válido";
    if (!f.procedimiento) e.procedimiento = "Selecciona un procedimiento";
    if (!f.fecha) e.fecha = "Selecciona una fecha";
    if (!f.hora) e.hora = "Selecciona una hora";
    if (!f.pago) e.pago = "Selecciona un método de pago";
    if (f.pago !== "" && f.anticipo && isNaN(anticipoNumber)) e.anticipo = "Valor no válido";
    return e;
  }, [f, anticipoNumber]);

  const formIsValid = Object.keys(errors).length === 0;

  const handleChange =
    (k: keyof Form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      let val = e.target.value;
      if (k === "anticipo") {
        
        val = val.replace(/[^\d]/g, "");
      }
      setF((s) => ({ ...s, [k]: val }));
    };

  const buildWhatsAppUrl = () => {
    const msg =
      `Hola, soy *${f.nombre}*.\n` +
      `Quiero agendar una cita para *${f.procedimiento}*.\n\n` +
      `📅 Fecha: ${f.fecha}\n` +
      `🕒 Hora: ${f.hora}\n` +
      `📧 Correo: ${f.email}\n` +
      `📞 Teléfono: ${f.telefono}\n` +
      (precio ? `💵 Precio estimado: ${fmtCOP(precio)}\n` : "") +
      (f.anticipo ? `🔖 Anticipo: ${fmtCOP(anticipoNumber)}\n` : `🔖 Anticipo sugerido: ${fmtCOP(anticipoSugerido)}\n`) +
      (f.pago ? `💳 Método de pago: ${f.pago}\n` : "") +
      (f.notas ? `📝 Notas: ${f.notas}\n` : "");
    return `https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(msg)}`;
  };

  const buildMailto = () => {
    const subject = `Nueva cita: ${f.procedimiento} - ${f.nombre}`;
    const body =
      `Nombre: ${f.nombre}\n` +
      `Correo: ${f.email}\n` +
      `Teléfono: ${f.telefono}\n` +
      `Procedimiento: ${f.procedimiento}\n` +
      `Fecha: ${f.fecha}\n` +
      `Hora: ${f.hora}\n` +
      (precio ? `Precio estimado: ${fmtCOP(precio)}\n` : "") +
      (f.anticipo ? `Anticipo: ${fmtCOP(anticipoNumber)}\n` : `Anticipo sugerido: ${fmtCOP(anticipoSugerido)}\n`) +
      (f.pago ? `Método de pago: ${f.pago}\n` : "") +
      (f.notas ? `Notas: ${f.notas}\n` : "");
    return `mailto:${CLINIC_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // Archivo .ics para agregar al calendario
  const downloadICS = () => {
    const start = new Date(`${f.fecha}T${f.hora}:00`);
    const end = new Date(start.getTime() + 45 * 60000);
    const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const ics =
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Clinica Estética//Agendar Cita//ES
BEGIN:VEVENT
UID:${Date.now()}@clinica-estetica
DTSTAMP:${fmt(new Date())}
DTSTART:${fmt(start)}
DTEND:${fmt(end)}
SUMMARY:${f.procedimiento} - Cita Clínica Estética
DESCRIPTION:Paciente: ${f.nombre} (${f.email} ${f.telefono})\\nPago: ${f.pago} \\nAnticipo: ${f.anticipo ? fmtCOP(anticipoNumber) : fmtCOP(anticipoSugerido)}\\nNotas: ${f.notas?.replace(/\n/g, " ")}
LOCATION:Clínica Medicadiz - Ibagué
END:VEVENT
END:VCALENDAR`;
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cita-${f.nombre.replace(/\s+/g, "_")}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!formIsValid) return;
    window.open(buildWhatsAppUrl(), "_blank");
  };

  return (
    <section className="py-5" style={{ background: "linear-gradient(180deg,#f6f9ff 0%,#ffffff 100%)" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="row g-0">
                {/* Lado ilustración */}
                <div
                  className="col-md-5 d-none d-md-block"
                  style={{
                    backgroundImage: "url('/imagenes/estetica.webp')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                {/* Lado formulario */}
                <div className="col-md-7 p-4 p-md-5">
                  <h1 className="fw-bold mb-1" style={{ color: "#052368" }}>
                    Agendar Cita
                  </h1>
                  <p className="text-muted mb-4">
                    Completa tus datos y elige fecha y hora. Te confirmaremos por WhatsApp o correo.
                  </p>

                  <form onSubmit={onSubmit} noValidate>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Nombre completo</label>
                        <input
                          type="text"
                          className={`form-control ${touched && errors.nombre ? "is-invalid" : ""}`}
                          value={f.nombre}
                          onChange={handleChange("nombre")}
                          placeholder="Tu nombre"
                        />
                        {touched && errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Teléfono</label>
                        <input
                          type="tel"
                          className={`form-control ${touched && errors.telefono ? "is-invalid" : ""}`}
                          value={f.telefono}
                          onChange={handleChange("telefono")}
                          placeholder="+57 313 821 0700"
                        />
                        {touched && errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Correo electrónico</label>
                        <input
                          type="email"
                          className={`form-control ${touched && errors.email ? "is-invalid" : ""}`}
                          value={f.email}
                          onChange={handleChange("email")}
                          placeholder="tucorreo@dominio.com"
                        />
                        {touched && errors.email && <div className="invalid-feedback">{errors.email}</div>}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Procedimiento</label>
                        <select
                          className={`form-select ${touched && errors.procedimiento ? "is-invalid" : ""}`}
                          value={f.procedimiento}
                          onChange={handleChange("procedimiento")}
                        >
                          <option value="">Selecciona…</option>
                          {PROCEDIMIENTOS.map((p) => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          ))}
                        </select>
                        {touched && errors.procedimiento && (
                          <div className="invalid-feedback">{errors.procedimiento}</div>
                        )}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Fecha</label>
                        <input
                          type="date"
                          className={`form-control ${touched && errors.fecha ? "is-invalid" : ""}`}
                          value={f.fecha}
                          onChange={handleChange("fecha")}
                        />
                        {touched && errors.fecha && <div className="invalid-feedback">{errors.fecha}</div>}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Hora</label>
                        <input
                          type="time"
                          className={`form-control ${touched && errors.hora ? "is-invalid" : ""}`}
                          value={f.hora}
                          onChange={handleChange("hora")}
                        />
                        {touched && errors.hora && <div className="invalid-feedback">{errors.hora}</div>}
                      </div>

                      {/* Pago */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Método de pago</label>
                        <select
                          className={`form-select ${touched && errors.pago ? "is-invalid" : ""}`}
                          value={f.pago}
                          onChange={handleChange("pago")}
                        >
                          <option value="">Selecciona…</option>
                          <option>Efectivo</option>
                          <option>Tarjeta en clínica</option>
                          <option>Transferencia</option>
                          <option>Pago en línea</option>
                        </select>
                        {touched && errors.pago && <div className="invalid-feedback">{errors.pago}</div>}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          Anticipo (opcional){precio ? ` — sugerido ${fmtCOP(anticipoSugerido)}` : ""}
                        </label>
                        <div className="input-group">
                          <span className="input-group-text">$</span>
                          <input
                            type="text"
                            inputMode="numeric"
                            className={`form-control ${touched && errors.anticipo ? "is-invalid" : ""}`}
                            value={f.anticipo}
                            onChange={handleChange("anticipo")}
                            placeholder={precio ? String(anticipoSugerido) : "0"}
                          />
                        </div>
                        {touched && errors.anticipo && <div className="invalid-feedback">{errors.anticipo}</div>}
                      </div>

                      {precio > 0 && (
                        <div className="col-12 mb-2">
                          <div className="alert alert-light border d-flex justify-content-between align-items-center">
                            <span>
                              <strong>Precio estimado:</strong> {fmtCOP(precio)}
                              {" • "}
                              <strong>Anticipo:</strong>{" "}
                              {f.anticipo ? fmtCOP(anticipoNumber) : fmtCOP(anticipoSugerido)}
                            </span>
                            {f.pago === "Pago en línea" && (
                              <a
                                className="btn btn-sm btn-primary"
                                style={{ backgroundColor: "#052368", borderColor: "#052368" }}
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  alert("PAGOOOOOOOOOOOO.");
                                }}
                              >
                                Pagar ahora
                              </a>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="col-12 mb-3">
                        <label className="form-label">Notas (opcional)</label>
                        <textarea
                          className="form-control"
                          rows={3}
                          value={f.notas}
                          onChange={handleChange("notas")}
                          placeholder="Alergias, preferencia de horario, EPS/aseguradora, etc."
                        />
                      </div>
                    </div>

                    <div className="d-flex flex-wrap gap-2">
                      

                     
                      

                      <button
                        type="submit"
                        className="btn btn-primary btn-lg w-100"
                        style={{ backgroundColor: "#052368ff", borderColor: "#052368ff" }}
                        onClick={() => {
                          setTouched(true);
                          if (formIsValid) downloadICS();
                        }}
                      >
                        Agendar
                      </button>
                    </div>
                  </form>

                  <div className="mt-3 small text-muted">
                    *Los precios son estimados y pueden variar según valoración médica.
                  </div>
                </div>
              </div>
            </div>

            {/* info de contacto */}
            <div className="text-center mt-4">
              <div className="text-muted">
                ¿Prefieres escribirnos directo?{" "}
                <a href={`https://wa.me/${WHATSAPP_NUM}`} target="_blank">WhatsApp</a> ·{" "}
                <a href={`mailto:${CLINIC_EMAIL}`}>{CLINIC_EMAIL}</a> ·{" "}
                <span><i className="fas fa-map-marker-alt me-1"></i>Clínica Medicadiz, Ibagué</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
