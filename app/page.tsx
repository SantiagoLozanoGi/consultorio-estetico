"use client";

import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section
        className="d-flex align-items-center"
        style={{
          backgroundImage: "url('/imagenes/estetica.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          color: "#333",
        }}
      >
        <div className="container text-end">
          {/* Nombre */}
          <h1 className="fw-bold display-5 mb-3 text-dark">
            Dra. Juliet Vanessa Medina Orjuela
          </h1>

          {/* Texto bienvenida */}
          <p className="lead text-muted mb-4">
            Hacemos del paso del tiempo tu mejor aliado, <br />
            guiado por expertos que comprenden su lenguaje
          </p>

          {/* Botones */}
          <Link href="/agendar" className="btn btn-primary btn-lg px-4 me-2">
            <i className="fas fa-calendar-check me-2"></i>Agendar Cita
          </Link>
        </div>
      </section>

      {/* SOBRE LA DRA */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4 text-center mb-4 mb-lg-0">
              <Image
                src="/imagenes/doctora.jpg"
                alt="Dra. Juliet Medina"
                width={300}
                height={300}
                className="img-fluid doctor-img"
              />
            </div>
            <div className="col-lg-8">
              <h2 className="fw-bold mb-4">Sobre la Dra. Juliet Medina</h2>
              <p className="lead">
                Médica Especialista en Medicina Estética con más de 10 años de experiencia.
              </p>
              <p>
                Graduada con honores de la Universidad del Tolima, con Maestría en Dirección y
                Gestión Sanitaria. Mi enfoque es proporcionar tratamientos personalizados que
                combinan lo último en tecnología con un enfoque holístico del bienestar.
              </p>

              <div className="row mt-4">
                <div className="col-md-6">
                  <h5>
                    <i className="fas fa-award text-primary me-2"></i>Especialidades
                  </h5>
                  <ul>
                    <li>Medicina Estética Facial</li>
                    <li>Nutrición y Control de Peso</li>
                    <li>Tratamientos Antiedad</li>
                    <li>Terapias de Regeneración Celular</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <h5>
                    <i className="fas fa-graduation-cap text-primary me-2"></i>Certificaciones
                  </h5>
                  <ul>
                    <li>Miembro de la Sociedad Colombiana de Medicina Estética</li>
                    <li>Certificada en Toxina Botulínica y Rellenos</li>
                    <li>Diplomado en Medicina Antienvejecimiento</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCEDIMIENTOS DESTACADOS */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Procedimientos Destacados</h2>
            <p className="lead">Descubre nuestros tratamientos más populares</p>
          </div>

          <div className="row g-4 justify-content-center">
            {[
              {
                img: "/imagenes/P_LimpiezaFacial.jpg",
                title: "Limpieza Facial",
                desc: "Tratamiento para suavizar y rejuvenecer la piel.",
                id: 1,
              },
              {
                img: "/imagenes/P_Botox.jpg",
                title: "Bótox",
                desc: "Tratamiento para suavizar arrugas de expresión con resultados naturales.",
                id: 1,
              },
              {
                img: "/imagenes/P_Acido_hialuronico.jpg",
                title: "Ácido Hialurónico en labios",
                desc: "Relleno para restaurar volumen y contorno de los labios.",
                id: 2,
              },
              {
                img: "/imagenes/P_Perfilamiento_Facial.jpg",
                title: "Ácido Hialurónico Facial",
                desc: "Rellenos faciales para restaurar volumen y contorno facial.",
                id: 2,
              },
              {
                img: "/imagenes/P_Tratamiento_Acne.jpg",
                title: "Tratamiento Para El Acné",
                desc: "Desinflamación de zonas afectadas con tecnología de última generación.",
                id: 3,
              },
              {
                img: "/imagenes/P_Tratamiento_Manchas.jpg",
                title: "Tratamiento Para Manchas",
                desc: "Inhibe la producción de melanina y renueva la piel con tecnología de última generación.",
                id: 3,
              },
            ].map((proc, idx) => (
              <div className="col-md-4" key={idx}>
                <div className="card procedure-card h-100">
                  <Image
                    src={proc.img}
                    alt={proc.title}
                    width={400}
                    height={200}
                    className="card-img-top"
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{proc.title}</h5>
                    <p className="card-text">{proc.desc}</p>
                    <Link
                      href={`/procedimientos/${proc.id}`}
                      className="btn btn-outline-primary"
                    >
                      Más información
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <Link href="/procedimientos" className="btn btn-primary btn-lg">
              Ver todos los procedimientos <i className="fas fa-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Lo que dicen nuestros pacientes</h2>

          <div className="row">
            {[
              {
                name: "María González",
                year: "Paciente desde 2020",
                img: "/imagenes/paciente1.jpg",
                text: "La Dra. Medina tiene un enfoque profesional y cálido. Los resultados de mi tratamiento superaron mis expectativas haciendo que tenga más confianza en mi trabajo.",
              },
              {
                name: "Daniela Hurrego",
                year: "Paciente desde 2021",
                img: "/imagenes/paciente2.jpg",
                text: "Excelente atención y resultados muy naturales. Me siento 10 años más joven gracias a sus tratamientos de aplicación de bótox.",
              },
              {
                name: "Ana Martínez",
                year: "Paciente desde 2019",
                img: "/imagenes/paciente3.jpg",
                text: "Profesionalismo y atención personalizada. Los tratamientos son indoloros y los resultados espectaculares.",
              },
            ].map((testi, idx) => (
              <div className="col-md-4 mb-4" key={idx}>
                <div className="card h-100">
                  <div className="card-body">
                    <div className="mb-3 text-warning">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))}
                    </div>
                    <p className="card-text">&quot;{testi.text}&quot;</p>
                    <div className="d-flex align-items-center">
                      <Image
                        src={testi.img}
                        alt={testi.name}
                        width={50}
                        height={50}
                        className="rounded-circle me-3"
                      />
                      <div>
                        <h6 className="mb-0">{testi.name}</h6>
                        <small className="text-muted">{testi.year}</small>
                      </div>
                    </div>
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
