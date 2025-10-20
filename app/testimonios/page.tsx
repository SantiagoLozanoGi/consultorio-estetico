"use client";

import { useState } from "react";
import Image from "next/image";

export default function TestimoniosPage() {
  const [videoActivo, setVideoActivo] = useState<number | null>(null);

  const testimonios = [
    {
      id: 1,
      thumb: "/imagenes/testimonio1.jpg",
      video: "/videos/testimonio1.mp4",
      nombre: "María G.",
      texto: "Recuperé la confianza en mi piel gracias al tratamiento facial de la doctora.",
    },
    {
      id: 2,
      thumb: "/imagenes/testimonio2.jpg",
      video: "/videos/testimonio2.mp4",
      nombre: "Laura R.",
      texto: "El Hydrafacial fue una experiencia increíble, mi piel se siente radiante.",
    },
    {
      id: 3,
      thumb: "/imagenes/testimonio3.jpg",
      video: "/videos/testimonio3.mp4",
      nombre: "Carolina P.",
      texto: "Resultados naturales, atención cálida y profesionalismo en cada detalle.",
    },
    {
      id: 4,
      thumb: "/imagenes/testimonio4.jpg",
      video: "/videos/testimonio4.mp4",
      nombre: "Valentina S.",
      texto: "Después de mi tratamiento de acné, mi rostro cambió por completo.",
    },
    {
      id: 5,
      thumb: "/imagenes/testimonio5.jpg",
      video: "/videos/testimonio5.mp4",
      nombre: "Andres E.",
      texto: "La Dra. Vanessa combina ciencia y arte. ¡Los resultados hablan por sí solos!",
    },
  ];

  return (
    <main>
      {/* 🌿 ENCABEZADO */}
      <section
        style={{
          background: "linear-gradient(180deg, #FAF9F7 0%, #F1E9E0 100%)",
          padding: "5rem 2rem 3rem",
          textAlign: "center",
        }}
      >
        <div className="container">
          <h1
            className="fw-bold mb-3"
            style={{
              color: "#4E3B2B",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Testimonios de Nuestros Pacientes
          </h1>
          <p
            className="lead mx-auto"
            style={{
              color: "#6C584C",
              maxWidth: "700px",
              fontSize: "1.1rem",
            }}
          >
            Historias reales de transformación, confianza y bienestar. 
            Descubre cómo nuestros tratamientos han mejorado la vida de quienes confían en nosotros.
          </p>
        </div>
      </section>

      {/* 🎥 GALERÍA DE TESTIMONIOS */}
      <section
        style={{
          backgroundColor: "#FAF9F7",
          padding: "3rem 2rem 5rem",
        }}
      >
        <div className="container">
          <div className="row g-4 justify-content-center">
            {testimonios.map((t) => (
              <div key={t.id} className="col-12 col-md-6 col-lg-4">
                <div
                  className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden"
                  style={{
                    backgroundColor: "#FFFDF9",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 20px rgba(176, 137, 104, 0.3)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(176, 137, 104, 0.15)";
                  }}
                  onClick={() =>
                    setVideoActivo(videoActivo === t.id ? null : t.id)
                  }
                >
                  {/* Portada o Video */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "9 / 16",
                      overflow: "hidden",
                      backgroundColor: "#000",
                    }}
                  >
                    {videoActivo === t.id ? (
                      <video
                        src={t.video}
                        controls
                        autoPlay
                        playsInline
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "12px",
                        }}
                      />
                    ) : (
                      <>
                        <Image
                          src={t.thumb}
                          alt={`Testimonio de ${t.nombre}`}
                          fill
                          style={{
                            objectFit: "cover",
                            borderRadius: "12px",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: "rgba(0, 0, 0, 0.35)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontSize: "2.5rem",
                            transition: "all 0.3s ease",
                          }}
                        >
                          <i className="fas fa-play-circle"></i>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Texto */}
                  <div className="card-body text-center p-4">
                    <h5
                      className="fw-bold mb-2"
                      style={{
                        color: "#4E3B2B",
                        fontFamily: "'Playfair Display', serif",
                      }}
                    >
                      {t.nombre}
                    </h5>
                    <p
                      className="text-muted mb-0"
                      style={{
                        color: "#6C584C",
                        fontSize: "0.95rem",
                        lineHeight: "1.5",
                      }}
                    >
                      {t.texto}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
