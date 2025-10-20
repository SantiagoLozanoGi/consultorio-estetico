"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Galeria3D from "@/components/Galeria3D";
import Counter from "@/components/Counter";

export default function HomePage() {
 
  const imagenes = [
    "/imagenes/carrucel1.jpg",
    "/imagenes/carrucel2.jpg",
    "/imagenes/carrucel3.jpg",
    "/imagenes/carrucel4.jpg",
    "/imagenes/carrucel5.jpg",
    "/imagenes/carrucel6.jpg",
  ];

  const [imagenActual, setImagenActual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setImagenActual((prev) => (prev + 1) % imagenes.length);
    }, 5000);
    return () => clearInterval(intervalo);
  }, [imagenes.length]);

  const tratamientos = [
    {
      img: "/imagenes/P_Tratamiento_Acne.jpg",
      title: "Tratamiento contra el Acné",
      desc: "Reduce brotes, limpia poros y mejora la textura de la piel para un cutis más uniforme y saludable.",
      id: 1,
    },
    {
      img: "/imagenes/P_perfilamientoRostro.jpg",
      title: "Perfilamiento Facial",
      desc: "Resalta tus rasgos con técnicas de armonización facial, definiendo contornos de forma natural y precisa.",
      id: 2,
    },
    {
      img: "/imagenes/P_Tratamiento_Manchas.jpg",
      title: "Tratamiento Antimanchas",
      desc: "Aclara y unifica el tono de la piel, reduciendo hiperpigmentaciones y devolviendo luminosidad al rostro.",
      id: 3,
    },
  ];

  return (
    <>
      {/* HERO */}
      <section
        className="hero d-flex flex-column flex-lg-row align-items-stretch"
        style={{
          height: "100vh",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Carrusel (izquierda) */}
        <div
          className="hero-left position-relative d-none d-md-block"

          style={{
            flex: "1 1 40%",
            height: "100%",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {imagenes.map((img, index) => (
            <div
              key={index}
              style={{
                position: "absolute",
                inset: 0,
                opacity: index === imagenActual ? 1 : 0,
                transform: index === imagenActual ? "scale(1)" : "scale(1.05)",
                transition: "opacity 2s ease-in-out, transform 5s ease",
              }}
            >
              <Image
                src={img}
                alt={`Imagen ${index + 1}`}
                fill
                priority={index === 0}
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </div>
          ))}
        </div>
          {/* Carrusel estático visible solo en móviles */}
<div className="d-block d-md-none w-100 position-relative" style={{ height: "60vh" }}>
  <Image
    src={imagenes[0]}
    alt="Imagen destacada"
    fill
    priority
    style={{
      objectFit: "cover",
      objectPosition: "center",
    }}
  />
</div>

        {/* Texto (derecha) */}
        <div
          className="hero-right d-flex flex-column justify-content-center text-center text-lg-start"
          style={{
            flex: "1 1 50%",
            background: "linear-gradient(135deg, #FAF9F7 0%, #E9DED2 100%)",
            padding: "3rem 2rem 4rem",
            color: "#4E3B2B",
          }}
        >
          <div className="container">
            <h1
              className="fw-bold mb-4"
              style={{
                color: "#4E3B2B",
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                lineHeight: "1.3",
              }}
            >
              ¡La innovadora y exclusiva tecnología de Hydrafacial, está en el
              consultorio de la Dra. Vanessa Medina!
            </h1>

            <p
              className="lead mb-4"
              style={{
                color: "#6C584C",
                fontSize: "clamp(1rem, 2vw, 1.1rem)",
                lineHeight: "1.7",
              }}
            >
              “El bienestar verdadero nace del equilibrio: cuerpo fuerte, mente
              serena y emociones en armonía. La salud y la estética se construyen
              cultivando hábitos que nos mantienen jóvenes y en paz.”
            </p>

            <Link
              href="/agendar"
              className="btn btn-lg fw-semibold d-inline-flex align-items-center justify-content-center mx-auto mx-lg-0"
              style={{
                backgroundColor: "#B08968",
                color: "white",
                borderRadius: "50px",
                padding: "0.9rem 2.5rem",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#A1724F";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "#B08968";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <i className="fas fa-calendar-check me-2"></i> Agendar Cita
            </Link>
          </div>
        </div>
      </section>

      {/* SOBRE LA DRA */}
      <section
        className="py-5"
        style={{
          background: "linear-gradient(180deg, #F8F5F0 0%, #FFFFFF 100%)",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div
                className="card border-0 shadow-lg overflow-hidden"
                style={{ backgroundColor: "#FAF9F7" }}
              >
                <div className="row g-0 align-items-center flex-column flex-lg-row text-center text-lg-start">
                  {/* Imagen */}
                  <div
                    className="col-lg-4 p-4"
                    style={{ backgroundColor: "#FFFDF9" }}
                  >
                    <Image
                      src="/imagenes/hydroface.jpg"
                      alt="Dra. Juliet Medina"
                      width={320}
                      height={320}
                      className="img-fluid rounded-4 shadow-sm"
                      style={{ aspectRatio: "1/1", objectFit: "cover" }}
                    />
                    <div className="d-flex justify-content-center gap-4 mt-4">
                      <Counter end={3000} label="Pacientes" suffix="+" duration={2500} />
                      <Counter end={15} label="Procedimientos" suffix="+" duration={2000} />
                    </div>
                  </div>

                  {/* Texto */}
                  <div className="col-lg-8 p-4 p-lg-5">
                    <h2
                      className="fw-bold mb-3"
                      style={{
                        color: "#4E3B2B",
                        fontFamily: "'Playfair Display', serif",
                      }}
                    >
                      Dra. Juliet Medina
                    </h2>
                    <p
                      style={{
                        color: "#6C584C",
                        fontSize: "1rem",
                        lineHeight: "1.6",
                      }}
                    >
                      Médica especialista en Medicina Estética con más de 5 años
                      de experiencia. Tratamientos personalizados con enfoque en
                      resultados naturales y bienestar integral.
                    </p>

                    <Link
                      href="/doctora"
                      className="fw-semibold mt-3 d-inline-block"
                      style={{
                        padding: "0.85rem 2.2rem",
                        borderRadius: "40px",
                        border: "2px solid #B08968",
                        color: "#4E3B2B",
                        textDecoration: "none",
                        transition: "all 0.3s ease",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = "#B08968";
                        e.currentTarget.style.color = "#FFF";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "#4E3B2B";
                      }}
                    >
                      Conocer más sobre la doctora
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALERÍA 3D */}
      <section
        className="py-5"
        style={{
          backgroundColor: "#FAF9F7",
          borderTop: "1px solid #E8E1D4",
          borderBottom: "1px solid #E8E1D4",
        }}
      >
        <div className="text-center mb-5">
          <h2 className="fw-bold" style={{ color: "#4E3B2B" }}>
            Tratamientos más demandados
          </h2>
          <p className="lead" style={{ color: "#6C584C" }}>
            Explora de forma interactiva algunos de nuestros procedimientos más
            aclamados
          </p>
        </div>
        <Galeria3D />
      </section>

      {/* 🌿 PROCEDIMIENTOS VARIOS */}
      <section
        className="py-5"
        style={{
          background: "linear-gradient(180deg, #FAF9F7 0%, #F1E9E0 100%)",
        }}
      >
        <div className="container">
          <div className="text-center mb-5">
            <h2
              className="fw-bold"
              style={{
                color: "#4E3B2B",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Procedimientos Varios
            </h2>
            <p className="lead" style={{ color: "#6C584C" }}>
              Descubre nuestros tratamientos más solicitados y efectivos
            </p>
          </div>

          <div className="row g-4">
            {tratamientos.map((p, i) => (
              <div className="col-12 col-md-6 col-lg-4" key={i}>
                <div
                  className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden"
                  style={{
                    backgroundColor: "#FFFDF9",
                    transition: "all 0.35s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <Image
                    src={p.img}
                    alt={p.title}
                    width={600}
                    height={400}
                    className="card-img-top"
                    style={{
                      objectFit: "cover",
                      height: "250px",
                      borderBottom: "3px solid #E9DED2",
                    }}
                  />
                  <div className="card-body p-4 text-center text-lg-start">
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
                      style={{ color: "#6C584C" }}
                    >
                      {p.desc}
                    </p>
                    <Link
                      href={`/procedimientos/`}
                      className="fw-semibold text-decoration-none"
                      style={{
                        color: "#B08968",
                        transition: "color 0.3s ease",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.color = "#8C6D4F")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.color = "#B08968")
                      }
                    >
                      Ver más{" "}
                      <i className="fas fa-arrow-right ms-1"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
