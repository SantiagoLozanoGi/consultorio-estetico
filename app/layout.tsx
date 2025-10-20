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
          backgroundColor: "#F6F4EF",
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        {/* ✅ Envolvemos toda la app con el SessionProvider */}
        <SessionProviderClient>
          {/* 🔝 BARRA SUPERIOR */}
          <div
            style={{
              backgroundColor: "#E8E1D4",
              color: "#4E3B2B",
              fontSize: "0.9rem",
              padding: "6px 0",
              borderBottom: "1px solid #d9c3b0",
            }}
          >
            <div
              className="container-fluid d-flex align-items-center justify-content-between"
              style={{
                padding: "0 70px",
                position: "relative",
              }}
            >
              {/* 📞 Teléfono */}
              <div
                className="d-flex align-items-center"
                style={{ position: "absolute", left: "70px" }}
              >
                <i className="fas fa-phone me-2"></i>
                <span>315 5445748</span>
              </div>

              {/* 📍 Dirección */}
              <div
                className="d-flex align-items-center justify-content-center w-100"
                style={{
                  textAlign: "center",
                  fontSize: "0.9rem",
                }}
              >
                <i className="fas fa-map-marker-alt me-2"></i>
                <span>
                  La Samaria, Carrera 12 Sur #93-21 Torre Consultorios 312,
                  Ibagué
                </span>
              </div>

              {/* 🔗 Redes sociales */}
              <div
                className="d-flex align-items-center"
                style={{ position: "absolute", right: "70px" }}
              >
                <a
                  href="https://www.facebook.com/profile.php?id=61556167276406"
                  target="_blank"
                  className="text-dark me-3"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="https://www.instagram.com/dravanessamedinao28/"
                  target="_blank"
                  className="text-dark me-3"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="https://api.whatsapp.com/message/SEJTQDVCRWGSP1?autoload=1&app_absent=0"
                  target="_blank"
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
          <footer className="bg-dark text-white py-4 mt-5">
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <h5>Clínica Estética Dra. Juliet Medina</h5>
                  <p>
                    Esp. Medicina Estética & Salud Integral | Inyectora 𝐄𝐥𝐢𝐭𝐞.
                  </p>
                  <p>Magíster Gerencia Hospitalaria.</p>
                </div>

                <div className="col-md-4">
                  <h5>Contacto</h5>
                  <p>
                    <i className="fas fa-map-marker-alt me-2"></i> Clínica
                    Medicadiz, Torre Especialistas, Ibagué
                  </p>
                  <p>
                    <i className="fas fa-phone me-2"></i> 315 5445748
                  </p>
                </div>

                <div className="col-md-4">
                  <h5>Horario</h5>
                  <p>
                    Lunes a Viernes: 8:00 AM - 12:00 PM / 2:00 PM - 6:00 PM
                  </p>
                  <p>Sábados: 9:00 AM - 1:00 PM</p>
                </div>
              </div>

              <hr />

              <div className="text-center">
                <p>
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
