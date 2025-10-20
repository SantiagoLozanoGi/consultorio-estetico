import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";
import NavbarClient from "@/components/NavbarClient";
import SessionProviderClient from "./providers/SessionProviderClient";

export const metadata: Metadata = {
  title: "Clínica Estética Dra. Juliet Medina",
  description:
    "Especialista en Medicina Estética, Nutrición y Antiedad en Ibagué",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        style={{
          backgroundColor: "#FAF9F7",
          fontFamily: "'Poppins', sans-serif",
          color: "#4E3B2B",
        }}
      >
        {/* 🔐 Envolvemos toda la app con el proveedor de sesión */}
        <SessionProviderClient>
          {/* 🔝 BARRA SUPERIOR */}
          <div
            className="topbar py-2"
            style={{
              backgroundColor: "#E8E1D4",
              color: "#4E3B2B",
              fontSize: "0.9rem",
              borderBottom: "1px solid #D9C3B0",
            }}
          >
            <div className="container d-flex flex-wrap justify-content-between align-items-center gap-3 px-md-4 px-lg-5 text-center text-md-start">
              {/* 📞 Teléfono */}
              <div className="d-flex align-items-center justify-content-center justify-content-md-start w-100 w-md-auto">
                <i className="fas fa-phone me-2"></i>
                <span>315 5445748</span>
              </div>

              {/* 📍 Dirección */}
              <div className="d-flex align-items-center justify-content-center flex-grow-1">
                <i className="fas fa-map-marker-alt me-2"></i>
                <span style={{ fontSize: "0.9rem" }}>
                  La Samaria, Cra 12 Sur #93-21, Torre Consultorios 312, Ibagué
                </span>
              </div>

              {/* 🔗 Redes sociales */}
              <div className="d-flex align-items-center justify-content-center justify-content-md-end w-100 w-md-auto">
                <a
                  href="https://www.facebook.com/profile.php?id=61556167276406"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark me-3"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="https://www.instagram.com/dravanessamedinao28/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark me-3"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="https://api.whatsapp.com/message/SEJTQDVCRWGSP1?autoload=1&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark"
                >
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
            </div>
          </div>

          {/* 🩰 NAVBAR */}
          <NavbarClient />

          {/* 📄 CONTENIDO PRINCIPAL */}
          <main>{children}</main>

          {/* ⚓ FOOTER */}
          <footer
            className="text-white pt-5 pb-3 mt-5"
            style={{ backgroundColor: "#4E3B2B" }}
          >
            <div className="container">
              <div className="row text-center text-md-start g-4">
                <div className="col-md-4">
                  <h5 className="fw-bold">Clínica Estética Dra. Juliet Medina</h5>
                  <p>
                    Esp. Medicina Estética & Salud Integral | Inyectora 𝐄𝐥𝐢𝐭𝐞.
                  </p>
                  <p>Magíster en Gerencia Hospitalaria.</p>
                </div>

                <div className="col-md-4">
                  <h5 className="fw-bold">Contacto</h5>
                  <p>
                    <i className="fas fa-map-marker-alt me-2"></i> Clínica
                    Medicadiz, Torre Especialistas, Ibagué
                  </p>
                  <p>
                    <i className="fas fa-phone me-2"></i> 315 5445748
                  </p>
                </div>

                <div className="col-md-4">
                  <h5 className="fw-bold">Horario</h5>
                  <p>
                    Lunes a Viernes: <br />
                    8:00 AM - 12:00 PM / 2:00 PM - 6:00 PM
                  </p>
                  <p>Sábados: 9:00 AM - 1:00 PM</p>
                </div>
              </div>

              <hr style={{ borderColor: "#B08968" }} />

              <div className="text-center">
                <p className="mb-0" style={{ fontSize: "0.9rem" }}>
                  © {new Date().getFullYear()} Clínica Estética Dra. Juliet
                  Medina. Todos los derechos reservados.
                </p>
              </div>
            </div>
          </footer>
        </SessionProviderClient>
      </body>
    </html>
  );
}
