"use client";

import Image from "next/image";
import Link from "next/link";

export default function ProcedimientosDestacados() {
  const procedimientos = [
    {
      id: 1,
      img: "/imagenes/limpiezaFacial2.jpg",
      title: "Hydrafacial",
      desc: "Tecnología avanzada que limpia, exfolia, extrae e hidrata la piel en una sola sesión. Ideal para mejorar textura, luminosidad y salud cutánea.",
      icon: "fa-droplet",
    },
    {
      id: 2,
      img: "/imagenes/P_Botox.jpg",
      title: "Toxina Botulínica (Bótox)",
      desc: "Relaja los músculos de expresión para suavizar arrugas del rostro sin alterar la naturalidad de tus gestos.",
      icon: "fa-syringe",
    },
    {
      id: 3,
      img: "/imagenes/P_Acido_hialuronico_labios.jpg",
      title: "Ácido Hialurónico en Labios",
      desc: "Define, hidrata y aporta volumen natural a los labios, resaltando su forma de manera armónica y segura.",
      icon: "fa-lips",
    },
    {
      id: 4,
      img: "/imagenes/P_Acido_hialuronicoFacial.jpg",
      title: "Ácido Hialurónico Facial",
      desc: "Rellenos dérmicos para perfilar el rostro, restaurar volumen y realzar tus facciones con un efecto rejuvenecedor inmediato.",
      icon: "fa-face-smile",
    },
    {
      id: 5,
      img: "/imagenes/P_Tratamiento_Acne.jpg",
      title: "Tratamiento para el Acné",
      desc: "Controla la producción de grasa, desinflama y mejora la textura de la piel reduciendo brotes y marcas.",
      icon: "fa-notes-medical",
    },
    {
      id: 6,
      img: "/imagenes/P_Tratamiento_Manchas.jpg",
      title: "Tratamiento para Manchas (Peeling)",
      desc: "Reduce hiperpigmentaciones y unifica el tono de la piel con protocolos médicos personalizados.",
      icon: "fa-sun",
    },
    {
      id: 7,
      img: "/imagenes/P_tratamientoEstrias.jpg",
      title: "Tratamiento de Estrías",
      desc: "Terapias combinadas que estimulan el colágeno y mejoran la apariencia de estrías recientes y antiguas.",
      icon: "fa-wand-magic-sparkles",
    },
  ];

  return (
    <section
      className="py-5"
      style={{
        background: "linear-gradient(180deg, #FAF9F7 0%, #FFFFFF 100%)",
      }}
    >
      <div
        className="container shadow-lg p-5 rounded-4"
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          marginTop: "-60px",
          border: "1px solid #E9DED2",
        }}
      >
        {/* Encabezado */}
        <div className="text-center mb-5">
          <h2
            className="fw-bold"
            style={{
              color: "#4E3B2B",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Procedimientos Destacados
          </h2>
          <p
            className="lead"
            style={{
              color: "#6C584C",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            Tratamientos estéticos y médicos diseñados para resaltar tu belleza
            natural, con resultados armónicos, seguros y personalizados.
          </p>
        </div>

        {/* Tarjetas */}
        <div className="row g-5 justify-content-center">
          {procedimientos.map((p) => (
            <div className="col-12 col-md-6 col-lg-4" key={p.id}>
              <div
                className="position-relative"
                style={{
                  paddingBottom: "90px",
                }}
              >
                {/* Imagen principal */}
                <div
                  className="rounded-4 overflow-hidden shadow-sm"
                  style={{
                    transition: "transform 0.4s ease, box-shadow 0.4s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "scale(1.03)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 20px rgba(176, 137, 104, 0.3)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 5px 12px rgba(0,0,0,0.08)";
                  }}
                >
                  <Image
                    src={p.img}
                    alt={p.title}
                    width={900}
                    height={1200}
                    className="w-100"
                    style={{
                      height: 420,
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                    }}
                  />
                </div>

                {/* Tarjeta inferior */}
                <div
                  className="position-absolute start-0 end-0"
                  style={{ bottom: 0 }}
                >
                  <div
                    className="rounded-4 shadow p-4 mx-3"
                    style={{
                      backgroundColor: "#FAF9F7",
                      border: "1px solid #E9DED2",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 16px rgba(0,0,0,0.1)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 10px rgba(0,0,0,0.05)";
                    }}
                  >
                    <div className="d-flex align-items-start">
                      {/* Icono animado */}
                      <div
                        className="me-3 d-flex align-items-center justify-content-center rounded-circle"
                        style={{
                          width: 50,
                          height: 50,
                          backgroundColor: "#E9DED2",
                          color: "#B08968",
                          transition: "transform 0.4s ease, background 0.4s ease",
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = "#B08968";
                          e.currentTarget.style.color = "#FFF";
                          e.currentTarget.style.transform = "rotate(15deg)";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = "#E9DED2";
                          e.currentTarget.style.color = "#B08968";
                          e.currentTarget.style.transform = "rotate(0deg)";
                        }}
                      >
                        <i className={`fas ${p.icon} fa-lg`}></i>
                      </div>

                      <div>
                        <h5
                          className="fw-bold mb-2"
                          style={{
                            color: "#4E3B2B",
                            fontFamily: "'Playfair Display', serif",
                          }}
                        >
                          {p.title}
                        </h5>
                        <p
                          className="text-muted mb-3"
                          style={{
                            color: "#6C584C",
                            lineHeight: 1.5,
                            fontSize: "0.95rem",
                          }}
                        >
                          {p.desc}
                        </p>

                        <Link
                          href={`/procedimientos/${p.id}`}
                          className="fw-semibold"
                          style={{
                            color: "#B08968",
                            textDecoration: "none",
                            transition: "color 0.3s ease, transform 0.3s ease",
                            display: "inline-block",
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.color = "#A1724F";
                            e.currentTarget.style.transform = "translateX(3px)";
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.color = "#B08968";
                            e.currentTarget.style.transform = "translateX(0)";
                          }}
                        >
                          Ver más <i className="fas fa-arrow-right ms-1"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botón final */}
        <div className="text-center mt-5">
          <Link
            href="/agendar"
            className="fw-semibold"
            style={{
              display: "inline-block",
              padding: "0.9rem 2.5rem",
              borderRadius: "40px",
              border: "2px solid #B08968",
              color: "#4E3B2B",
              backgroundColor: "transparent",
              transition: "all 0.35s ease",
              textDecoration: "none",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#B08968";
              e.currentTarget.style.color = "#FFF";
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow =
                "0 6px 16px rgba(176, 137, 104, 0.4)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#4E3B2B";
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <i className="fas fa-calendar-check me-2"></i> Agendar una cita
          </Link>
        </div>
      </div>
    </section>
  );
}
