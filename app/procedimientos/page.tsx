"use client";
import Image from "next/image";
import Link from "next/link";

export default function ProcedimientosPage() {
  return (
    <section className="py-5">
      <div className="container text-center">
        <h1 className="fw-bold mb-4" style={{ color: "#1E63FF" }}>
          Nuestros Procedimientos
        </h1>
        <p className="lead text-muted mb-5">
          Descubre los tratamientos estéticos disponibles en nuestra clínica.
        </p>

        <div className="row g-4 justify-content-center">
          {[
            {
              img: "/imagenes/P_LimpiezaFacial.jpg",
              title: "Limpieza Facial",
              desc: "Elimina impurezas y revitaliza la piel.",
            },
            {
              img: "/imagenes/P_Botox.jpg",
              title: "Bótox",
              desc: "Reduce arrugas y líneas de expresión.",
            },
            {
              img: "/imagenes/P_Acido_hialuronico.jpg",
              title: "Ácido Hialurónico",
              desc: "Restaura volumen y suaviza el rostro.",
            },
          ].map((p, i) => (
            <div className="col-12 col-md-6 col-lg-4" key={i}>
              <div className="card border-0 shadow-sm h-100">
                <Image
                  src={p.img}
                  alt={p.title}
                  width={400}
                  height={250}
                  className="card-img-top"
                  style={{ objectFit: "cover", height: "250px" }}
                />
                <div className="card-body">
                  <h5 className="fw-bold">{p.title}</h5>
                  <p className="text-muted">{p.desc}</p>
                  <Link
                    href="/agendar"
                    className="btn btn-outline-primary"
                    style={{ borderColor: "#1E63FF", color: "#1E63FF" }}
                  >
                    Agendar cita <i className="fas fa-arrow-right ms-2"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
