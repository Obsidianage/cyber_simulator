"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [threats, setThreats] = useState([]);
  const [form, setForm] = useState({
    source: "",
    ioc: "",
    type: "",
    observedAt: "",
  });

  // Fetch threats from Hono backend
  useEffect(() => {
    fetch("http://localhost:8787/threats")
      .then((res) => res.json())
      .then((data) => setThreats(data))
      .catch((err) => console.error("Error fetching threats:", err));
  }, []);

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit new threat to backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8787/threats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      alert("Threat added!");
      // Refresh threats
      const updated = await fetch("http://localhost:8787/threats").then((res) =>
        res.json()
      );
      setThreats(updated);
    }
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Cyber Threats</h1>

      {/* Form to add threat */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <input
          name="source"
          placeholder="Source"
          value={form.source}
          onChange={handleChange}
          required
        />
        <input
          name="ioc"
          placeholder="IOC"
          value={form.ioc}
          onChange={handleChange}
          required
        />
        <input
          name="type"
          placeholder="Type"
          value={form.type}
          onChange={handleChange}
          required
        />
        <input
          name="observedAt"
          placeholder="Observed At (YYYY-MM-DDTHH:MM:SSZ)"
          value={form.observedAt}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Threat</button>
      </form>

      {/* Threats list */}
      <ul>
        {threats.map((t: any) => (
          <li key={t.id}>
            <strong>{t.type}</strong> - {t.ioc} (Source: {t.source})
          </li>
        ))}
      </ul>
    </main>
  );
}
