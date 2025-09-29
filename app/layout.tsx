import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clínica Estética Dra. Juliet Medina",
  description: "Especialista en Medicina Estética, Nutrición y Antiedad en Ibagué",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
          <div className="container">
            <a className="navbar-brand" href="/">
              <img
                src="/images/logo.jpg"
                alt="Logo Clínica Estética"
                style={{ height: "40px" }}
              />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/">Inicio</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/procedimientos">Procedimientos</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/agendar">Agendar Cita</a>
                </li>
              </ul>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="/login">Iniciar Sesión</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/register">Registrarse</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-dark text-white py-4 mt-5">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <h5>Clínica Estética Dra. Juliet Medina</h5>
                <p>Especialista en Medicina Estética, Nutrición y Antiedad.</p>
              </div>
              <div className="col-md-4">
                <h5>Contacto</h5>
                <p><i className="fas fa-map-marker-alt me-2"></i> Clínica Medicadiz, Torre Especialistas, Ibagué</p>
                <p><i className="fas fa-phone me-2"></i> 300 123 4567</p>
              </div>
              <div className="col-md-4">
                <h5>Horario</h5>
                <p>Lunes a Viernes: 8:00 AM - 12:00 PM / 2:00 PM - 6:00 PM</p>
                <p>Sábados: 9:00 AM - 1:00 PM</p>
              </div>
            </div>
            <hr />
            <div className="text-center">
              <p>© 2023 Clínica Estética Dra. Juliet Medina. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" async />
      </body>
    </html>
  );
}
