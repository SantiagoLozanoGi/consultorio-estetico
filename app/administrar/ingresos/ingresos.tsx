"use client";

import { useState, useEffect } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import HistorialReportes from "./historialReportes";

const MESES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

interface Totales {
  totalOnline: number;
  totalConsultorio: number;
  totalEsperado: number;
}

const fmt = (v: number) => `$${v.toLocaleString("es-CO")}`;

export default function IngresosPage() {
  const fechaActual = new Date();
  const [anio, setAnio] = useState(fechaActual.getFullYear());
  const [mes, setMes] = useState(fechaActual.getMonth());
  const [ingresos, setIngresos] = useState<Totales>({ totalOnline: 0, totalConsultorio: 0, totalEsperado: 0 });
  const [loading, setLoading] = useState(false);
  const [mostrarHistorial, setMostrarHistorial] = useState(false);
  const [guardandoReporte, setGuardandoReporte] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Construir datos del gráfico para los 6 últimos meses
  const [dataChart, setDataChart] = useState<any[]>([]);

  const showToast = (msg: string) => {
    setToastMsg(msg); setTimeout(() => setToastMsg(null), 3000);
  };

  /* ── Cargar totales del mes seleccionado ─────────────────────────────── */
  const cargarTotales = async () => {
    setLoading(true);
    try {
      const res = await api.get<{ ok: boolean } & Totales>(
        `/ingresos/totales?year=${anio}&month=${mes}`
      );
      if (res.ok) {
        setIngresos({
          totalOnline: res.totalOnline,
          totalConsultorio: res.totalConsultorio,
          totalEsperado: res.totalEsperado,
        });
      }
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  /* ── Cargar los últimos 6 meses para el gráfico ──────────────────────── */
  const cargarChart = async () => {
    const puntos: any[] = [];
    for (let i = 5; i >= 0; i--) {
      let m = mes - i;
      let a = anio;
      if (m < 0) { m += 12; a -= 1; }
      try {
        const res = await api.get<{ ok: boolean } & Totales>(
          `/ingresos/totales?year=${a}&month=${m}`
        );
        if (res.ok) {
          puntos.push({
            mes: MESES[m].slice(0, 3),
            Online: res.totalOnline,
            Consultorio: res.totalConsultorio,
            Esperado: res.totalEsperado,
          });
        }
      } catch { /* ignorar errores individuales */ }
    }
    setDataChart(puntos);
  };

  useEffect(() => {
    cargarTotales();
    cargarChart();
  }, [mes, anio]);

  /* ── Guardar reporte en BD ───────────────────────────────────────────── */
  const handleGuardarReporte = async () => {
    setGuardandoReporte(true);
    try {
      await api.post("/reportes", {
        mes: mes + 1, anio,
        totalOnline: ingresos.totalOnline,
        totalConsultorio: ingresos.totalConsultorio,
        totalEsperado: ingresos.totalEsperado,
      });
      showToast("✅ Reporte guardado correctamente");
    } catch (e: any) {
      showToast("❌ Error guardando reporte: " + e.message);
    } finally {
      setGuardandoReporte(false);
    }
  };

  const tarjetas = [
    { label: "Pagos Online", value: ingresos.totalOnline, color: "#1B4F72", bg: "#D6EAF8" },
    { label: "Pagos Consultorio", value: ingresos.totalConsultorio, color: "#2D6A4F", bg: "#D8F3DC" },
    { label: "Total Esperado", value: ingresos.totalEsperado, color: "#7F5539", bg: "#F5EEE6" },
  ];

  return (
    <div>
      <h2 className="fw-bold mb-4" style={{ color: "#4E3B2B" }}>Ingresos</h2>

      {toastMsg && (
        <div className="alert rounded-3 py-2 px-4 mb-3 text-center fw-semibold" style={{ backgroundColor: "#E9DED2", color: "#4E3B2B" }}>
          {toastMsg}
        </div>
      )}

      {/* Selector mes / año */}
      <div className="d-flex gap-3 align-items-center mb-5 flex-wrap">
        <select className="form-select form-select-sm" style={{ maxWidth: 160, borderColor: "#E9DED2" }} value={mes} onChange={(e) => setMes(Number(e.target.value))}>
          {MESES.map((m, i) => <option key={i} value={i}>{m}</option>)}
        </select>
        <select className="form-select form-select-sm" style={{ maxWidth: 100, borderColor: "#E9DED2" }} value={anio} onChange={(e) => setAnio(Number(e.target.value))}>
          {[2023, 2024, 2025, 2026].map((a) => <option key={a}>{a}</option>)}
        </select>
        <button onClick={handleGuardarReporte} disabled={guardandoReporte || loading} className="btn btn-sm rounded-pill fw-semibold px-4" style={{ backgroundColor: "#8B6A4B", color: "#fff", border: "none" }}>
          {guardandoReporte ? "Guardando…" : "💾 Guardar reporte"}
        </button>
      </div>

      {/* Tarjetas */}
      <div className="row g-4 mb-5">
        {tarjetas.map((t) => (
          <div key={t.label} className="col-md-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-4 p-4 shadow-sm text-center"
              style={{ backgroundColor: t.bg, border: `1px solid ${t.color}22` }}
            >
              <p className="small fw-semibold mb-1" style={{ color: t.color }}>{t.label}</p>
              {loading ? (
                <div className="spinner-border spinner-border-sm" style={{ color: t.color }} role="status" />
              ) : (
                <h3 className="fw-bold m-0" style={{ color: t.color }}>{fmt(t.value)}</h3>
              )}
              <p className="small mb-0 mt-1" style={{ color: t.color + "99" }}>
                {MESES[mes]} {anio}
              </p>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Gráfico últimos 6 meses */}
      {dataChart.length > 0 && (
        <div className="rounded-4 p-4 shadow-sm mb-5" style={{ backgroundColor: "#FFFDF9", border: "1px solid #E9DED2" }}>
          <h5 className="fw-semibold mb-4" style={{ color: "#4E3B2B" }}>Últimos 6 meses</h5>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={dataChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E9DED2" />
              <XAxis dataKey="mes" tick={{ fontSize: 12, fill: "#8B7060" }} />
              <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: "#8B7060" }} />
              <Tooltip formatter={(v: number) => fmt(v)} />
              <Line type="monotone" dataKey="Online" stroke="#1B4F72" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="Consultorio" stroke="#2D6A4F" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="Esperado" stroke="#B08968" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Historial de reportes */}
      <div className="mt-2">
        <button
          onClick={() => setMostrarHistorial((v) => !v)}
          className="btn rounded-pill fw-semibold px-4 mb-3"
          style={{ backgroundColor: "#E9DED2", color: "#4E3B2B", border: "none" }}
        >
          {mostrarHistorial ? "▲ Ocultar" : "▼ Ver"} historial de reportes
        </button>
        {mostrarHistorial && <HistorialReportes />}
      </div>
    </div>
  );
}