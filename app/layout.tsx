import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

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
      {/* ✅ necesario en Next App Router */}
      <head />
      <body>
        {/* Navbar */}
        <nav className="navbar navbar-dark bg-primary sticky-top">
          <div className="container d-flex align-items-center justify-content-between">
            {/* Logo */}
            <Link className="navbar-brand d-flex align-items-center" href="/">
              <Image
                src="/imagenes/logo.jpg"
                alt="Logo Clínica Estética"
                width={60}
                height={60}
                className="d-inline-block align-text-top me-2"
              />
              <span className="fw-bold">Clínica Estética</span>
            </Link>

            {/* Menú (en fila al lado del logo) */}
            <div className="d-flex align-items-center">
              {/* Links izquierda */}
              <ul className="navbar-nav flex-row me-3">
                <li className="nav-item me-3">
                  <Link className="nav-link text-white" href="/">
                    <i className="fas fa-home me-1"></i>Inicio
                  </Link>
                </li>
                <li className="nav-item me-3">
                  <Link className="nav-link text-white" href="/procedimientos">
                    <i className="fas fa-syringe me-1"></i>Procedimientos
                  </Link>
                </li>
                <li className="nav-item me-3">
                  <Link className="nav-link text-white" href="/agendar">
                    <i className="fas fa-calendar-check me-1"></i>Agendar Cita
                  </Link>
                </li>
              </ul>

              {/* Links derecha */}
              <ul className="navbar-nav flex-row">
                <li className="nav-item me-3">
                  <Link className="btn btn-light text-primary" href="/login">
                    <i className="fas fa-sign-in-alt me-1"></i>Iniciar Sesión
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-warning text-dark" href="/register">
                    <i className="fas fa-user-plus me-1"></i>Registrarse
                  </Link>
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
                <p>
                  <i className="fas fa-map-marker-alt me-2"></i> Clínica Medicadiz, Torre Especialistas, Ibagué
                </p>
                <p>
                  <i className="fas fa-phone me-2"></i> 300 123 4567
                </p>
              </div>
              <div className="col-md-4">
                <h5>Horario</h5>
                <p>Lunes a Viernes: 8:00 AM - 12:00 PM / 2:00 PM - 6:00 PM</p>
                <p>Sábados: 9:00 AM - 1:00 PM</p>
              </div>
            </div>
            <hr />
            <div className="text-center">
              <p>
                
                &copy; 2023 Clínica Estética Dra. Juliet Medina. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
