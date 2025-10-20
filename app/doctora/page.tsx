"use client";

import Image from "next/image";
import Link from "next/link";

export default function DoctoraPage() {
  return (
    <main>
      {/* SECCIÓN PRINCIPAL */}
      <section
        style={{
          background: "linear-gradient(180deg, #FAF9F7 0%, #F1E9E0 100%)",
          padding: "5rem 2rem",
        }}
      >
        <div
          className="container d-flex flex-column flex-lg-row align-items-center justify-content-center text-center text-lg-start"
          style={{ gap: "3rem" }}
        >
          {/* Imagen izquierda */}
          <div className="d-none d-lg-block">
            <Image
              src="/imagenes/doctoraPerfil2.jpg" 
              alt="Dra. Vanessa Medina"
              width={350}
              height={450}
              className="rounded-4 shadow-lg"
              style={{
                objectFit: "cover",
                border: "4px solid #E9DED2",
              }}
            />
          </div>

          {/* Texto central */}
          <div style={{ maxWidth: "600px" }}>
            <h2
              className="fw-bold mb-3"
              style={{
                color: "#4E3B2B",
                fontFamily: "'Playfair Display', serif",
                textAlign: "center",
              }}
            >
              Dra. Vanessa Medina
            </h2>
            <p
              className="lead mb-4"
              style={{
                color: "#6C584C",
                lineHeight: "1.7",
                fontSize: "1.1rem",
                textAlign: "center",
              }}
            >
              Especialista en Medicina Estética, Antienvejecimiento y Salud
              Integral. Combinando ciencia y arte para lograr resultados
              naturales, armónicos y personalizados.
            </p>

            <p
              style={{
                color: "#4E3B2B",
                fontSize: "0.95rem",
                textAlign: "center",
              }}
            >
              Con más de 5 años de experiencia en tratamientos faciales y
              corporales, la doctora se especializa en técnicas mínimamente
              invasivas, priorizando siempre la seguridad, la armonía y el
              bienestar integral de cada paciente.
            </p>

            <div className="text-center mt-4">
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
                <i className="fas fa-calendar-check me-2"></i> Agendar cita
              </Link>
            </div>
          </div>

          {/* Imagen derecha */}
          <div className="d-none d-lg-block">
            <Image
              src="/imagenes/doctoraPerfil3.jpg" 
              alt="Dra. Vanessa Medina"
              width={350}
              height={450}
              className="rounded-4 shadow-lg"
              style={{
                objectFit: "cover",
                border: "4px solid #E9DED2",
              }}
            />
          </div>
        </div>
      </section>

      {/* SECCIÓN DE ESPECIALIDADES */}
<section
  style={{
    background: "#FAF9F7",
    padding: "4rem 2rem",
    borderTop: "1px solid #E9DED2",
  }}
>
  <div className="container text-center">
    <h3
      className="fw-bold mb-4"
      style={{
        color: "#3B2A1A",
        fontFamily: "'Playfair Display', serif",
      }}
    >
      Especialidades y Certificaciones
    </h3>

    <div className="row justify-content-center g-4">
      {/* Especialidades */}
      <div className="col-md-5">
        <div
          className="p-4 rounded-4 shadow-sm h-100"
          style={{
            backgroundColor: "#FFFDF9",
            border: "1px solid #E9DED2",
          }}
        >
          <h5
            className="fw-bold mb-3"
            style={{
              color: "#8C6D4F",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Especialidades
          </h5>
          <ul className="list-unstyled mb-0 text-start">
            {[
              "Medicina Estética",
              "Antienvejecimiento",
              "Inyectora Elite",
              "Salud Integral y Bienestar Facial",
            ].map((item, i) => (
              <li
                key={i}
                className="mb-2"
                style={{
                  color: "#3B2A1A",
                  fontSize: "1.05rem",
                  fontWeight: 500,
                }}
              >
                <i
                  className="fas fa-check me-2"
                  style={{ color: "#B08968" }}
                ></i>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Certificaciones */}
      <div className="col-md-5">
        <div
          className="p-4 rounded-4 shadow-sm h-100"
          style={{
            backgroundColor: "#FFFDF9",
            border: "1px solid #E9DED2",
          }}
        >
          <h5
            className="fw-bold mb-3"
            style={{
              color: "#8C6D4F",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Certificaciones
          </h5>
          <ul className="list-unstyled mb-0 text-start">
            {[
              "Sociedad Colombiana de Medicina Estética",
              "Diplomado en Medicina Antienvejecimiento",
              "Magíster en Gerencia Hospitalaria",
            ].map((item, i) => (
              <li
                key={i}
                className="mb-2"
                style={{
                  color: "#3B2A1A",
                  fontSize: "1.05rem",
                  fontWeight: 500,
                }}
              >
                <i
                  className="fas fa-certificate me-2"
                  style={{ color: "#B08968" }}
                ></i>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* 🌿 SECCIÓN VALORES Y FILOSOFÍA */}
      <section
        style={{
          background: "linear-gradient(180deg, #F8F5F0 0%, #FAF9F7 100%)",
          padding: "5rem 2rem",
        }}
      >
        <div className="container text-center">
          <h3
            className="fw-bold mb-5"
            style={{
              color: "#4E3B2B",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Filosofía y Valores de la Práctica
          </h3>

          <div className="row justify-content-center g-4">
            {[
              {
                icon: "fa-heart",
                title: "Cuidado Personalizado",
                text: "Cada paciente es único. Ofrecemos planes adaptados a sus necesidades estéticas y emocionales.",
              },
              {
                icon: "fa-hand-holding-medical",
                title: "Seguridad ante todo",
                text: "Todos los procedimientos se realizan con protocolos médicos certificados y materiales aprobados.",
              },
              {
                icon: "fa-leaf",
                title: "Naturalidad y Armonía",
                text: "Nuestro enfoque busca resaltar tu belleza natural sin perder la expresión ni autenticidad.",
              },
              {
                icon: "fa-user-md",
                title: "Ciencia y Arte",
                text: "La medicina estética combina precisión médica con sensibilidad artística para resultados perfectos.",
              },
            ].map((v, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-3">
                <div
                  className="p-4 rounded-4 shadow-sm h-100"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E9DED2",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.03)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <div
                    className="mb-3"
                    style={{
                      fontSize: "2rem",
                      color: "#B08968",
                    }}
                  >
                    <i className={`fas ${v.icon}`}></i>
                  </div>
                  <h5 className="fw-bold mb-2" style={{ color: "#4E3B2B" }}>
                    {v.title}
                  </h5>
                  <p className="text-muted" style={{ fontSize: "0.95rem" }}>
                    {v.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
