"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Galeria3D() {
  const tratamientos = [
{
  img: "/imagenes/limpiezaFacial2.jpg",
  title: "Limpieza Facial",
  desc: "Un tratamiento esencial para renovar la piel, eliminar impurezas y estimular la oxigenación. Deja el rostro limpio, fresco y visiblemente más luminoso desde la primera sesión.",
  id: 1,
},
{
  img: "/imagenes/P_botox2.jpg",
  title: "Bótox",
  desc: "Reduce líneas de expresión y arrugas dinámicas con resultados naturales y armoniosos. Este procedimiento devuelve frescura al rostro sin alterar su expresividad.",
  id: 2,
},
{
  img: "/imagenes/P_Acido_hialuronico.jpg",
  title: "Ácido Hialurónico en Labios",
  desc: "Restaura volumen, define contornos y mejora la hidratación de los labios, logrando una apariencia más joven y equilibrada con un acabado natural y sofisticado.",
  id: 3,
},
{
  img: "/imagenes/P_toxinaBotulinica.jpg",
  title: "Toxina Botulínica",
  desc: "Un tratamiento versátil que suaviza arrugas y líneas de expresión, ofreciendo un aspecto rejuvenecido y descansado. Ideal para prevenir signos tempranos de envejecimiento.",
  id: 4,
},
{
  img: "/imagenes/P_Tratamiento_Acne.jpg",
  title: "Tratamiento Antiacné",
  desc: "Combina técnicas avanzadas para limpiar, exfoliar y equilibrar la piel. Reduce brotes, mejora la textura y previene cicatrices, devolviendo al rostro una apariencia uniforme y saludable.",
  id: 5,
},
{
  img: "/imagenes/P_perfilamientoRostro.jpg",
  title: "Perfilamiento Facial",
  desc: "Define y armoniza los rasgos del rostro mediante técnicas personalizadas de relleno y contorno. Resalta la estructura facial, logrando proporciones equilibradas y naturales.",
  id: 6,
},

  ];

  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const radius = 420;
  const angle = 360 / tratamientos.length;
  const ref = useRef<HTMLDivElement>(null);

  // Rotación automática
  useEffect(() => {
    if (isPaused || isDragging || selected !== null) return;
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.3) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, [isPaused, isDragging, selected]);

  // Control de arrastre con mouse/touch
  const handleMouseDown = (e: React.MouseEvent) => {
    if (selected !== null) return;
    setIsDragging(true);
    setLastX(e.clientX);
    setIsPaused(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || selected !== null) return;
    const delta = e.clientX - lastX;
    setLastX(e.clientX);
    setRotation((prev) => prev + delta * 0.4);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setLastX(e.touches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const delta = e.touches[0].clientX - lastX;
    setLastX(e.touches[0].clientX);
    setRotation((prev) => prev + delta * 0.4);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, []);

  return (
    <div
      className="position-relative d-flex justify-content-center align-items-center"
      style={{
        perspective: "1600px",
        width: "100%",
        height: selected ? "700px" : "600px",
        overflow: "hidden",
        transition: "height 0.4s ease",
      }}
    >
      {/* 🔹 RUEDA DE TRATAMIENTOS */}
      {selected === null && (
        <div
          ref={ref}
          className="rotate-ring"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            position: "relative",
            width: "300px",
            height: "200px",
            transformStyle: "preserve-3d",
            transform: `rotateX(3deg) rotateY(${rotation}deg)`,
            transition: isDragging ? "none" : "transform 0.3s ease-out",
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          {tratamientos.map((t, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                transform: `rotateY(${i * angle}deg) translateZ(${radius}px)`,
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
              }}
            >
              <div
                onClick={() => setSelected(t.id)}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "16px",
                  overflow: "hidden",
                  backgroundColor: "#FFFDF9",
                  boxShadow: "0 8px 25px rgba(176, 137, 104, 0.25)",
                  border: "1px solid #E9DED2",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                <Image
                  src={t.img}
                  alt={t.title}
                  fill
                  style={{
                    objectFit: "cover",
                    borderRadius: "16px",
                    transition: "transform 0.4s ease, filter 0.4s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.filter = "brightness(110%)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.filter = "brightness(100%)";
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🔸 PANEL DE DETALLE */}
      {selected !== null && (
        <div
          className="shadow-lg rounded-4 p-5 position-relative"
          style={{
            backgroundColor: "#FAF9F7",
            width: "80%",
            maxWidth: "1000px",
            display: "flex",
            flexDirection: "row",
            gap: "2rem",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #E9DED2",
            boxShadow: "0 10px 40px rgba(176, 137, 104, 0.3)",
            transition: "all 0.4s ease",
            paddingTop: "4rem", // espacio superior para el botón
          }}
        >
          {/* Botón volver */}
          <button
            onClick={() => setSelected(null)}
            style={{
              position: "absolute",
              top: "20px",
              left: "30px",
              background: "none",
              border: "none",
              color: "#4E3B2B",
              fontWeight: 600,
              fontSize: "1rem",
              cursor: "pointer",
              letterSpacing: "0.5px",
              transition: "color 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#A1724F")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#4E3B2B")}
          >
            ← Volver
          </button>

          {/* Imagen */}
          <div
            style={{
              flex: "0 0 45%",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 5px 20px rgba(176, 137, 104, 0.25)",
              marginTop: "10px",
            }}
          >
            <Image
              src={tratamientos.find((t) => t.id === selected)?.img || ""}
              alt="Detalle"
              width={500}
              height={400}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
          </div>

          {/* Texto */}
          <div style={{ flex: "0 0 45%", color: "#4E3B2B" }}>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              {tratamientos.find((t) => t.id === selected)?.title}
            </h3>
            <p
              style={{
                color: "#6C584C",
                lineHeight: "1.6",
                fontSize: "1.05rem",
                marginBottom: "2rem",
              }}
            >
              {tratamientos.find((t) => t.id === selected)?.desc}
            </p>

            <Link
              href="/procedimientos"
              className="btn btn-lg fw-semibold"
              style={{
                backgroundColor: "#B08968",
                color: "#FFF",
                borderRadius: "30px",
                padding: "0.75rem 2rem",
                textDecoration: "none",
                transition: "background 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#A1724F")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#B08968")
              }
            >
              Investigar más
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
