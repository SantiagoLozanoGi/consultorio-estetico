"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RecuperarPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      router.push("/login");
    }, 2500);
  };

  return (
    <section
      className="d-flex align-items-center py-5"
      style={{
        background: "linear-gradient(180deg, #FAF9F7 0%, #F1E9E0 100%)",
        minHeight: "100vh",
      }}
    >
      <div className="container px-3">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5">
            <div
              className="card shadow-lg border-0 rounded-4 animate-fadein"
              style={{
                backgroundColor: "#FFFDF9",
                transition: "all 0.4s ease",
              }}
            >
              <div className="card-body p-4 p-md-5 text-center">
                {/* 🩺 Título */}
                <h2
                  className="fw-bold mb-3"
                  style={{
                    color: "#4E3B2B",
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(1.6rem, 2.5vw, 2rem)",
                  }}
                >
                  Recuperar contraseña
                </h2>

                <p
                  className="text-muted mb-4"
                  style={{
                    color: "#6C584C",
                    fontSize: "clamp(0.9rem, 1.2vw, 1rem)",
                    lineHeight: "1.6",
                  }}
                >
                  Ingresa tu correo electrónico para recibir un enlace de
                  recuperación y restablecer tu contraseña.
                </p>

                {/* 📩 Formulario */}
                <form onSubmit={handleSubmit}>
                  <input
                    type="email"
                    className="form-control mb-4 shadow-sm rounded-3"
                    placeholder="tucorreo@dominio.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      borderColor: "#E9DED2",
                      backgroundColor: "#FFFDF9",
                      padding: "0.8rem 1rem",
                      fontSize: "clamp(0.9rem, 1.1vw, 1rem)",
                    }}
                  />

                  <button
                    type="submit"
                    className="btn w-100 fw-semibold py-2"
                    style={{
                      backgroundColor: "#B08968",
                      border: "none",
                      color: "#FFF",
                      borderRadius: "50px",
                      fontSize: "clamp(0.9rem, 1.2vw, 1rem)",
                      transition: "all 0.3s ease",
                    }}
                    disabled={sent}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#A1724F")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#B08968")
                    }
                  >
                    {sent ? "Enviando enlace..." : "Enviar enlace"}
                  </button>
                </form>

                {/* 🔙 Volver */}
                <p
                  onClick={() => router.push("/login")}
                  style={{
                    color: "#B08968",
                    textDecoration: "underline",
                    marginTop: "1.2rem",
                    cursor: "pointer",
                    fontSize: "clamp(0.9rem, 1.1vw, 1rem)",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.color = "#A1724F")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.color = "#B08968")
                  }
                >
                  Volver al inicio de sesión
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✨ Animación y media queries */}
      <style jsx>{`
        @keyframes fadein {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadein {
          animation: fadein 0.6s ease forwards;
        }

        @media (max-width: 768px) {
          .card-body {
            padding: 2rem 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
