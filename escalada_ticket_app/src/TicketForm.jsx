import React, { useState } from "react";

const TicketForm = () => {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "" });
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/generateTicket", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", textAlign: "center" }}>
      {!downloadUrl ? (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          <input type="text" name="firstName" placeholder="Имя" value={form.firstName} onChange={handleChange} required />
          <input type="text" name="lastName" placeholder="Фамилия" value={form.lastName} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <button type="submit" style={{ padding: 10, background: "#007BFF", color: "#fff", border: "none", borderRadius: 5 }}>
            Получить билет
          </button>
        </form>
      ) : (
        <div>
          <h2>Спасибо! Ваш билет готов:</h2>
          <a href={downloadUrl} download="Билет_Эскалада.pdf" style={{ padding: 10, background: "#007BFF", color: "#fff", borderRadius: 5, textDecoration: "none" }}>
            Скачать билет
          </a>
        </div>
      )}
    </div>
  );
};

export default TicketForm;