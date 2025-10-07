"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react"; 


export default function HomePage() {
  
  const imagenes = [
    "/imagenes/carru.png",
    "/imagenes/Cbotox.jpg",
    "/imagenes/Cbotox2.jpg",
    "/imagenes/Ccirujia.jpg",
    "/imagenes/Cfacial.jpg",
    "/imagenes/Climpieza.jpg",
    "/imagenes/Cmascarilla.jpg",
    "/imagenes/Cmascarilla2.jpg",
    "/imagenes/Cmascarilla3.jpg",
    "/imagenes/Cnariz.jpg",
  
  ];

  const [imagenActual, setImagenActual] = useState(0);


  useEffect(() => {
    const intervalo = setInterval(() => {
      setImagenActual((prev) => (prev + 1) % imagenes.length);
    }, 5000); // 5000 = 5 segundos
    return () => clearInterval(intervalo);
  }, []);

  return (
    <>
      {/* HERO */}
      <section
        className="d-flex align-items-center justify-content-end text-end"
        style={{
          backgroundImage: `url('${imagenes[imagenActual]}')`, 
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          color: "#fff",
          transition: "background-image 1s ease-in-out", 
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


{/* SOBRE LA DRA*/}
<section
  className="py-5"
  style={{
    background: "linear-gradient(180deg, #f6f9ff 0%, #ffffff 100%)",
  }}
>
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-lg-10">
        <div className="card border-0 shadow-lg overflow-hidden">
          <div className="row g-0 align-items-center">
            {/* Imagen */}
            <div className="col-lg-4 p-4 text-center bg-white">
              <div className="position-relative d-inline-block">
                <Image
                  src="/imagenes/doctora.jpg"
                  alt="Dra. Juliet Medina"
                  width={320}
                  height={320}
                  className="img-fluid rounded-4 object-fit-cover"
                  style={{ aspectRatio: "1/1" }}
                />
              
              </div>

              {/* mini stats */}
              <div className="d-flex justify-content-center gap-3 mt-3">
                <div className="text-center">
                  <div className="h5 mb-0">3k+</div>
                  <small className="text-muted">Pacientes</small>
                </div>
                <div className="text-center">
                  <div className="h5 mb-0">15+</div>
                  <small className="text-muted">Procedimientos</small>
                </div>
              </div>
            </div>

            {/* Contenido */}
            <div className="col-lg-8 p-4 p-lg-5">
              <span className="badge mb-3" style={{ backgroundColor: "#E8F0FF", color: "#1E63FF" }}>
                Medicina Estética • Antienvejecimiento
              </span>

              <h2 className="fw-bold mb-2">Dra. Juliet Medina</h2>
              <p className="text-muted mb-4">
                Médica especialista en Medicina Estética con más de 10 años de experiencia.
                Tratamientos personalizados con enfoque en resultados naturales y bienestar integral.
              </p>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <h5 className="mb-3">
                    <i className="fas fa-award text-primary me-2"></i>Especialidades
                  </h5>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Medicina Estética Facial</li>
                    <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Nutrición y Control de Peso</li>
                    <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Tratamientos Antiedad</li>
                    <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Terapias de Regeneración Celular</li>
                  </ul>
                </div>
                <div className="col-md-6 mb-3">
                  <h5 className="mb-3">
                    <i className="fas fa-graduation-cap text-primary me-2"></i>Certificaciones
                  </h5>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2"><i className="fas fa-certificate text-warning me-2"></i>Sociedad Colombiana de Medicina Estética</li>
                    <li className="mb-2"><i className="fas fa-certificate text-warning me-2"></i>Toxina Botulínica y Rellenos</li>
                    <li className="mb-2"><i className="fas fa-certificate text-warning me-2"></i>Diplomado en Medicina Antienvejecimiento</li>
                  </ul>
                </div>
              </div>

              {/* Botones */}
              <div className="mt-4 d-flex flex-wrap gap-3">
               

                {/* abre el modal */}
                <button
                  className="btn btn-outline-primary btn-lg px-4"
                  style={{ borderColor: "#1E63FF", color: "#1E63FF" }}
                  data-bs-toggle="modal"
                  data-bs-target="#certificadosModal"
                >
                  Ver certificados
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL: galería de certificados */}
        <div className="modal fade" id="certificadosModal" tabIndex={-1} aria-hidden="true">
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Certificados de la Doctora</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  {/* Reemplaza las imágenes por tus certificados reales */}
                  {[
                    "/imagenes/certificados/cert1.jpg",
                    "/imagenes/certificados/cert2.jpg",
                    "/imagenes/certificados/cert3.jpg",
                    "/imagenes/certificados/cert4.jpg",
                  ].map((src, i) => (
                    <div className="col-md-6 col-lg-4" key={i}>
                      <div className="border rounded-3 overflow-hidden shadow-sm">
                        <Image
                          src={src}
                          alt={`Certificado ${i + 1}`}
                          width={600}
                          height={400}
                          className="img-fluid"
                          style={{ objectFit: "cover", height: 220, width: "100%" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
       
      </div>
    </div>
  </div>
</section>

{/* PROCEDIMIENTOS DESTACADOS */}
<section
  className="py-5"
  style={{
    background: "linear-gradient(180deg,#f6f9ff 0%,#ffffff 100%)",
  }}
>
  <div
    className="container shadow-lg p-5 rounded-4"
    style={{
      background: "rgba(255, 255, 255, 0.9)",
      backdropFilter: "blur(10px)",
      marginTop: "-80px",
      border: "1px solid #e0e0e0",
    }}
  >
       <div className="text-center mb-5">
      <h2 className="fw-bold" style={{ color: "#1E63FF" }}>
        Procedimientos Destacados
      </h2>
      <p className="lead" style={{ color: "#333" }}>
        Descubre nuestros tratamientos más populares
      </p>
    </div>



    <div className="row g-5 justify-content-center">
      {[
        {
          img: "/imagenes/P_LimpiezaFacial.jpg",
          title: "Limpieza Facial",
          desc: "Tratamiento para suavizar y rejuvenecer la piel.",
          id: 1,
          icon: "fa-spa",
        },
        {
          img: "/imagenes/P_Botox.jpg",
          title: "Bótox",
          desc: "Suaviza arrugas de expresión con resultados naturales.",
          id: 1,
          icon: "fa-syringe",
        },
        {
          img: "/imagenes/P_Acido_hialuronico.jpg",
          title: "Ácido Hialurónico en labios",
          desc: "Restaura volumen y contorno de los labios.",
          id: 2,
          icon: "fa-cloud",
        },
        {
          img: "/imagenes/P_Perfilamiento_Facial.jpg",
          title: "Ácido Hialurónico Facial",
          desc: "Rellenos para perfilar y armonizar el rostro.",
          id: 2,
          icon: "fa-solid fa-face-smile", 
        },
        {
          img: "/imagenes/P_Tratamiento_Acne.jpg",
          title: "Tratamiento Para El Acné",
          desc: "Desinflama y mejora la textura de la piel.",
          id: 3,
          icon: "fa-notes-medical",
        },
        {
          img: "/imagenes/P_Tratamiento_Manchas.jpg",
          title: "Tratamiento Para Manchas",
          desc: "Inhibe melanina y renueva la piel.",
          id: 3,
          icon: "fa-sun",
        },
      ].map((p, i) => (
        <div className="col-12 col-md-6 col-lg-4" key={i}>
          
          <div className="position-relative" style={{ paddingBottom: "90px" }}>
           
            <div className="rounded-4 overflow-hidden shadow-sm">
              <Image
                src={p.img}
                alt={p.title}
                width={900}
                height={1200}
                className="w-100"
                style={{ height: 420, objectFit: "cover" }}
              />
            </div>

            
            <div className="position-absolute start-0 end-0" style={{ bottom: 0 }}>
              <div className="bg-white rounded-4 shadow p-4 mx-3">
                <div className="d-flex align-items-start">
                  <div
                    className="me-3 d-flex align-items-center justify-content-center rounded"
                    style={{
                      width: 44,
                      height: 44,
                      backgroundColor: "#E8F0FF",
                      color: "#1E63FF",
                    }}
                  >
                    <i className={`fas ${p.icon}`}></i>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-2" style={{ color: "#0B2A3B" }}>
                      {p.title}
                    </h5>
                    <p className="text-muted mb-3" style={{ lineHeight: 1.5 }}>
                      {p.desc}
                    </p>

                    <Link
                      href={`/procedimientos/${p.id}`}
                      className="text-decoration-none fw-semibold"
                      style={{ color: "#1E63FF" }}
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

    <div className="text-center mt-5">
      <Link
        href="/procedimientos"
        className="btn btn-primary btn-lg"
        style={{ backgroundColor: "#041a4dff" }}
      >
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
