"use client";

export default function Dashboard() {
  const stats = [
    { title: "Citas del día", value: "8" },
    { title: "Procedimientos activos", value: "12" },
    { title: "Usuarios registrados", value: "25" },
  ];

  return (
    <>
      <h1 className="fw-bold mb-4" style={{ color: "#4E3B2B", fontFamily: "'Playfair Display', serif" }}>
        Panel general
      </h1>
      <div className="row g-4">
        {stats.map((s) => (
          <div key={s.title} className="col-md-4">
            <div
              className="card border-0 shadow-sm rounded-4 text-center p-4"
              style={{ backgroundColor: "#FFFDF9" }}
            >
              <h5 style={{ color: "#4E3B2B" }}>{s.title}</h5>
              <h2 className="fw-bold" style={{ color: "#B08968" }}>
                {s.value}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
