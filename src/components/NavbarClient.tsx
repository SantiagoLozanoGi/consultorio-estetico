"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function NavbarClient() {
  const { data: session } = useSession();
  const router = useRouter();

  const userName = session?.user?.name?.split(" ")[0] || "";
  const userRole = session?.user?.role || "guest";

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm py-3"
      style={{ backgroundColor: "#FAF9F7" }}
    >
      <div
        className="container-fluid d-flex justify-content-between align-items-center"
        style={{
          whiteSpace: "nowrap",
          padding: "0 70px",
        }}
      >
        {/* IZQUIERDA: Logo */}
        <div
          className="d-flex align-items-center"
          style={{
            flex: "1",
            justifyContent: "flex-start",
            marginRight: "40px",
          }}
        >
          <Image
            src="/imagenes/logoJM.png"
            alt="Logo Clínica Estética"
            width={80}
            height={60}
            className="me-3"
          />
          <div>
            <span
              style={{
                color: "#2B2B2B",
                fontFamily: "'Playfair Display', serif",
                fontWeight: "600",
                fontSize: "1.1rem",
                letterSpacing: "0.5px",
              }}
            >
              Dra. Juliet Medina Orjuela
            </span>
            <br />
            <small
              style={{
                color: "#8A8B75",
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
              }}
            >
              Medicina estética y antienvejecimiento
            </small>
          </div>
        </div>

        {/* CENTRO: Menú */}
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ flex: "1.5" }}
        >
          <ul
            className="navbar-nav flex-row justify-content-center align-items-center mb-0"
            style={{
              gap: "2.5rem",
              fontSize: "1rem",
            }}
          >
            {[ 
              { label: "Inicio", href: "/" },
              { label: "Dra. Vanessa Medina", href: "/doctora" },
              { label: "Procedimientos", href: "/procedimientos" },
              { label: "Testimonios", href: "/testimonios" },
              { label: "Agendar cita", href: "/agendar" },
            ].map((item, index) => (
              <li key={index} className="nav-item">
                <Link
                  href={item.href}
                  className="nav-link fw-semibold"
                  style={{
                    color: "#2B2B2B",
                    transition: "color 0.3s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.color = "#B08968")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.color = "#2B2B2B")
                  }
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {/* 🔒 Sección visible solo para Admin */}
            {userRole === "admin" && (
              <>
                <li className="nav-item">
                  <Link
                    href="/panelAdmin"
                    className="nav-link fw-semibold"
                    style={{
                      color: "#4E3B2B",
                      transition: "color 0.3s ease",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.color = "#B08968")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.color = "#4E3B2B")
                    }
                  >
                    Panel Admin
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    href="/gestion-citas"
                    className="nav-link fw-semibold"
                    style={{
                      color: "#4E3B2B",
                      transition: "color 0.3s ease",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.color = "#B08968")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.color = "#4E3B2B")
                    }
                  >
                    Gestión de Citas
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* DERECHA: Botón dinámico */}
        <div
          className="d-flex justify-content-end align-items-center"
          style={{ flex: "1", justifyContent: "flex-end" }}
        >
          {session ? (
            <>
              <span
                style={{
                  marginRight: "1rem",
                  color: "#4E3B2B",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                }}
              >
                Hola, {userName}
              </span>
              <button
                onClick={handleLogout}
                className="fw-semibold"
                style={{
                  padding: "0.6rem 1.4rem",
                  borderRadius: "30px",
                  border: "2px solid #B08968",
                  backgroundColor: "#B08968",
                  color: "#FFF",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#A1724F";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#B08968";
                }}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="fw-semibold"
              style={{
                display: "inline-block",
                padding: "0.6rem 1.4rem",
                borderRadius: "30px",
                border: "2px solid #4E3B2B",
                color: "#4E3B2B",
                backgroundColor: "transparent",
                transition: "all 0.3s ease",
                textDecoration: "none",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#B08968";
                e.currentTarget.style.color = "#FFF";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#4E3B2B";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
