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
        {/* Envolvemos toda la app con el proveedor de sesión */}
        <SessionProviderClient>
          {/* BARRA SUPERIOR */}
          <div className="topbar">
  <div className="topbar-inner">
    <div className="topbar-left">
      <i className="fas fa-phone me-2"></i>
      <span>315 5445748</span>
    </div>

    <div className="topbar-center">
      <i className="fas fa-map-marker-alt me-2"></i>
      <span>
        Carrera 5ta #11-24. Edificio Torre Empresarial. Consultorio 502. Ibagué – Tolima.
      </span>
    </div>

    <div className="topbar-right">
      <a href="https://facebook.com" target="_blank"><i className="fab fa-facebook-f"></i></a>
      <a href="https://instagram.com" target="_blank"><i className="fab fa-instagram"></i></a>
      <a href="https://wa.me/573155445748" target="_blank"><i className="fab fa-whatsapp"></i></a>
    </div>
  </div>
</div>
          {/* NAVBAR */}
          <NavbarClient />

          {/* CONTENIDO PRINCIPAL */}
          <main>{children}</main>

          {/* FOOTER */}
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
                    <i className="fas fa-map-marker-alt me-2"></i> Carrera 5ta #11-24. Edificio Torre Empresarial. Consultorio 502. Ibagué – Tolima.
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
