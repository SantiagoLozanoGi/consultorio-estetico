import Image from "next/image";
import Link from "next/link";

export default function ProcedimientosDestacados() {
  const procedimientos = [
    // --- EXISTENTES ---
    {
      id: 1,
      img: "/imagenes/P_LimpiezaFacial.jpg",
      title: "Limpieza Facial",
      desc: "Tratamiento para suavizar y rejuvenecer la piel.",
      icon: "fa-spa",
    },
    {
      id: 2,
      img: "/imagenes/P_Botox.jpg",
      title: "Bótox",
      desc: "Suaviza arrugas de expresión con resultados naturales.",
      icon: "fa-syringe",
    },
    {
      id: 3,
      img: "/imagenes/P_Acido_hialuronico.jpg",
      title: "Ácido Hialurónico en labios",
      desc: "Restaura volumen y contorno de los labios.",
      icon: "fa-cloud",
    },
    {
      id: 4,
      img: "/imagenes/P_Perfilamiento_Facial.jpg",
      title: "Ácido Hialurónico Facial",
      desc: "Rellenos para perfilar y armonizar el rostro.",
      icon: "fa-face-smile",
    },
    {
      id: 5,
      img: "/imagenes/P_Tratamiento_Acne.jpg",
      title: "Tratamiento Para El Acné",
      desc: "Desinflama y mejora la textura de la piel.",
      icon: "fa-notes-medical",
    },
    {
      id: 6,
      img: "/imagenes/P_Tratamiento_Manchas.jpg",
      title: "Tratamiento Para Manchas",
      desc: "Inhibe melanina y renueva la piel.",
      icon: "fa-sun",
    },

    // --- 10 NUEVOS ---
    {
      id: 7,
      img: "/imagenes/P_Peeling_Quimico.jpg",
      title: "Peeling Químico",
      desc: "Renovación controlada para mejorar textura, poros y manchas.",
      icon: "fa-flask",
    },
    {
      id: 8,
      img: "/imagenes/P_PRP_Facial.jpg",
      title: "Plasma Rico en Plaquetas (PRP)",
      desc: "Bioestimulación con tu propio plasma para firmeza y brillo.",
      icon: "fa-vial",
    },
    {
      id: 9,
      img: "/imagenes/P_Microdermoabrasion.jpg",
      title: "Microdermoabrasión",
      desc: "Exfoliación mecánica suave que alisa y unifica el tono.",
      icon: "fa-gem",
    },
    {
      id: 10,
      img: "/imagenes/P_Dermapen.jpg",
      title: "Dermapen (Microneedling)",
      desc: "Microperforaciones que estimulan colágeno y mejoran cicatrices.",
      icon: "fa-pen",
    },
    {
      id: 11,
      img: "/imagenes/P_Rinomodelacion.jpg",
      title: "Rinomodelación",
      desc: "Corrección no quirúrgica de perfil nasal con ácido hialurónico.",
      icon: "fa-face-grin-stars",
    },
    {
      id: 12,
      img: "/imagenes/P_Hilos_Tensores.jpg",
      title: "Hilos Tensores",
      desc: "Efecto lifting inmediato y progresivo sin cirugía.",
      icon: "fa-wand-magic-sparkles",
    },
    {
      id: 13,
      img: "/imagenes/P_Lipo_Papada_Enzimatica.jpg",
      title: "Lipo de Papada Enzimática",
      desc: "Reduce grasa submentoniana y define el contorno mandibular.",
      icon: "fa-droplet",
    },
    {
      id: 14,
      img: "/imagenes/P_Mesoterapia_Corporal.jpg",
      title: "Mesoterapia Corporal",
      desc: "Cocteles lipolíticos para reducción de medidas y piel más firme.",
      icon: "fa-syringe",
    },
    {
      id: 15,
      img: "/imagenes/P_Depilacion_Laser.jpg",
      title: "Depilación Láser",
      desc: "Elimina vello de forma progresiva y segura para todo tipo de piel.",
      icon: "fa-bolt",
    },
    {
      id: 16,
      img: "/imagenes/P_Hidrafacial.jpg",
      title: "Hidratación Profunda (Hydrafacial)",
      desc: "Limpieza, extracción e hidratación intensiva en una sola sesión.",
      icon: "fa-droplet",
    },
  ];

  return (
    <>
      {/* PROCEDIMIENTOS DESTACADOS (estilo tarjeta flotante) */}
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
            {procedimientos.map((p) => (
              <div className="col-12 col-md-6 col-lg-4" key={p.id}>
                <div
                  className="position-relative"
                  style={{ paddingBottom: "90px" }}
                >
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

                  <div
                    className="position-absolute start-0 end-0"
                    style={{ bottom: 0 }}
                  >
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
                          <h5
                            className="fw-bold mb-2"
                            style={{ color: "#0B2A3B" }}
                          >
                            {p.title}
                          </h5>
                          <p
                            className="text-muted mb-3"
                            style={{ lineHeight: 1.5 }}
                          >
                            {p.desc}
                          </p>

                          <Link
                            href={`/procedimientos/${p.id}`}
                            className="text-decoration-none fw-semibold"
                            style={{ color: "#1E63FF" }}
                          >
                            Ver más{" "}
                            <i className="fas fa-arrow-right ms-1"></i>
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
              Ver todos los procedimientos{" "}
              <i className="fas fa-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
